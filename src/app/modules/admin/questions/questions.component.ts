import {Component, OnInit, ViewChild} from '@angular/core';

// import { Subject } from "rxjs";

import { MatTableDataSource } from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import {
  Candidate,
  CandidateService, Competence, CompetenceService,
  DomainActivity,
  DomainActivityService, Question, QuestionService
} from 'src/app/core/libs/scripts/libs/all-workers-api';
import {apiResultFormat} from "../../../core/models/page/models";
import {Subject, takeUntil} from "rxjs";


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  questions: any[] = [];
  public currentQuestion: Question = {};
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
    private questionService : QuestionService,
    ) { }

  ngOnInit(): void {
    this.getQuestionList();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getQuestionList(): void {
    this.questionService.getQuestionList()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          this.questions = response.data || [];
          console.log('Request complete',this.questions)
          this.totalData = this.questions.length;
        },
        error: error => console.error('GET error:', error),
        complete: () => console.log('Request complete')
      });
  }

  private createQuestion(competence: Competence): void {
    this.questionService.createQuestion(competence)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          console.log('Domain created:', response);
          this.getQuestionList();
        },
        error: error => console.error('POST error:', error)
      });
  }

  private updateQuestion(candidate: any): void {
    if (candidate.id !== undefined) {
      this.questionService.updateQuestion(candidate, candidate.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response: any) => {
            console.log('Domain updated:', response);
            this.getQuestionList();
          },
          error: error => console.error('PUT error:', error)
        });
    }
  }

  public onSubmit(): void {
    if (this.isEditMode) {
      this.updateQuestion(this.currentQuestion);
    } else {
      this.createQuestion(this.currentQuestion);
    }
    // Reset the form and close the modal
    this.currentQuestion = {};
    this.isEditMode = false;
    this.closeModal();
  }

  public openModal(question?: Question): void {
    if (question) {
      this.currentQuestion = { ...question };
      this.isEditMode = true;
    } else {
      this.currentQuestion = {};
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

