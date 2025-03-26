import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';
import {Editor, Toolbar, Validators} from "ngx-editor";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {MessageService} from "primeng/api";
import {LocalAuthService} from "../../../../core/data/local/local.auth.service";
import {Projet, ProjetsService} from "../../../../core/allworker_api";

@Component({
  selector: 'app-company-projects',
  templateUrl: './company-projects.component.html',
  styleUrls: ['./company-projects.component.scss']
})
export class CompanyProjectsComponent {
  public routes = routes;
  public currentUser: any;
  editor!: Editor;

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  form = new FormGroup({
    editorContent: new FormControl('', Validators.required()),
  });
  candidats: any;
  project: any;
  projectForm !: FormGroup;

  constructor(
    private router: Router,private datePipe: DatePipe,
    private messageService: MessageService,
    private projetsService: ProjetsService,
    private fb: FormBuilder, public authService: LocalAuthService,
  ) {}



  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.editor = new Editor();
    /*this.getCompanyById(this.currentUser.id)*/
     this.getAllProject()

    this.companyDataForm()
  }

  companyDataForm(){

    this.projectForm = this.fb.group({
      nom: ['', Validators.required],
    //  amount: [''],
      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required],
      description: [''],
      candidats: [[]]
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  createProject(){
    console.log(this.currentUser,this.projectForm.value,)
    if (!this.currentUser || !this.currentUser.id) {
      return;
    }
    const dateDebutFormatted = this.datePipe.transform(this.projectForm.value.date_debut, 'yyyy-MM-dd');
    const dateFinFormatted = this.datePipe.transform(this.projectForm.value.date_fin, 'yyyy-MM-dd');
    const projetct = {
      ...this.projectForm.value,
      entreprise: this.currentUser.id,
      date_debut: dateDebutFormatted,
      date_fin: dateFinFormatted
    };

    console.log(projetct)

    this.projetsService.projetsCreate(projetct).subscribe({
      next: (response: any) => {

        console.log(response)
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Le projet a été mise à jour avec succès.' });
      },
      error: (error: any) => console.error('PUT error:', error),
    });
  }

  private getProjectById() {
   /* this.entreprisesService.entreprisesRead(projetct).subscribe({
      next: (response: Entreprise ) => {
        this.currentUser = response;
        console.log(this.currentUser,'apres modification')

        // Mettre à jour le local storage avec les nouvelles informations
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      },
      error: (error: any) => console.error('GET error:', error),
    });*/
  }

  getAllProject(): void {
    this.projetsService.projetsGetAllProjectForUserId(this.currentUser.id).subscribe({
      next: (response: any[]) => {
        this.project = response;
        console.log(this.project, 'après modification');
      },
      error: (error: any) => {
        console.error('GET error:', error);
      },
    });
  }
}
