import {Component, OnInit, ViewChild} from '@angular/core';

// import { Subject } from "rxjs";

import { MatTableDataSource } from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import {
  Candidate,
  CandidateService, Competence, CompetenceService,
  DomainActivity,
  DomainActivityService, Profession, ProfessionService
} from 'src/app/core/libs/scripts/libs/all-workers-api';
import {apiResultFormat} from "../../../core/models/page/models";
import {Subject, takeUntil} from "rxjs";


@Component({
  selector: 'app-profession',
  templateUrl: './profession.component.html',
  styleUrls: ['./profession.component.scss']
})
export class ProfessionComponent implements OnInit {


  professions: any[] = [];
  domainActyvites: any[] = [];
  filteredProfessions: any[] = []; // Professions paginées
  public currentProfessions: any = {};
  public isEditMode: boolean = false;
  public isModalOpen: boolean = false;
  private destroy$ = new Subject<void>();
  dataSource!: MatTableDataSource<Profession>;
  currentPage = 1;
  pageSize = 10; // Nombre d'éléments par page
  totalData = 0;
  selectedProfessionId: number | null = null; // Separate property for id


  @ViewChild(MatSort) sort!: MatSort;
  public searchDataValue = '';
  public lastIndex = 0;
  public pageNumberArray: Array<number> = [];
  public totalPages = 0;

  constructor(
    private professionService : ProfessionService,
    private domainActivityService : DomainActivityService,
  ) { }

  ngOnInit(): void {
    this.getProfessionList();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getProfessionList(): void {
    this.professionService.getProfessionList()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          this.professions = response.data || [];
          console.log('professions complete',this.professions)
          this.totalData = this.professions.length;
          this.updatePaginatedProfessions(); // Mise à jour des professions paginées
          this.getDomainList()
        },
        error: error => console.error('GET error:', error),
        complete: () => console.log('Request complete')
      });
  }


  private getDomainList(): void {
    this.domainActivityService.getDomainActivityList()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          this.domainActyvites = response.data || [];
          console.log('domainActyvites complete',this.domainActyvites)
          console.log('profession complete',this.professions)

          this.professions.forEach(profession => {
            const professions = this.domainActyvites.find(spec => spec.id === profession.domain_activities_id);
            profession.domaineName = professions ? professions.name : 'domaine not found';
          });
        },
        error: error => console.error('GET error:', error),
        complete: () => console.log('Request complete')
      });
  }

  private createProfession(profession: Profession): void {
    this.professionService.createProfession(profession)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          console.log('Domain created:', response);
          this.getProfessionList();
        },
        error: error => console.error('POST error:', error)
      });
  }

  private updateProfession(profession: any): void {
    if (profession.id !== undefined) {
      console.log(profession)
        const data = {
          name : profession.name,
          description : profession.description,
          domain_activities_id: profession.domain_activities_id
        }
      this.professionService.updateProfession(profession, profession.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response: any) => {
            console.log('Domain updated:', response);
            this.getProfessionList();
          },
          error: error => console.error('PUT error:', error)
        });
    }
  }

  public onSubmit(): void {
    if (this.isEditMode) {
      this.updateProfession(this.currentProfessions);
    } else {
      this.createProfession(this.currentProfessions);
    }
    // Reset the form and close the modal
    this.currentProfessions = {};
    this.isEditMode = false;
    this.closeModal();
  }

  public openModal(profession?: Profession): void {
    if (profession) {
      this.currentProfessions = { ...profession };
      this.selectedProfessionId = this.currentProfessions.domain_activities_id?.id || null; // Définir l'ID ici

      this.isEditMode = true;
    } else {
      this.currentProfessions = {};
      this.selectedProfessionId = null;
      this.isEditMode = false;
    }
    this.isModalOpen = true;
  }

  public closeModal(): void {
    this.isModalOpen = false;
  }

  paginate(data: any[]): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return data.slice(startIndex, endIndex);
  }

  updatePaginatedProfessions() {
    this.filteredProfessions = this.paginate(this.professions);
  }

  goToNextPage() {
    if (this.currentPage * this.pageSize < this.totalData) {
      this.currentPage++;
      this.updatePaginatedProfessions();
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedProfessions();
    }
  }

  public onProfessionChange(selectedProfession: any): void {
    console.log('Selected Profession:', selectedProfession); // Vérifiez la valeur reçue

    // Mettre à jour currentSpecialism avec l'ID uniquement
    this.currentProfessions.domain_activities_id = selectedProfession ? selectedProfession.id : null;

    console.log('Current Specialism after Change:',  this.currentProfessions.domain_activities_id); // Vérifiez la valeur mise à jour
  }
}
