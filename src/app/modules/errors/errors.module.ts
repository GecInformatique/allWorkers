import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ErrorsRoutingModule } from "./errors-routing.module";
import { NotfoundComponent } from "./notfound/notfound.component";


@NgModule({
  imports: [
    CommonModule,
    ErrorsRoutingModule,
  ],
  declarations: [
    NotfoundComponent
  ],
})
export class ErrorsModule { }
