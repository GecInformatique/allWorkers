import {Component, OnInit, ViewChild} from '@angular/core';

// import { Subject } from "rxjs";

import { MatTableDataSource } from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import {
  Candidate,
  CandidateService,
  CompetenceService,
  DomainActivity,
  DomainActivityService,
  ProfessionService,
  SpecialismService
} from 'src/app/core/libs/scripts/libs/all-workers-api';
import {apiResultFormat} from "../../../core/models/page/models";
import {Subject, takeUntil} from "rxjs";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MessageService} from "primeng/api";


@Component({
  selector: 'app-candidats',
  templateUrl: './candidats.component.html',
  styleUrls: ['./candidats.component.scss']
})
export class CandidatsComponent implements OnInit {

  candidates: any[] = [];
  filteredData: any[] = [];
  public currentCandidate: any = {};
  public isEditMode: boolean = false;
  public isModalOpen: boolean = false;
  private destroy$ = new Subject<void>();
  dataSource!: MatTableDataSource<Candidate>;
  currentPage = 1;
  pageSize= 10;
  totalData = 0;
  candidatForm!: FormGroup;
  maxDate: string;

  @ViewChild(MatSort) sort!: MatSort;

  public searchDataValue = '';
  public lastIndex = 0;
  public pageNumberArray: Array<number> = [];
  public totalPages = 0;
  domainActivity : any[] =[];
  specialisms : any[] =[];
  professions : any[] =[];
  competence : any[] =[];
  filteredProfessions: any[] = [];
  filteredSpecialism: any[] = [];
  selectedDomain !: number;
  selectedProfession !: number;
  selectedCompetence !: any;

  constructor(
    private data: ShareDataService,
    private candidateService : CandidateService,
   // private domainActivityService: DomainActivityService,
    private specialismService: SpecialismService,
    private professionService: ProfessionService,
    private competenceService: CompetenceService,
    private messageService: MessageService,

    private fb: FormBuilder,
    ) {this.maxDate = this.getMaxDateFor18YearsOld(); }

  ngOnInit(): void {
    this.getCandidateList();
    this.getAllDomainActivity();
    this.getCompetenceList();
    this.getProfessionList();
    this.getSpecialismList();
    this.candidatForm = this.fb.group({
      'accountsType': new FormControl<number|null>(null, [Validators.required]),
      'last_name': new FormControl<string>("", [Validators.required]),
      'first_name': new FormControl<string>("", [Validators.required]),
      'day_birth': new FormControl<string>("", ),
      'email': new FormControl<string>(""),
      'phone_number': new FormControl<string>(""),
      'gender': new FormControl<string>("", [Validators.required]),
      'city': new FormControl<string>("", [Validators.required]),
      'complete_address': new FormControl<string>(""),
      'domain_activity': new FormControl<number|null>(null, [Validators.required]),
      'profession': new FormControl<number[]|null>([], [Validators.required]),
      'specialisms': new FormControl<number|null>(null, [Validators.required]),
      'competences': new FormControl<number[]>([], [Validators.required]),
      'nationality': new FormControl<string>("", [Validators.required]),
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getCandidateList(): void {
    this.candidateService.getCandidateList()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          this.candidates = response.data || [];
          console.log('Request complete',this.candidates)
          this.totalData = this.candidates.length;
          this.updatePaginated()
        },
        error: error => console.error('GET error:', error),
        complete: () => console.log('Request complete')
      });
  }

