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

    // Vérifie s'il y a une langue stockée dans le localStorage
    const savedLanguage = localStorage.getItem('langue');

    // Si une langue est trouvée, l'utiliser, sinon utiliser la langue par défaut (par exemple 'en')
    if (savedLanguage && this.languages.includes(savedLanguage)) {
      this.translate.use(savedLanguage);
    } else {
      this.translate.use('fr');  // Langue par défaut
    }
  }

  switchLanguage(language: string) {
    if (this.languages.includes(language)) {
      this.translate.use(language);
      localStorage.setItem('langue', language);
    }
  }
}


