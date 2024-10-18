import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalAuthService } from 'src/app/core/data/local/local.auth.service';
import { routes } from 'src/app/core/helpers/routes/routes';
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
  public selectedValue1 = '';
  public selectedValue2 = '';
  public selectedValue3 = '';
  public selectedValue4 = '';
  public selectedValue5 = '';
  public selectedValue6 = '';
  public selectedValue7 = '';
  public selectedValue8 = '';
  public selectedValue9 = '';
  public customvalue1 = '';
  candidatForm !: FormGroup;

  public skills: number[] = [];
  public education: number[] = [];
  public certification: number[] = [];
  public experience: number[] = [];
  public language: number[] = [];

  public datas : boolean[] = [true]
  public isCheckboxChecked = true;

  educationForm !: FormGroup
  addSkills() {
    this.skills.push(1);
  }
  removeSkills(index: number) {
    this.skills.splice(index, 1);
  }

  addEducation() {
    this.education.push(1);
  }
  removeEducation(index: number) {
    this.education.splice(index, 1);
  }

  addCertification() {
    this.certification.push(1);
  }
  removeCertification(index: number) {
    this.certification.splice(index, 1);
  }

  addExperience() {
    this.experience.push(1);
  }
  removeExperience(index: number) {
    this.experience.splice(index, 1);
  }

  addLanguage() {
    this.language.push(1);
  }
  removeLanguage(index: number) {
    this.language.splice(index, 1);
  }

  selectedList1: data[] = [
    { value: 'Basic' },
    { value: 'Intermediate' },
    { value: 'Expert' },
  ];
  selectedList2: data[] = [
    { value: 'Advanced' },
    { value: 'Intermediate' },
    { value: 'Expert' },
  ];
  selectedList3: data[] = [
    { value: 'Intermediate' },
    { value: 'Basic' },
    { value: 'Expert' },
  ];
  selectedList4: data[] = [
    { value: 'Intermediate' },
    { value: 'Basic' },
    { value: 'Expert' },
  ];
  selectedList5: data[] = [
    { value: 'Select' },
    { value: 'Intermediate' },
    { value: 'Expert' },
  ];
  selectedList6: data[] = [
    { value: 'Select' },
    { value: 'Intermediate' },
    { value: 'Expert' },
  ];
  selectedList7: data[] = [
    { value: 'Select' },
    { value: 'Intermediate' },
    { value: 'Expert' },
  ];
  selectedList8: data[] = [
    { value: 'Select' },
    { value: 'Intermediate' },
    { value: 'Expert' },
  ];
  selectedList9: data[] = [
    { value: 'Select' },
    { value: 'USA' },
    { value: 'UK' },
  ];
  custom1: data[] = [
    { value: 'Basic' },
    { value: 'Intermediate' },
    { value: 'Expert' },
  ];
  public currentUser: any;
  removeDatas(index: number) {
    this.datas[index] = !this.datas[index];
  }
  constructor(
    private router: Router,private datePipe: DatePipe,
    private fb: FormBuilder, public authService: LocalAuthService,
  ) {

  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser().data;

    console.log(this.currentUser,'info du candidat')
    this.candidatForm = this.fb.group({
      full_name: [this.currentUser?.full_name || ''],
      email: [this.currentUser?.email || ''],
      phone_number: [this.currentUser?.phone_number || ''],
      date_of_birth: [this.currentUser?.date_of_birth || ''],
      city: [this.currentUser?.city || ''],
      complete_address: [this.currentUser?.complete_address || ''],
      gender: [this.currentUser?.gender || ''],
    });

    this.educationForm = this.fb.group({
      'name': new FormControl<number | null>(null, []),
      'university_name': new FormControl<string>("", []),
      'date_end': new FormControl<string>("", []),
      'date_start': new FormControl<string>("", []),
      'diploma': new FormControl<string>("", []),
      'description': new FormControl<string>("", []),
    })



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
}
