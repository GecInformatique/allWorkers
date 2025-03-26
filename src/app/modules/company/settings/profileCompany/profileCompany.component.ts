import { Component, OnDestroy, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LocalAuthService} from "../../../../core/data/local/local.auth.service";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import { routes } from 'src/app/core/helpers/routes/routes';
import {Entreprise, EntreprisesService} from "../../../../core/allworker_api";
import categories from 'src/assets/json/categories.json';
import cities from 'src/assets/json/cities.json';
import countries from 'src/assets/json/countries.json';
import domaines  from 'src/assets/json/domaines.json';

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
  selector: 'app-profileCompany',
  templateUrl: './profileCompany.component.html',
  styleUrls: ['./profileCompany.component.scss'],
})
export class ProfileCompanyComponent implements OnInit, OnDestroy {

  public routes = routes;
  public currentUser: any;
  companyForm !: FormGroup;
  company !: Entreprise
  categories: any[] = [];
  cities: Array<City> = [];
  countries: any = [];
  domainActivity : any[] =[];
  filteredCity: any[] = [];
  constructor(
    private router: Router,private datePipe: DatePipe,
    private messageService: MessageService,
    private entreprisesService: EntreprisesService,
    private fb: FormBuilder, public authService: LocalAuthService,
  ) {}



  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.categories = categories.categorie;
    this.countries = countries.pays;
    this.cities = cities.cities;
    this.domainActivity= domaines.domaines;
    /*this.getCompanyById(this.currentUser.id)*/


    this.companyDataForm()
  }

  companyDataForm(){
    const selectedDomain = this.domainActivity.find(
      (domain) => domain.name === this.currentUser?.secteur_activite
    )
    this.companyForm = this.fb.group({
      nom: [this.currentUser?.nom || ''],
      adresse: [this.currentUser?.adresse || ''],
      telephone: [this.currentUser?.telephone || ''],
      site_web: [this.currentUser?.site_web || ''],
      description: [this.currentUser?.description || ''],
      type_entreprise: [this.currentUser?.type_entreprise || ''],
      secteur_activite: selectedDomain,
      nui: [this.currentUser?.nui || ''],
      city: [this.currentUser?.city || ''],
      country: [this.currentUser?.country || ''],
      email: [this.currentUser?.email || ''],
      user_type : [this.currentUser?.user_type || ''],

    });
  }

  ngOnDestroy(): void {
  }

  private getCompanyById(companyId : number) {
    this.entreprisesService.entreprisesRead(companyId).subscribe({
      next: (response: Entreprise ) => {
        this.currentUser = response;
        console.log(this.currentUser,'apres modification')

        // Mettre à jour le local storage avec les nouvelles informations
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      },
      error: (error: any) => console.error('GET error:', error),
    });
  }

  updateCompanyProfile(): void {
    console.log(this.currentUser,this.companyForm.value,)
    if (!this.currentUser || !this.currentUser.id) {
      return;
    }
    const company = {
      ...this.companyForm.value,
      company: this.currentUser.id,
      secteur_activite: this.companyForm.value.secteur_activite?.name,
    };

    console.log(company)

    this.entreprisesService.entreprisesUpdate(company, this.currentUser.id).subscribe({
      next: (response: any) => {
        this.getCompanyById(response.id)
        console.log(response)
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Le profile a été mise à jour avec succès.' });
      },
      error: (error: any) => console.error('PUT error:', error),
    });

  }

  onCountryChange(event: any): void {
    const selectedCountryId = event.target.value;
    const selectedCountry = this.countries.find((country:any) => country.id === selectedCountryId);

    if (selectedCountry) {
      // Utilisez l'ID pour filtrer les villes
      this.filteredCity = this.cities.filter(city => city.pays_id === selectedCountryId);

      // Enregistrez le nom du pays pour la sauvegarde
      this.companyForm.get('countryName')?.setValue(selectedCountry.name);
    } else {
      this.filteredCity = [];
      this.companyForm.get('countryName')?.setValue(null);
    }
  }
}