  private createCandidat(candidates: Candidate): void {
    const candidate = this.transformFormData();
    console.log(candidate,'candidat pour enregistrement')
    this.candidateService.createCandidate(candidate)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          this.candidatForm.reset()
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Le candidat a été ajouté avec success' });
          console.log('Domain created:', response);
          this.getCandidateList();
        },
        error: error => {
          this.messageService.add({ severity: 'danger', summary: 'danger', detail: 'Erreur l\'ors de la creation du candidat' });

          console.error('POST error:', error)
        }      });
  }

  private updateCandidat(candidate: any): void {
    if (candidate.id !== undefined) {
      this.candidateService.updateCandidate(candidate, candidate.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response: any) => {
            console.log('Domain updated:', response);
            this.getCandidateList();
          },
          error: error => console.error('PUT error:', error)
        });
    }
  }

  public onSubmit(): void {
    if (this.isEditMode) {
      this.updateCandidat(this.currentCandidate);
    } else {
      this.createCandidat(this.currentCandidate);
    }
    // Reset the form and close the modal
    this.currentCandidate = {};
    this.isEditMode = false;
    this.closeModal();
  }

  public openModal(candidate?: Candidate): void {
    if (candidate) {
      this.currentCandidate = { ...candidate };
      this.isEditMode = true;
    } else {
      this.currentCandidate = {};
      this.isEditMode = false;
    }
    this.isModalOpen = true;
  }

  public closeModal(): void {
    this.isModalOpen = false;
  }


  openDeleteModal(candidate: Candidate): void {

  }






  paginate(data: any[]): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return data.slice(startIndex, endIndex);
  }

  updatePaginated() {
    this.filteredData = this.paginate(this.candidates);
  }

  goToNextPage() {
    if (this.currentPage * this.pageSize < this.totalData) {
      this.currentPage++;
      this.updatePaginated();
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginated();
    }
  }



  protected transformFormData(): any {
    // Récupérer les valeurs du formulaire
    const professionValue = this.candidatForm.get('profession')?.value;
    const competencesValue = this.candidatForm.get('competences')?.value;
    const domainActivity = this.candidatForm.get('domain_activity')?.value;
    const profession = this.candidatForm.get('profession')?.value;
    const specialism = this.candidatForm.get('specialisms')?.value;
    const accountsTypeValue = this.candidatForm.get('accountsType')?.value;

    // Log pour vérifier la valeur pendant la transformation
    console.log('Transform FormData - accountsType:', accountsTypeValue);

    // Vérifier si domainActivity, profession, specialism sont des objets et extraire les IDs
    const domainActivityId = domainActivity && typeof domainActivity === 'object' ? domainActivity.id : domainActivity;
    const professionId = profession && typeof profession === 'object' ? profession.id : profession;
    const specialismId = specialism && typeof specialism === 'object' ? specialism.id : specialism;

    // Extraire les IDs des compétences
    const competenceIds = Array.isArray(competencesValue) ? competencesValue.map((item: any) => item.value) : [];

    return {
      group_id: 5 || null, // Assurez-vous que c'est un ID
      full_name: `${this.candidatForm.get('first_name')?.value || ''} ${this.candidatForm.get('last_name')?.value || ''}`,
      owner_name: this.candidatForm.get('first_name')?.value || '',
      pseudo: this.candidatForm.get('last_name')?.value || '',
      day_birth: this.candidatForm.get('day_birth')?.value || '',
      email: this.candidatForm.get('email')?.value || '',
      phone_number: this.candidatForm.get('phone_number')?.value || '',
      gender: this.candidatForm.get('gender')?.value || '',
      city: this.candidatForm.get('city')?.value || '',
      complete_address: this.candidatForm.get('complete_address')?.value || '',
      nationality: this.candidatForm.get('nationality')?.value || '',
      domain_activity_id: domainActivityId || null, // Assurez-vous que c'est un ID
      profession_id: professionId || null, // Extraction des IDs
      specialisms_id: specialismId || null, // Assurez-vous que c'est un ID
      competences: competenceIds, // Extraction des IDs des compétences
      enable: 1,
      is_partner: 0,
      published_online: 0,
      profile_update: 0,
      profile_verify_by_admin: 0,
      profile_certificate: 0,
      current_salary: 0,
      status_user: 'pending',
      status_receiver_notification_job: 0,
      last_connection: new Date().toISOString().split('T')[0],
      date_start_experience: new Date().toISOString().split('T')[0],
    };
  }

  private getMaxDateFor18YearsOld(): string {
    const today = new Date();
    const maxDate = new Date(today.setFullYear(today.getFullYear() - 18));
    return maxDate.toISOString().split('T')[0]; // Format yyyy-mm-dd
  }


  getAllDomainActivity() {
   /* this.domainActivityService.getDomainActivityList().subscribe(
      (response: any )=> {
        this.domainActivity = response.data;
        console.log(this.domainActivity)
      },
      error => console.error('GET error:', error)
    )*/
  }

  getProfessionList() {
    this.professionService.getProfessionList().subscribe(
      (response: any )=> {
        this.professions = response.data;
        console.log(this.professions)
      },
      error => console.error('GET error:', error)
    )
  }

  getSpecialismList() {
    this.specialismService.getSpecialismList().subscribe(
      (response: any )=> {
        this.specialisms = response.data;
        console.log(this.specialisms)
      },
      error => console.error('GET error:', error)
    )
  }

  getCompetenceList() {
    this.competenceService.getCompetenceList().subscribe(
      (response: any) => {
        // Transformation des données
        this.competence = Array.isArray(response.data) ?
          response.data.map((comp: any) => ({
            label: comp.name, // Affiche le nom de la compétence
            value: comp.id  // Utilise l'ID de la compétence
          }))
          : [];

        console.log(this.competence);
      },
      error => console.error('GET error:', error)
    );
  }


  onDomainChange(domain: any) {
    console.log(domain)
    this.filteredProfessions = this.professions.filter(prof => {
      return +prof.domain_activities_id === +domain.value.id;
    });
  }

  onProfessionChange(profession: any) {
    this.filteredSpecialism = this.specialisms.filter(prof => {
      return +prof.professions_id === +profession.value.id;
    });
  }

}

