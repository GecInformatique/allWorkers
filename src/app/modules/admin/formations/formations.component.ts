import {Component, OnInit, ViewChild} from '@angular/core';

// import { Subject } from "rxjs";

import { MatTableDataSource } from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import {
  Candidate,
  CandidateService, Competence, CompetenceService,
  DomainActivity,
  DomainActivityService, Formation, FormationService
} from 'src/app/core/libs/scripts/libs/all-workers-api';
import {apiResultFormat} from "../../../core/models/page/models";
import {Subject, takeUntil} from "rxjs";


@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.scss']
})
export class FormationsComponent implements OnInit {

  formations: any[] = [];
  public currentFormation: any = {};
  public isEditMode: boolean = false;
  public isModalOpen: boolean = false;
  private destroy$ = new Subject<void>();
  dataSource!: MatTableDataSource<Formation>;
  currentPage = 1;
  pageSize= 10; // Nombre d'éléments par page
  totalData = 0;

  @ViewChild(MatSort) sort!: MatSort;

  public searchDataValue = '';

  public lastIndex = 0;

  public pageNumberArray: Array<number> = [];

  public totalPages = 0;

  public url = "admin";

  constructor(
    private data: ShareDataService,
    private formationService : FormationService,
    ) { }

  ngOnInit(): void {
    this.getFormationList();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getFormationList(): void {
    this.formationService.getFormationList()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          this.formations = response.data || [];
          console.log('Request complete',this.formations)
          this.totalData = this.formations.length;
        },
        error: error => console.error('GET error:', error),
        complete: () => console.log('Request complete')
      });
  }

  private createFormation(formation: Formation): void {
    this.formationService.createFormation(formation)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          console.log('Domain created:', response);
          this.getFormationList();
        },
        error: error => console.error('POST error:', error)
      });
  }

  private updateFormation(formation: any): void {
    if (formation.id !== undefined) {
      this.formationService.updateFormation(formation, formation.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response: any) => {
            console.log('Formation updated:', response);
            this.getFormationList();
          },
          error: error => console.error('PUT error:', error)
        });
    }
  }

  public onSubmit(): void {
    if (this.isEditMode) {
      this.updateFormation(this.currentFormation);
    } else {
      this.createFormation(this.currentFormation);
    }
    // Reset the form and close the modal
    this.currentFormation = {};
    this.isEditMode = false;
    this.closeModal();
  }

  public openModal(formation?: Formation): void {
    if (formation) {
      this.currentFormation = { ...formation };
      this.isEditMode = true;
    } else {
      this.currentFormation = {};
      this.isEditMode = false;
    }
    this.isModalOpen = true;
  }

  public closeModal(): void {
    this.isModalOpen = false;
  }












  paginate(data: DomainActivity[]): DomainActivity[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return data.slice(startIndex, endIndex);
  }


}

