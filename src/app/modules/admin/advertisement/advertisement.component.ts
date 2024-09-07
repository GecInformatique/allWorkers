import {Component, OnInit, ViewChild} from '@angular/core';

// import { Subject } from "rxjs";

import { MatTableDataSource } from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import {
  Advertisement, AdvertisementService,
  Candidate,
  CandidateService, Competence, CompetenceService,
  DomainActivity,
  DomainActivityService
} from 'src/app/core/libs/scripts/libs/all-workers-api';
import {apiResultFormat} from "../../../core/models/page/models";
import {Subject, takeUntil} from "rxjs";


@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss']
})
export class AdvertisementComponent implements OnInit {

  advertisements: any[] = [];
  public currentAdvertisement: any = {};
  public isEditMode: boolean = false;
  public isModalOpen: boolean = false;
  private destroy$ = new Subject<void>();
  dataSource!: MatTableDataSource<Advertisement>;
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
    private advertisementService : AdvertisementService,
    ) { }

  ngOnInit(): void {
    this.getAdvertisementList();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getAdvertisementList(): void {
    this.advertisementService.getAdvertisementList()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          this.advertisements = response.data || [];
          console.log('Request complete',this.advertisements)
          this.totalData = this.advertisements.length;
        },
        error: error => console.error('GET error:', error),
        complete: () => console.log('Request complete')
      });
  }

  private createDomain(competence: Advertisement): void {
    this.advertisementService.createAdvertisement(competence)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          console.log('Domain created:', response);
          this.getAdvertisementList();
        },
        error: error => console.error('POST error:', error)
      });
  }

  private updateDomain(advertisement: any): void {
    if (advertisement.id !== undefined) {
      this.advertisementService.updateAdvertisement(advertisement, advertisement.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response: any) => {
            console.log('Domain updated:', response);
            this.getAdvertisementList();
          },
          error: error => console.error('PUT error:', error)
        });
    }
  }

  public onSubmit(): void {
    if (this.isEditMode) {
      this.updateDomain(this.currentAdvertisement);
    } else {
      this.createDomain(this.currentAdvertisement);
    }
    // Reset the form and close the modal
    this.currentAdvertisement = {};
    this.isEditMode = false;
    this.closeModal();
  }

  public openModal(advertisement?: Advertisement): void {
    if (advertisement) {
      this.currentAdvertisement = { ...advertisement };
      this.isEditMode = true;
    } else {
      this.currentAdvertisement = {};
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

