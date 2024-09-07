import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})

export class ToasterService {

  constructor(
   // private messageService: MessageService,
  ) { }

  showSuccess(message:string){
   // this.messageService.add({ severity: 'success', summary: 'Succés', detail: message, life: 3000 });
  }

  showError(message: string) {
    //this.messageService.add({ severity: 'error', summary: 'Echec', detail: message, life: 3000 });
  }

  showInfo(message: string) {
    //this.messageService.add({ severity: 'info', summary: 'Information', detail: message, life: 3000 });
  }

  showWarning(message: string) {
    // this.messageService.add({ severity: 'warning', summary: 'Avertissement', detail: message, life: 3000 });
  }
}
