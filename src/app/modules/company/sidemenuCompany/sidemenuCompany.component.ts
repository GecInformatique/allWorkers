import {Component, OnInit} from '@angular/core';


import { routes } from 'src/app/core/helpers/routes/routes';
import {CommonService} from "../../../core/tools/common/common.service";
import {ShareDataService} from "../../../core/data/share-data.service";
import {SidebarData} from "../../../core/models/page/models";
import {FreelancerSidebarItem} from "../../../core/models/page/sidebar-model";
import {LocalAuthService} from "../../../core/data/local/local.auth.service";

@Component({
  selector: 'app-sidemenuCompany',
  templateUrl: './sidemenuCompany.component.html',
  styleUrls: ['./sidemenuCompany.component.scss'],
})
export class SidemenuCompanyComponent implements OnInit{
  public routes = routes;
  base = '';
  page = '';
  last = '';
  currentroute = '';
  sidebar: SidebarData[] = [];
  public currentUser: any;
  constructor(private data: ShareDataService, private common: CommonService,    public authService: LocalAuthService) {
    this.common.base.subscribe((res: string) => {
      this.base = res;
    });
    this.common.page.subscribe((res: string) => {
      this.page = res;
    });
    this.common.last.subscribe((res: string) => {
      this.last = res;
    });


    this.menuItems = this.data.company_sidebar;
  }

  public menuItems: Array<FreelancerSidebarItem> = [];
  toggleSubMenu(menuItem: FreelancerSidebarItem): void {
    menuItem.expanded = !menuItem.expanded;
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();

  }
}
