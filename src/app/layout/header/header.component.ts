import {
  Component,
  ElementRef,
  HostListener,

  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import {ShareDataService} from "../../core/data/share-data.service";
import {NavbarService} from "../../core/tools/navbar.service";
import {CommonService} from "../../core/tools/common/common.service";
import {header} from "../../core/models/page/sidebar-model";
import { routes } from '../../core/helpers/routes/routes';
import {TranslateService} from "@ngx-translate/core";
import {LocalTokenService} from "../../core/data/local/local.token.service";
import {LocalAuthService} from "../../core/data/local/local.auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
 export class HeaderComponent {
  public routes = routes;
  public searchIcon = false;
  flagImage = 'assets/img/flags/fr.png';
  menuElement!: ElementRef;
  navbar: Array<header> = [];
  sticky = false;
  elementPosition!: string;
  base = '';
  page = '';
  last = '';
  langCode!: any;
  siteLanguage = 'English';
  languageList = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'French' },
  ];
  public isModalOpen: boolean = false;

  public currentUser: any;

  constructor(
    private data: ShareDataService,
    private navservices: NavbarService,
    private common: CommonService,
    private router: Router,
    private translate: TranslateService,
     public authService: LocalAuthService,
    private tokenService: LocalTokenService,
  ) {
    this.common.base.subscribe((res: string) => {
      this.base = res;
    });
    this.common.page.subscribe((res: string) => {
      this.page = res;
    });
    this.common.last.subscribe((res: string) => {
      this.last = res;
    });
    this.navbar = this.data.sideBar;

    this.translate.addLangs(['en', 'fr']);
    const storedLanguage = localStorage.getItem('user-language') || 'fr';
    this.translate.setDefaultLang(storedLanguage);
    this.changeSiteLanguage(storedLanguage);
  }

  public toggleSidebar(): void {
    this.navservices.openSidebar();
  }

  public hideSidebar(): void {
    this.navservices.closeSidebar();
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    this.sticky = windowScroll !== 0;
  }

  toggleSearch() {
    this.searchIcon = !this.searchIcon;
  }

  ngOnInit(): void {
    const storedLanguage = localStorage.getItem('user-language');
    const initialLanguage = storedLanguage ? storedLanguage : 'fr';
    this.langCode = initialLanguage;
    this.changeSiteLanguage(initialLanguage);
    this.currentUser = this.authService.getCurrentUser();
    console.log(this.currentUser,'this.currentUser')
  }

  changeLanguage(event: any): void {
    const selectedValue = event.target.value;
    const selectedLanguage = this.languageList.find(language => language.code === selectedValue);

    if (selectedLanguage) {
      this.siteLanguage = selectedLanguage.label.toString();
      this.translate.use(selectedValue);
    }

    localStorage.setItem('user-language', selectedValue);

    this.flagImage = selectedValue === 'fr' ? 'assets/img/flags/fr.png' : 'assets/img/flags/en.png';
    this.changeSiteLanguage(selectedValue);
  }

  changeSiteLanguage(localeCode: string): void {
    const selectedLanguage = this.languageList.find(language => language.code === localeCode);

    if (selectedLanguage) {
      this.siteLanguage = selectedLanguage.label.toString();
      this.translate.use(localeCode);
    }
  }

  trackByFn(index: number, item: any): number {
    return item.id; // Remplacez 'id' par la propriété unique de vos éléments de navbar
  }

  logout(): void {
    this.authService.removeCurrentUser();
    this.tokenService.removeToken();
    this.router.navigate(['/home']);
  }

  public closeModal(): void {
    this.isModalOpen = false;
  }

  public openModal(): void {
    this.isModalOpen = true;
  }

}

