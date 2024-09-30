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
})export class HeaderComponent {
  public routes = routes;
  public searchIcon = false;
  public flagImage = 'assets/img/flags/fr.png';
  public navbar: Array<header> = [];
  public sticky = false;
  public base = '';
  public page = '';
  public last = '';
  public langCode!: string;
  public siteLanguage = 'En';
  public languageList = [
    { code: 'en', label: 'En' },
    { code: 'fr', label: 'Fr' },
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
    this.common.base.subscribe((res: string) => this.base = res);
    this.common.page.subscribe((res: string) => this.page = res);
    this.common.last.subscribe((res: string) => this.last = res);
    this.navbar = this.data.sideBar;

    this.translate.addLangs(['en', 'fr']);

    // Récupérer la langue stockée ou définir 'fr' par défaut
    const storedLanguage = localStorage.getItem('user-language') || 'fr';
    this.translate.setDefaultLang(storedLanguage);
    this.changeSiteLanguage(storedLanguage);
    this.updateFlagImage(storedLanguage);
  }

  ngOnInit(): void {
    // Récupérer la langue stockée ou définir 'fr' par défaut
    const storedLanguage = localStorage.getItem('user-language') || 'fr';
    this.langCode = storedLanguage;
    this.translate.setDefaultLang(storedLanguage);
    this.translate.use(storedLanguage);
    this.updateFlagImage(storedLanguage);

    // Si nécessaire, récupère l'utilisateur actuel
    this.currentUser = this.authService.getCurrentUser();
  }

  changeLanguage(event: any): void {
    const selectedValue = event.target.value;
    this.langCode = selectedValue;
    this.translate.use(selectedValue);
    localStorage.setItem('user-language', selectedValue);

    // Mise à jour de l'image du drapeau après le changement de langue
    this.updateFlagImage(selectedValue);
  }

  changeSiteLanguage(localeCode: string): void {
    const selectedLanguage = this.languageList.find(language => language.code === localeCode);
    if (selectedLanguage) {
      this.siteLanguage = selectedLanguage.label;
    }
  }

  updateFlagImage(languageCode: string): void {
    // Change l'image du drapeau en fonction de la langue sélectionnée
    this.flagImage = languageCode === 'fr' ? 'assets/img/flags/fr.png' : 'assets/img/flags/en.png';
  }
  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    this.sticky = windowScroll !== 0;
  }

  toggleSearch() {
    this.searchIcon = !this.searchIcon;
  }

  toggleSidebar(): void {
    this.navservices.openSidebar();
  }

  hideSidebar(): void {
    this.navservices.closeSidebar();
  }

  trackByFn(index: number, item: any): number {
    return item.id; // Remplacez 'id' par la propriété unique de vos éléments de navbar
  }

  logout(): void {
    this.authService.removeCurrentUser();
    this.tokenService.removeToken();
    this.router.navigate(['/home']);
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  openModal(): void {
    console.log(this.currentUser,'user connectec ')
    if(this.currentUser !== null){
      this.isModalOpen = true;
    }else {
      this.router.navigate(['/auth/login']);

    }

  }
}

