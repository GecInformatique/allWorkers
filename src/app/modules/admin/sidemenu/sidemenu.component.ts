import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AdminSidebar} from "../../../core/models/page/sidebar-model";
import {ShareDataService} from "../../../core/data/share-data.service";
import {SideBarService} from "../../../core/tools/side-bar/side-bar.service";
import {CommonService} from "../../../core/tools/common/common.service";
import {AuthService} from "../../../core/libs/scripts/libs/all-workers-api";


@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent {
  base = '';
  page = '';
  last = '';
  public miniSidebar = false;
  currentroute = '';
  side_bar_data: AdminSidebar[] = [];
  constructor(
    public router: Router,
    private data: ShareDataService,
    private sideBar: SideBarService,
    private common: CommonService,
    public auth: AuthService
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

    // get sidebar data as observable because data is controlled for design to expand submenus

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.data.getAdminSideBarData.subscribe((res: any) => {
      this.side_bar_data = res;
    });
    this.sideBar.toggleSideBar.subscribe((res) => {
      if (res == 'true') {
        this.miniSidebar = true;
      } else {
        this.miniSidebar = false;
      }
    });
  }

  public toggleSideBar(): void {
    this.sideBar.switchSideMenuPosition();
  }
  public toggleMobileSideBar(): void {
    this.sideBar.switchMobileSideBarPosition();
  }

  public Logout(): void {
    localStorage.removeItem('LoginData');
    this.router.navigate(['/admin/auth/login']);
  }
  public miniSideBarMouseHover(position: string): void {
    if (position == 'over') {
      this.sideBar.expandSideBar.next(true);
    } else {
      this.sideBar.expandSideBar.next(false);
    }
  }

  public expandSubMenus(menu: { menuValue: string; showSubRoute: boolean; }): void {
    sessionStorage.setItem('menuValue', menu.menuValue);
    this.side_bar_data.map((mainMenus) => {
      mainMenus.menu.map((resMenu: { menuValue: string; showSubRoute: boolean; }) => {
        // collapse other submenus which are open
        if (resMenu.menuValue == menu.menuValue) {
          menu.showSubRoute = !menu.showSubRoute;
          if (menu.showSubRoute == false) {
            sessionStorage.removeItem('menuValue');
          }
        } else {
          resMenu.showSubRoute = false;
        }
      });
    });
  }

  public logOut(): void {
    //this.auth.logout();
  }
  miniSideBarBlur(position: string) {
    if (position === 'over') {
      this.sideBar.expandSideBar.next(true);
    } else {
      this.sideBar.expandSideBar.next(false);
    }
  }

  miniSideBarFocus(position: string) {
    if (position === 'over') {
      this.sideBar.expandSideBar.next(true);
    } else {
      this.sideBar.expandSideBar.next(false);
    }
  }
}
