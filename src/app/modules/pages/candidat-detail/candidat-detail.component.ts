import {Component, OnInit} from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';

import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";

interface data {
  value: string;
}
@Component({
  selector: 'app-candidat-list',
  templateUrl: './candidat-detail.component.html',
  styleUrls: ['./candidat-detail.component.scss']
})
export class CandidatDetailComponent implements OnInit {
  public details = [];
  public routes = routes;
  public candidate : any;


  constructor(private router: Router) {

  }



  ngOnInit(): void {
    this.candidate = history.state.candidate;
    console.log(this.candidate)
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }


  navigation() {
    this.router.navigate([routes.employee_dashboard]);
  }
  navigation2() {
    this.router.navigate([routes.freelancer_projects_proposals]);
  }
}
