import { Profession } from './../../../core/libs/scripts/libs/all-workers-api/model/profession';

import {Component, OnInit} from '@angular/core';
import {  Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ShareDataService} from "../../../core/data/share-data.service";
import { routes } from 'src/app/core/helpers/routes/routes';
import {
 Candidate,
  Competence,
  CompetenceService,
  DomainActivity,
  DomainActivityService,  ProfessionService,
  Specialism,
  SpecialismService
} from "../../../core/libs/scripts/libs/all-workers-api";
import cities from 'src/assets/json/cities.json';
import countries from 'src/assets/json/countries.json';
import domaines  from 'src/assets/json/domaines.json';
import specialites from 'src/assets/json/specialites.json';
import competences  from 'src/assets/json/competences.json';
import professions  from 'src/assets/json/Professions.json';
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";
import {AuthService} from "../../../core/libs/scripts/allworker_api";

export interface City {
  id: string;
  name: string;
  pays_id: string
}
export interface Country {
  id: string;
  name: string;

}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent  implements OnInit{
public routes = routes;
  registerForm!: FormGroup;
  public accountsType = 5;
  cities: Array<City> = [];
  countries: any = [];
  domainActivity : any[] =[];
  specialisms : any[] =[];
  professionList : any[] =[];
  competence : any[] =[];
  filteredProfessions: any[] = [];
  filteredSpecialism: any[] = [];
  filteredCompetence: any[] = [];
  filteredCity: any[] = [];
  selectedDomain !: number;
  selectedProfession !: number;
  selectedCompetence !: any;
  gender : any[]=[]
public displayBlock = false;
public displayNone = false;
public selectedFieldSet = [0];
  maxDate: string;

  stepIndex = 0; // Index de l'étape actuelle, commence à 0

public selectedValue2 = '';

public skills: number[] = [];
public education: number[] = [];
public certification: number[] = [];
public experience: number[] = [];

public password: boolean[] = [true];

  constructor(
    public Router: Router,
    private domainActivityService: DomainActivityService,
    private specialismService: SpecialismService,
    private professionService: ProfessionService,
    private competenceService: CompetenceService,
    private http: HttpClient,
    private authService: AuthService,
    private fb: FormBuilder,
    private dataservice: ShareDataService) {
    this.maxDate = this.getMaxDateFor18YearsOld();
  }



public togglePassword(index: number) {
    this.password[index] = !this.password[index];
  }
  login() {
    this.Router.navigate([routes.freelancer_onboard])
  }


  submitForm() {
    this.Router.navigate([this.routes.freelancer_onboard]);
  }

  none() {
    this.displayNone = !this.displayNone;
  }
  block() {
    this.displayBlock = !this.displayBlock;
  }

  ngOnInit(): void {
    this.countries = countries.pays;
    this.cities= cities.cities;
   this.competence = competences.competences;
   this.professionList = professions.professions
    this.loadDomainData();
    this.getSpecialismList();
    this.getCompetenceList()
    this.registerForm = this.fb.group({
      'accountsType': new FormControl<number|null>(null, [Validators.required]),
      'nom': new FormControl<string>("", [Validators.required]),
      'prenom': new FormControl<string>(""),
      'date_naissance': new FormControl<string>("", [Validators.required]),
      'email': new FormControl<string>(""),
      'telephone': new FormControl<string>(""),
      'sexe': new FormControl<string>("", [Validators.required]),
      'city': new FormControl<string>("", [Validators.required]),
      'password': new FormControl<string>("", [Validators.required]),
      'country': new FormControl<number|null>(null, [Validators.required]),
      'address': new FormControl<string>(""),
      'domaine': new FormControl<number|null>(null, ),
      'specialite': new FormControl<number|null>(null, ),
      'competence': new FormControl<number[]>([], ),
    });

    this.gender= [
      { name: "M", display: "Masculin" },
      { name: "F", display: "Féminin" }
    ];


  }




  protected transformFormData(): any {
    // Récupérer les valeurs du formulaire
    const professionValue = this.registerForm.get('profession')?.value;
    const competencesValue = this.registerForm.get('competence')?.value;
    const domainActivity = this.registerForm.get('domaine')?.value;
    const country =  this.registerForm.get('country')?.value;
    //const profession = this.registerForm.get('profession')?.value;
    const specialism = this.registerForm.get('specialite')?.value;
    const accountsTypeValue = this.registerForm.get('accountsType')?.value;


    // Vérifier si domainActivity, country, specialism sont des objets et extraire les IDs
    const domainName = domainActivity && typeof domainActivity === 'object' ? domainActivity.name : domainActivity;
    const countryName = country && typeof country === 'object' ? country.name : country;
    //const professionId = profession && typeof profession === 'object' ? profession.id : profession;
    const specialiteName = specialism && typeof specialism === 'object' ? specialism.name : specialism;

    // Extraire les IDs des compétences
    const competenceName = Array.isArray(competencesValue)
      ? competencesValue.map((item: any) => item.value).join(', ')  // Joindre les compétences par une virgule
      : '';
    return {
     // group_id: accountsTypeValue || null, // Assurez-vous que c'est un ID
      nom: this.registerForm.get('nom')?.value || '' ,
      prenom: this.registerForm.get('prenom')?.value || '',
      date_naissance: this.registerForm.get('date_naissance')?.value || '',
      email: this.registerForm.get('email')?.value || '',
      telephone: this.registerForm.get('telephone')?.value || '',
      sexe: this.registerForm.get('sexe')?.value || '',
      city: this.registerForm.get('city')?.value || '',
      password: this.registerForm.get('password')?.value || '',

      address: this.registerForm.get('address')?.value || '',
      domaine: domainName || null, // Assurez-vous que c'est un ID
      country : countryName || null,
      specialite: specialiteName || null, // Assurez-vous que c'est un ID
      competence: competenceName, // Extraction des IDs des compétences
    };
  }




  private loadDomainData(): void {

    this.domainActivity= domaines.domaines;

  }





  getSpecialismList() {
    this.specialisms = specialites.specialites;

  }


  private getCompetenceList(): void {

    this.competence= competences.competences;

  }

  /* getCompetenceList() {
    this.competenceService.getCompetenceList().subscribe(
      (response: any) => {
        // Transformation des données
        this.competence = Array.isArray(response.data) ?
          response.data.map((comp: any) => ({
            label: comp.name, // Affiche le nom de la compétence
            value: comp.id  // Utilise l'ID de la compétence
          }))
          : [];


      },
      error => console.error('GET error:', error)
    );
  } */


  onSubmit(step: number) {

     // Vérifiez le format avant l'envoi
    if (this.registerForm.valid) {
      const candidate = this.transformFormData();
      this.authService.authRegister(candidate).subscribe({
        next: (response: any) => {
          console.log('Domain created:', response);
        },
        error: (error:any) => console.error('POST error:', error)
      });
      this.selectedFieldSet[0] = step;

    }
  }

  backToHome() : void{
    this.Router.navigate([routes.home])
  }

  nextStep(stepNumber: number): void {
    if(this.isStepValid(this.stepIndex)){
      this.stepIndex = stepNumber;
      this.selectedFieldSet[0] = stepNumber;
    }
  }

  // Méthode pour revenir à l'étape précédente
  previousStep() {
    if (this.stepIndex > 0) {
      this.stepIndex--; // Décrémenter l'index pour revenir à l'étape précédente
      this.selectedFieldSet[0] = this.stepIndex; // Mettre à jour la vue pour afficher l'étape précédente
    }
  }

  selectAccount(account: number) {
    this.accountsType = account;
    this.registerForm.controls['accountsType'].setValue(account);
  }


  onDomainChange(event: any): void {

    const selectedDomainId = event.value ? event.value.id : null;
    if (selectedDomainId) {
      this.filteredSpecialism = this.specialisms.filter(
        specialite => specialite.domaine_id === selectedDomainId

      );
    } else {
      this.filteredSpecialism = [];
    }
  }


  onCountryChange(event: any): void {
    const selectedCountryId = event.target.value;
    if (selectedCountryId) {
      this.filteredCity = this.cities.filter(
        city => city.pays_id === selectedCountryId
      );

    } else {
      this.filteredCity = [];
    }
  }



  onspecialiteChange(event: any): void {
    const selectSpecialiteId = event.value? event.value.id : null;
    if(selectSpecialiteId){
      this.filteredCompetence = this.competence.filter(
        comp=>comp.specialite_id === selectSpecialiteId
        )
    }else{
      this.filteredCompetence;
    }
   ;

  }

  onFilterSpecialisms(event: any): void {
    const query = event.filter.toLowerCase();

    // Filtrer la liste des spécialités selon la saisie de l'utilisateur
    this.filteredSpecialism = this.specialisms.filter(specialism =>
      specialism.name.toLowerCase().includes(query)
    );
  }

  private getMaxDateFor18YearsOld(): string {
    const today = new Date();
    const maxDate = new Date(today.setFullYear(today.getFullYear() - 18));
    return maxDate.toISOString().split('T')[0]; // Format yyyy-mm-dd
  }


  // Vérifier si l'étape actuelle est valide
  isStepValid(stepIndex: number): boolean {
    switch(stepIndex) {
      case 0:
        // Vérifier la validité des champs de l'étape 0
        return (this.registerForm.get('accountsType')?.valid ?? false);

      case 1:
        // Vérifier la validité des champs de l'étape 1

        return (this.registerForm.get('nom')?.valid ?? false) &&
        (this.registerForm.get('prenom')?.valid ?? false) &&
        (this.registerForm.get('date_naissance')?.valid ?? false) &&
        (this.registerForm.get('email')?.valid ?? false) &&
        (this.registerForm.get('telephone')?.valid ?? false)&&
        (this.registerForm.get('password')?.valid ?? false);

      case 2:
        // Vérifier la validité des champs de l'étape 3

        return (this.registerForm.get('domaine')?.valid ?? false) &&
          (this.registerForm.get('competence')?.valid ?? false) &&
          (this.registerForm.get('specialite')?.valid ?? false);

      // Ajouter des cases supplémentaires pour les autres étapes
      default:
        return true; // Par défaut, considérer l'étape comme valide
    }
  }
}
