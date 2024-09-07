import {Component, OnDestroy, OnInit} from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';
import {Editor, Toolbar, Validators} from "ngx-editor";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {FormationService} from "../../../core/libs/scripts/libs/all-workers-api";
interface data {
  value: string;
}
@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.scss']
})
export class FormationComponent implements OnInit {
  formations : any[] =[];



  constructor(private router: Router, private formationService: FormationService,) {

  }






  ngOnInit(): void {
    this.getFormationList()
  }

  navigateToFormationDetail(formation: any): void {
    this.router.navigate([routes.formationDetail], { state: { formation } });
  }

  getFormationList() {
    this.formationService.getFormationList().subscribe(
      (response: any )=> {
        this.formations = response.data;
        console.log(this.formations)
      },
      error => console.error('GET error:', error)
    )
  }
}
