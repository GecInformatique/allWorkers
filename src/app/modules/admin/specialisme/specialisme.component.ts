import {Component, OnInit, ViewChild} from '@angular/core';

// import { Subject } from "rxjs";

import { MatTableDataSource } from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import {
  Candidate,
  CandidateService, Competence, CompetenceService,
  DomainActivity,
  DomainActivityService, ProfessionService, Specialism, SpecialismService
} from 'src/app/core/libs/scripts/libs/all-workers-api';
import {apiResultFormat} from "../../../core/models/page/models";
import {Subject, takeUntil} from "rxjs";


@Component({
  selector: 'app-specialisme',
  templateUrl: './specialisme.component.html',
  styleUrls: ['./specialisme.component.scss']
})
export class SpecialismeComponent implements OnInit {

  specialisms: any[] = [];
  public currentSpecialism: any = {};
  public isEditMode: boolean = false;
  public isModalOpen: boolean = false;
  private destroy$ = new Subject<void>();
  dataSource!: MatTableDataSource<Specialism>;
  currentPage = 1;
  pageSize= 10; // Nombre d'éléments par page
  totalData = 0;
  professions: any[] = [];
  selectedProfessionId: number | null = null; // Separate property for id
  filteredData: any[] = [];


  @ViewChild(MatSort) sort!: MatSort;

  public searchDataValue = '';

  public lastIndex = 0;

  public pageNumberArray: Array<number> = [];

  public totalPages = 0;

  public url = "admin";

  constructor(
    private data: ShareDataService,
    private specialismService : SpecialismService,
    private professionService : ProfessionService,
    ) { }

  ngOnInit(): void {
    this.getSpecialismList();
    this.getProfessionList()
    console.log(this.currentSpecialism )
  }

  public onProfessionChange(selectedProfession: any): void {
    console.log('Selected Profession:', selectedProfession); // Vérifiez la valeur reçue

    // Mettre à jour currentSpecialism avec l'ID uniquement
    this.currentSpecialism.professions_id = selectedProfession ? selectedProfession.id : null;

    console.log('Current Specialism after Change:',  this.currentSpecialism.professions_id); // Vérifiez la valeur mise à jour
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getSpecialismList(): void {
    this.specialismService.getSpecialismList()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          this.specialisms = response.data || [];
          console.log('Request complete',this.specialisms)
          this.totalData = this.specialisms.length;
          this.updatePaginated()

          // Associer les spécialismes aux candidats
         this.getProfessionList()


        },
        error: error => console.error('GET error:', error),
        complete: () => console.log('Request complete')
      });
  }

  private getProfessionList(): void {
    this.professionService.getProfessionList()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          this.professions = response.data || [];
          console.log('profession complete',this.specialisms)

          this.specialisms.forEach(specialisms => {
            const profession = this.professions.find(spec => spec.id === specialisms.professions_id);
            specialisms.professionsmName = profession ? profession.name : 'Specialism not found';
          });
        },
        error: error => console.error('GET error:', error),
        complete: () => console.log('Request complete')
      });
  }

  public createSpecialism(specialism: any): void {

    console.log(specialism )
    const data = {
      name : specialism.name,
      description : specialism.description,
      professions_id: specialism.professions_id
    }
    this.specialismService.createSpecialism(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          console.log('Domain created:', response);
          this.getSpecialismList();
        },
        error: error => console.error('POST error:', error)
      });
  }

  private updateSpecialism(specialism: any): void {
    console.log(specialism)
    if (specialism.id !== undefined) {
      const data = {
        name : specialism.name,
        description : specialism.description,
        professions_id: specialism.professions_id
      }
      console.log(data,'data')
      this.specialismService.updateSpecialism(data, specialism.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response: any) => {
            console.log('Domain updated:', response);
            this.getSpecialismList();
          },
          error: error => console.error('PUT error:', error)
        });
    }
  }


  public onSubmit(): void {
    if (this.isEditMode) {
      this.updateSpecialism(this.currentSpecialism);
    } else {
      this.createSpecialism(this.currentSpecialism);
    }
    // Reset the form and close the modal
    this.currentSpecialism = {};
    this.selectedProfessionId = null; // Reset id
    this.isEditMode = false;
    this.closeModal();
  }

  public openModal(candidate?: any): void {
    if (candidate) {
      this.currentSpecialism = { ...candidate };
      this.selectedProfessionId = this.currentSpecialism.professions_id?.id || null; // Définir l'ID ici
      console.log('Candidate:', candidate);
      console.log('Current Specialism on Open:', this.currentSpecialism); // Vérifiez la valeur
      this.isEditMode = true;
    } else {
      this.currentSpecialism = {};
      this.selectedProfessionId = null;
      console.log('Opening Modal with No Candidate');
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

  updatePaginated() {
    this.filteredData = this.paginate(this.specialisms);
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



}

