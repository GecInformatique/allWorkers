import {Component, OnInit, ViewChild} from '@angular/core';

// import { Subject } from "rxjs";

import { MatTableDataSource } from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import {
  Candidate,
  CandidateService, Competence, CompetenceService,
  DomainActivity,
  DomainActivityService, Project, ProjectService
} from 'src/app/core/libs/scripts/libs/all-workers-api';
import {apiResultFormat} from "../../../core/models/page/models";
import {Subject, takeUntil} from "rxjs";


@Component({
  selector: 'app-projets',
  templateUrl: './projets.component.html',
  styleUrls: ['./projets.component.scss']
})
export class ProjetsComponent implements OnInit {

  projects: any[] = [];
  public currentProjects: any = {};
  public isEditMode: boolean = false;
  public isModalOpen: boolean = false;
  private destroy$ = new Subject<void>();
  dataSource!: MatTableDataSource<Project>;
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
    private projectService : ProjectService,
    ) { }

  ngOnInit(): void {
    this.getProjectList();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getProjectList(): void {
    this.projectService.getProjectList()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          this.projects = response.data || [];
          console.log('Request complete',this.projects)
          this.totalData = this.projects.length;
        },
        error: error => console.error('GET error:', error),
        complete: () => console.log('Request complete')
      });
  }

  private createProject(project: Project): void {
    this.projectService.createProject(project)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          console.log('Domain created:', response);
          this.getProjectList();
        },
        error: error => console.error('POST error:', error)
      });
  }

  private updateProject(project: any): void {
    if (project.id !== undefined) {
      this.projectService.updateProject(project, project.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response: any) => {
            console.log('Domain updated:', response);
            this.getProjectList();
          },
          error: error => console.error('PUT error:', error)
        });
    }
  }

  public onSubmit(): void {
    if (this.isEditMode) {
      this.updateProject(this.currentProjects);
    } else {
      this.createProject(this.currentProjects);
    }
    // Reset the form and close the modal
    this.currentProjects = {};
    this.isEditMode = false;
    this.closeModal();
  }

  public openModal(project?: Project): void {
    if (project) {
      this.currentProjects = { ...project };
      this.isEditMode = true;
    } else {
      this.currentProjects = {};
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

