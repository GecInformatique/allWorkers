import {Component, OnInit, ViewChild} from '@angular/core';

// import { Subject } from "rxjs";

import { MatTableDataSource } from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import {
  Candidate,
  CandidateService, Competence, CompetenceService,
  DomainActivity,
  DomainActivityService, Education, EducationService
} from 'src/app/core/libs/scripts/libs/all-workers-api';
import {apiResultFormat} from "../../../core/models/page/models";
import {Subject, takeUntil} from "rxjs";


@Component({
  selector: 'app-educations',
  templateUrl: './educations.component.html',
  styleUrls: ['./educations.component.scss']
})
export class EducationsComponent implements OnInit {

  educations: any[] = [];
  public currentEducation: Education = {};
  public isEditMode: boolean = false;
  public isModalOpen: boolean = false;
  private destroy$ = new Subject<void>();
  dataSource!: MatTableDataSource<Education>;
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
    private educationService : EducationService,
    ) { }

  ngOnInit(): void {
    this.getAllEducations();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getAllEducations(): void {
    this.educationService.c60a02fb9b8f47ec62a04af6809de18f()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          this.educations = response.data || [];
          console.log('Request complete',this.educations)
          this.totalData = this.educations.length;
        },
        error: error => console.error('GET error:', error),
        complete: () => console.log('Request complete')
      });
  }

  private createEducation(education: Education): void {
    this.educationService.createEducation(education)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          console.log('Domain created:', response);
          this.getAllEducations();
        },
        error: error => console.error('POST error:', error)
      });
  }

  private updateEducation(education: any): void {
    if (education.id !== undefined) {
      this.educationService.updateEducation(education, education.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response: any) => {
            console.log('Domain updated:', response);
            this.getAllEducations();
          },
          error: error => console.error('PUT error:', error)
        });
    }
  }

  public onSubmit(): void {
    if (this.isEditMode) {
      this.updateEducation(this.currentEducation);
    } else {
      this.createEducation(this.currentEducation);
    }
    // Reset the form and close the modal
    this.currentEducation = {};
    this.isEditMode = false;
    this.closeModal();
  }

  public openModal(education?: Education): void {
    if (education) {
      this.currentEducation = { ...education };
      this.isEditMode = true;
    } else {
      this.currentEducation = {};
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

