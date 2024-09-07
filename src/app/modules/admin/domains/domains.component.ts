import {Component, OnInit, ViewChild} from '@angular/core';

// import { Subject } from "rxjs";

import { MatTableDataSource } from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import {DomainActivity, DomainActivityService} from 'src/app/core/libs/scripts/libs/all-workers-api';
import {apiResultFormat} from "../../../core/models/page/models";
import {Subject, takeUntil} from "rxjs";


@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.scss']
})
export class DomainsComponent implements OnInit {

  domains: any[] = [];
  public currentDomain: any = {};
  public isEditMode: boolean = false;
  public isModalOpen: boolean = false;
  private destroy$ = new Subject<void>();
  dataSource!: MatTableDataSource<DomainActivity>;
  currentPage = 1;
  pageSize= 10; // Nombre d'éléments par page
  totalData = 0;
  public selectedFile: File | null = null;


  @ViewChild(MatSort) sort!: MatSort;

  public searchDataValue = '';

  public lastIndex = 0;

  public pageNumberArray: Array<number> = [];

  public totalPages = 0;

  public url = "admin";

  constructor(
    private data: ShareDataService,
    private domainActivityService : DomainActivityService,
    ) { }

  ngOnInit(): void {
    this.getAllDomains();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  private getAllDomains(): void {
    this.domainActivityService.getDomainActivityList()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          this.domains = response.data || [];
          console.log('Request complete',this.domains)
          this.totalData = this.domains.length;
        },
        error: error => console.error('GET error:', error),
        complete: () => console.log('Request complete')
      });
  }

  private createDomain(domain: DomainActivity): void {
    this.domainActivityService.createDomainActivity(domain)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          console.log('Domain created:', response);
          this.getAllDomains();
        },
        error: error => console.error('POST error:', error)
      });
  }

  private updateDomain(domain: any): void {

    console.log(domain)
   if (domain.id !== undefined) {
      this.domainActivityService.updateDomainActivity(domain, domain.id)
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
      this.updateDomain(this.currentDomain);
    } else {
      this.createDomain(this.currentDomain);
    }
    // Reset the form and close the modal
    this.currentDomain = {};
    this.isEditMode = false;
    this.closeModal();
  }

  public openModal(domain?: DomainActivity): void {
    if (domain) {
      this.currentDomain = { ...domain };
      this.isEditMode = true;
    } else {
      this.currentDomain = {};
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

