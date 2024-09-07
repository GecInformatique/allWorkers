import {Component, OnInit, ViewChild} from '@angular/core';

// import { Subject } from "rxjs";

import { MatTableDataSource } from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import {
  Candidate,
  CandidateService, Competence, CompetenceService, Condition, ConditionService,
  DomainActivity,
  DomainActivityService
} from 'src/app/core/libs/scripts/libs/all-workers-api';
import {apiResultFormat} from "../../../core/models/page/models";
import {Subject, takeUntil} from "rxjs";


@Component({
  selector: 'app-condition',
  templateUrl: './condition.component.html',
  styleUrls: ['./condition.component.scss']
})
export class ConditionComponent implements OnInit {

  conditions: any[] = [];
  filteredData: any[] = [];
  public currentCondition: Condition = {};
  public isEditMode: boolean = false;
  public isModalOpen: boolean = false;
  private destroy$ = new Subject<void>();
  dataSource!: MatTableDataSource<Condition>;
  currentPage = 1;
  pageSize= 10;
  totalData = 0;

  @ViewChild(MatSort) sort!: MatSort;
  public searchDataValue = '';
  public lastIndex = 0;
  public pageNumberArray: Array<number> = [];
  public totalPages = 0;


  constructor(
    private data: ShareDataService,
    private conditionService : ConditionService,
    ) { }

  ngOnInit(): void {
    this.getConditionList();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getConditionList(): void {
    this.conditionService.getConditionList()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          this.conditions = response.data || [];
          console.log('Request complete',this.conditions)
          this.totalData = this.conditions.length;
          this.updatePaginated()
        },
        error: error => console.error('GET error:', error),
        complete: () => console.log('Request complete')
      });
  }

  private createCondition(condition: Condition): void {
    console.log('created:', condition);
    this.conditionService.createCondition(condition)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          console.log('Domain created:', response);
          this.getConditionList();
        },
        error: error => console.error('POST error:', error)
      });
  }

  private updateCondition(condition: any): void {
    if (condition.id !== undefined) {
      this.conditionService.updateCondition(condition, condition.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response: any) => {
            console.log('Domain updated:', response);
            this.getConditionList();
          },
          error: error => console.error('PUT error:', error)
        });
    }
  }

  public onSubmit(): void {
    if (this.isEditMode) {
      this.updateCondition(this.currentCondition);
    } else {
      this.createCondition(this.currentCondition);
    }
    // Reset the form and close the modal
    this.currentCondition = {};
    this.isEditMode = false;
    this.closeModal();
  }

  public openModal(conditions?: Condition): void {
    if (conditions) {
      this.currentCondition = { ...conditions };
      this.isEditMode = true;
    } else {
      this.currentCondition = {};
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
    this.filteredData = this.paginate(this.conditions);
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

