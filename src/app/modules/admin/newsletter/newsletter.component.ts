import {Component, OnInit, ViewChild} from '@angular/core';

// import { Subject } from "rxjs";

import { MatTableDataSource } from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import {
  Candidate,
  CandidateService, Competence, CompetenceService,
  DomainActivity,
  DomainActivityService, Newsletter, NewsletterService
} from 'src/app/core/libs/scripts/libs/all-workers-api';
import {apiResultFormat} from "../../../core/models/page/models";
import {Subject, takeUntil} from "rxjs";


@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {

  newsletters: any[] = [];
  public currentNewsletter: Newsletter = {};
  public isEditMode: boolean = false;
  public isModalOpen: boolean = false;
  private destroy$ = new Subject<void>();
  dataSource!: MatTableDataSource<Newsletter>;
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
    private newsletterService : NewsletterService,
    ) { }

  ngOnInit(): void {
    this.getAllDomains();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getAllDomains(): void {
    this.newsletterService.getNewsletterList()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          this.newsletters = response.data || [];
          console.log('Request complete',this.newsletters)
          this.totalData = this.newsletters.length;
        },
        error: error => console.error('GET error:', error),
        complete: () => console.log('Request complete')
      });
  }

  private createDomain(newsletter: Newsletter): void {
    this.newsletterService.createNewsletter(newsletter)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          console.log('Domain created:', response);
          this.getAllDomains();
        },
        error: error => console.error('POST error:', error)
      });
  }

  private updateDomain(newsletter: any): void {
    if (newsletter.id !== undefined) {
      this.newsletterService.updateNewsletter(newsletter, newsletter.id)
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
      this.updateDomain(this.currentNewsletter);
    } else {
      this.createDomain(this.currentNewsletter);
    }
    // Reset the form and close the modal
    this.currentNewsletter = {};
    this.isEditMode = false;
    this.closeModal();
  }

  public openModal(newsletter?: Newsletter): void {
    if (newsletter) {
      this.currentNewsletter = { ...newsletter };
      this.isEditMode = true;
    } else {
      this.currentNewsletter = {};
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

