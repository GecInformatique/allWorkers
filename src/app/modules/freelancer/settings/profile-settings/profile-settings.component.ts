import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { LocalAuthService } from 'src/app/core/data/local/local.auth.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import {MenuItem} from "primeng/api";
import {Education, EducationsService} from "../../../../core/allworker_api";
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
  educationForm !: FormGroup;
  mainForm !: FormGroup;
  //public education: number[] = [];
  public certification: number[] = [];

  public language: number[] = [];

  items: MenuItem[] | undefined;
  public datas : boolean[] = [true]
  public isCheckboxChecked = true;
  levels = ['Basic', 'Intermediate', 'Advanced'];
  skills = [{ name: '', level: '' }];


  constructor(
    private router: Router,private datePipe: DatePipe,
    private educationService : EducationsService,
    private fb: FormBuilder, public authService: LocalAuthService,
  ) {


  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
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
      latitude: [this.currentUser?.latitude || ''],
      longitude: [this.currentUser?.longitude || ''],
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

    });

    this.experienceForm = this.fb.group({
      experiences: this.fb.array([]),
    });

    // Initialize educationForm
    this.educationForm = this.fb.group({
      educations: this.fb.array([]),
    });

    // Add default experience and education entries if necessary
    this.addExperience();
    this.addEducation();



  }

  get experiences(): FormArray {
    return this.experienceForm.get('experiences') as FormArray;
  }

  get educations(): FormArray {
    return this.educationForm.get('educations') as FormArray;
  }

  addSkill() {
    this.skills.push({ name: '', level: '' });
  }

  removeSkill(index: number) {
    this.skills.splice(index, 1);
  }

 /*  addEducation(): void {
    this.educations.push(this.fb.group({
      institution: ['', Validators.required],
      degree: ['', Validators.required],
      startDate: ['', Validators.required],
      date_end: ['', Validators.required],
    }));
  } */

  addEducation(): void {
    const educationGroup = this.fb.group({
      institution: ['', Validators.required],
      degree: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      // Ajoutez d'autres contrôles ici, comme degree, startDate, etc.
    });
    this.educations.push(educationGroup);
  }
  removeEducation(index: number): void {
    this.educations.removeAt(index);
  }

  addCertification() {
    this.certification.push(1);
  }
  removeCertification(index: number) {
    this.certification.splice(index, 1);
  }

  addExperience(): void {
    const experienceDroup = this.fb.group({
      companyName: ['', Validators.required],
      position: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      // Ajoutez d'autres contrôles ici, comme degree, startDate, etc.
    });
    this.experiences.push(experienceDroup);
  }


  removeExperience(index: number) {
    this.experiences.removeAt(index);
  }

  addLanguage() {
    this.language.push(1);
  }
  removeLanguage(index: number) {
    this.language.splice(index, 1);
  }





  removeDatas(index: number) {
    this.datas[index] = !this.datas[index];
  }


  navigation() {
    this.router.navigate([routes.freelancerprofile])
  }
  showTimePicker: Array<string> = [];

  public hoursArray1 = [0];
  public hoursArray2 = [0];
  public hoursArray3 = [0];
  public hoursArray4 = [0];
  public hoursArray5 = [0];
  public hoursArray6 = [0];
  public hoursArray7 = [0];

  startTime1 = new Date();
  startTime2 = new Date();
  startTime3 = new Date();
  startTime4 = new Date();
  startTime5 = new Date();
  startTime6 = new Date();
  startTime7 = new Date();
  endTime1 = new Date();
  endTime2 = new Date();
  endTime3 = new Date();
  endTime4 = new Date();
  endTime5 = new Date();
  endTime6 = new Date();
  endTime7 = new Date();



  toggleTimePicker(value: string): void {
    if (this.showTimePicker[0] !== value) {
      this.showTimePicker[0] = value;
    } else {
      this.showTimePicker = [];
    }
  }
  formatTime(date: Date) {
    const selectedDate: Date = new Date(date);
    return this.datePipe.transform(selectedDate, 'h:mm a');
  }

  protected educationFormData(): any {
    return {
      name: this.educationForm.get('name')?.value || '',
      university_name: this.educationForm.get('university_name')?.value || '',
      date_end: this.educationForm.get('date_end')?.value || '',
      diploma: this.educationForm.get('diploma')?.value || '',
      date_start: this.educationForm.get('date_start')?.value || '',
      description: this.educationForm.get('description')?.value || '',
      candidates_id: this.educationForm.get('candidates_id')?.value || '',
    }
  }


  onSubmit(): void {
    this.createEducation(this.educationForm.value)

    if (this.experienceForm.valid && this.educationForm.valid) {
      console.log('Experience Form:', this.experienceForm.value);
      console.log('Education Form:', this.educationForm.value);
    } else {
      console.log('Forms are not valid');
    }
  }


  createEducation(education: Education) {
    console.log(education)
      this.educationService.educationsCreate(this.educationForm.value).subscribe({
        next: (response: any) => {
          console.log('Domain created:', response);
        },
        error: (error:any) => console.error('POST error:', error)
      });

  }

}
