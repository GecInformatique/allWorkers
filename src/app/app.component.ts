import { Component  } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'All-Workers';

  languages = ['en', 'fr'];

  constructor(
    private translate: TranslateService,
  ) {
  }

  switchLanguage(language: string) {
    if (this.languages.includes(language)) {
      this.translate.use(language);
      localStorage.setItem('langue', language);
    }
  }
}


