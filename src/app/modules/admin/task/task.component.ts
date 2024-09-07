import {Component, OnInit, ViewChild} from '@angular/core';

// import { Subject } from "rxjs";

import { MatTableDataSource } from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import {
  Candidate,
  CandidateService, Competence, CompetenceService,
  DomainActivity,
  DomainActivityService
} from 'src/app/core/libs/scripts/libs/all-workers-api';
import {apiResultFormat} from "../../../core/models/page/models";
import {Subject, takeUntil} from "rxjs";


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  competences: any[] = [];
  public currentCompetence: Competence = {};
  public isEditMode: boolean = false;
  public isModalOpen: boolean = false;
  private destroy$ = new Subject<void>();
  dataSource!: MatTableDataSource<Competence>;
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
    private competenceService : CompetenceService,
    ) { }

  ngOnInit(): void {
    this.getAllDomains();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getAllDomains(): void {
    this.competenceService.getCompetenceList()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          this.competences = response.data || [];
          console.log('Request complete',this.competences)
          this.totalData = this.competences.length;
        },
        error: error => console.error('GET error:', error),
        complete: () => console.log('Request complete')
      });
  }

  private createDomain(competence: Competence): void {
    this.competenceService.createCompetence(competence)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          console.log('Domain created:', response);
          this.getAllDomains();
        },
        error: error => console.error('POST error:', error)
      });
  }

  private updateDomain(candidate: any): void {
    if (candidate.id !== undefined) {
      this.competenceService.updateCompetence(candidate, candidate.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response: any) => {
            console.log('Domain updated:', response);
            this.getAllDomains();
          },
          error: error => console.error('PUT error:', error)
        });
    }
  }

  public onSubmit(): void {
    if (this.isEditMode) {
      this.updateDomain(this.currentCompetence);
    } else {
      this.createDomain(this.currentCompetence);
    }
    // Reset the form and close the modal
    this.currentCompetence = {};
    this.isEditMode = false;
    this.closeModal();
  }

  public openModal(candidate?: Competence): void {
    if (candidate) {
      this.currentCompetence = { ...candidate };
      this.isEditMode = true;
    } else {
      this.currentCompetence = {};
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

