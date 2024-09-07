import { Component } from '@angular/core';
import {SpinnerService} from "../../core/tools/spinner/spinner.service";
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  constructor(public spinner: SpinnerService) {}

  loading$ = this.spinner.loading$;


}
