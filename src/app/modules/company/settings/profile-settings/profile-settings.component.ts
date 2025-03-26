import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { LocalAuthService } from 'src/app/core/data/local/local.auth.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import {MenuItem, MessageService} from "primeng/api";
import {
  CandidatsService,
  Education,
  EducationsService,
  Experience,
  ExperiencesService
} from "../../../../core/allworker_api";
import {DomainActivity} from "../../../../core/libs/scripts/libs/all-workers-api";
interface data {
  value: string;
}
@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent  implements OnInit{
  public routes = routes;
  public currentUser: any;
  candidatForm !: FormGroup;
  experienceForm !: FormGroup;
  allExperiences : any[] = [];
  allEducations : any[] = [];
  educationForm !: FormGroup;
  mainForm !: FormGroup;
  //public education: number[] = [];
  public certification: number[] = [];
  visible: boolean = false;
  public isModalOpen: boolean[] = [false, false];
  isEditMode = false;
  selectedExperience: any = null;
  selectedFormation: any = null;


  public language: number[] = [];

  items: MenuItem[] | undefined;
  public datas : boolean[] = [true]
  public isCheckboxChecked = true;
  levels = ['Basic', 'Intermediate', 'Advanced'];
  skills = [{ name: '', level: '' }];


  constructor(
    private router: Router,private datePipe: DatePipe,
    private educationService : EducationsService,
    private experiencesService : ExperiencesService,
    private candidatsService : CandidatsService,
    private messageService: MessageService,
    private fb: FormBuilder, public authService: LocalAuthService,
  ) {


  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();

    if (this.currentUser) {
      this.getAllExperienceForCandidate(this.currentUser.id)
      this.getAllEducationForCandidate(this.currentUser.id)

      this.addExperience();
      this.educationFormData();

    } else {
    //  this.addExperience(); // Ajout d'une expérience vide par défaut
    }



    this.candidatForm = this.fb.group({
      nom: [this.currentUser?.nom || ''],
      prenom: [this.currentUser?.prenom || ''],
      sexe: [this.currentUser?.sexe || ''],
      email: [this.currentUser?.email || ''],
      nationalite: [this.currentUser?.nationalite || ''],
      telephone: [this.currentUser?.telephone || ''],
      date_naissance: [this.currentUser?.date_naissance || ''],
      lieu_naissance: [this.currentUser?.lieu_naissance || ''],
      city: [this.currentUser?.city || ''],
      country: [this.currentUser?.country || ''],
      address: [this.currentUser?.address || ''],
      region: [this.currentUser?.region || ''],
      departement: [this.currentUser?.departement || ''],
      cni: [this.currentUser?.cni || ''],
      niu: [this.currentUser?.niu || ''],
      date_delivrance: [this.currentUser?.date_delivrance || ''],
      latitude: [this.currentUser?.latitude !== undefined ? this.currentUser.latitude : null],
      longitude: [this.currentUser?.longitude !== undefined ? this.currentUser.longitude : null],
      disponibilite: [this.currentUser?.disponibilite || ''],
      zone_geographique: [this.currentUser?.zone_geographique || ''],
      statut_matrimonial: [this.currentUser?.statut_matrimonial || ''],
      nombre_enfant: [this.currentUser?.nombre_enfant || ''],
      website: [this.currentUser?.website || ''],


      link_google: [this.currentUser?.link_google || ''],
      link_twitter: [this.currentUser?.link_twitter || ''],
      link_facebook: [this.currentUser?.link_facebook || ''],
      link_linkedin: [this.currentUser?.link_linkedin || ''],
      link_instagram: [this.currentUser?.link_instagram || ''],

      domaine: [this.currentUser?.domaine || ''],
      specialite: [this.currentUser?.specialite || ''],
      competence: [this.currentUser?.competence || ''],
      user_type : this.currentUser.user_type

    });


  }




  addExperience(): void {
    if (this.currentUser && this.currentUser.id) {
      this.experienceForm = this.fb.group({
        id: [null],
        company_name: ['', Validators.required],
        job_title: ['', Validators.required],
        start_date: ['', Validators.required],
        end_date: ['', Validators.required],
        candidat: [this.currentUser.id, Validators.required], // Utiliser currentUser.id
      });
    } else {
      console.error('Current user is not defined or missing an ID');
    }
  }

  educationFormData(): void {
    if (this.currentUser && this.currentUser.id) {
      this.educationForm = this.fb.group({
        id: [null],
        institution: ['', Validators.required],
        degree: ['', Validators.required],
        start_date: ['', Validators.required],
        end_date: ['', Validators.required],
        candidat: [this.currentUser.id, Validators.required], // Utiliser currentUser.id
      });
    } else {
      console.error('Current user is not defined or missing an ID');
    }
  }








  navigation() {
    this.router.navigate([routes.freelancerprofile])
  }


  updateProfile(): void {
    if (!this.currentUser || !this.currentUser.id) {
      return;
    }
    const candidat = {
      ...this.candidatForm.value,
      candidat: this.currentUser.id,
    };

    console.log(candidat)

      this.candidatsService.candidatsUpdate(candidat, this.currentUser.id).subscribe({
        next: (response: any) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Le profile a été mise à jour avec succès.' });
        },
        error: (error: any) => console.error('PUT error:', error),
      });

  }




  createOrUpdateEducation(): void {
    if (!this.currentUser || !this.currentUser.id) {
      return;
    }
    const education = {
      ...this.educationForm.value,
      candidat: this.currentUser.id,
    };
    if (this.isEditMode && education.id) {
      this.educationService.educationsUpdate(education, education.id).subscribe({
        next: (response: any) => {
          this.educationForm.reset();
          this.closeModal(7); // Fermer le modal
          this.getAllEducationForCandidate(this.currentUser.id)
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'La formation a été mise à jour avec succès.' });
        },
        error: (error: any) => console.error('PUT error:', error),
      });
    } else {
      this.educationService.educationsCreate(education).subscribe({
        next: (response: any) => {
          this.educationForm.reset();
          this.closeModal(7); // Fermer le modal
          this.getAllEducationForCandidate(this.currentUser.id)
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'La formation a été ajouter avec succès.' });

        },
        error: (error: any) => console.error('POST error:', error),
      });
    }
  }


  createOrUpdateExperience(): void {
    if (!this.currentUser || !this.currentUser.id) {
      return;
    }
    const experience = {
      ...this.experienceForm.value,
      candidat: this.currentUser.id,
    };
    if (this.isEditMode && experience.id) {
      this.experiencesService.experiencesUpdate(experience, experience.id).subscribe({
        next: (response: any) => {
          this.experienceForm.reset();
          this.closeModal(0); // Fermer le modal
          this.getAllExperienceForCandidate(this.currentUser.id)
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'L\'éxperience a été mise à jour avec succès.' });
        },
        error: (error: any) => console.error('PUT error:', error),
      });
    } else {
      this.experiencesService.experiencesCreate(experience).subscribe({
        next: (response: any) => {
          this.experienceForm.reset();
          this.closeModal(0); // Fermer le modal
          this.getAllExperienceForCandidate(this.currentUser.id)
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'L\'éxperience a été ajouter avec succès.' });

        },
        error: (error: any) => console.error('POST error:', error),
      });
    }
  }


  getEducation(id:string){
    this.educationService.educationsRead(id).subscribe({
      next:(response : Education) => {
        console.log('Education created:', response);
      },
      error: (error: any) => console.error('POST error:', error),
    });
  }




  private formatDate(date: Date | string): string {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }


  getAllExperienceForCandidate(candidatId: number) {
    this.experiencesService.experiencesList(candidatId).subscribe({
      next: (response: Array<Experience>) => {
        this.allExperiences = response;
      },
      error: (error: any) => console.error('GET error:', error),
    });
  }

  deleteExperience() {
    if (!this.selectedExperience) {
      return;
    }
    this.experiencesService.experiencesDelete(this.selectedExperience.id).subscribe({
      next: () => {
        this.getAllExperienceForCandidate(this.currentUser.id);
        this.closeModal(3)
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'L\'éxperience a été supprimé avec succès.' });
      },
      error: (error: any) => {
        this.closeModal(3)
        console.error('GET error:', error)
      },
    });
  }

  getAllEducationForCandidate(candidatId: number) {
    this.educationService.educationsList(candidatId).subscribe({
      next: (response: Array<Education>) => {
        this.allEducations = response;
      },
      error: (error: any) => console.error('GET error:', error),
    });
  }

  deleteEducation() {
    if (!this.selectedFormation) {
      return;
    }
    this.educationService.educationsDelete(this.selectedFormation.id).subscribe({
      next: () => {
        this.getAllEducationForCandidate(this.currentUser.id);
        this.closeModal(8)
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'La formation a été supprimé avec succès.' });
      },
      error: (error: any) => {
        this.closeModal(3)
        console.error('GET error:', error)
      },
    });
  }



  openModal(experience: any = null,index: number): void {
    this.isModalOpen[index] = true;
    this.isEditMode = !!experience;
    if (experience) {
      this.experienceForm.patchValue(experience);
    } else {
      this.experienceForm.reset();
    }
  }
  openModalEducation(education: any = null,index: number): void {
    this.isModalOpen[index] = true;
    this.isEditMode = !!education;
    if (education) {
      this.educationForm.patchValue(education);
    } else {
      this.educationForm.reset();
    }
  }

  closeModal(index: number) {
    this.isModalOpen[index] = false;

  }

  deleteModal(experience: any = null,index: number): void {
    this.selectedExperience = experience;
    this.isModalOpen[index] = true;
  }

  deleteFormation(formation: any = null,index: number): void {
    this.selectedFormation = formation;

    this.isModalOpen[index] = true;
    console.log(this.selectedFormation ,'this.selectedFormation ',this.isModalOpen[index])

  }

}
