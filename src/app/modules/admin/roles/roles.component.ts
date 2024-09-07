import {Component, ViewChild,} from '@angular/core';
import {Competence, CompetenceService, Role, RoleService} from "../../../core/libs/scripts/libs/all-workers-api";
import {Subject, takeUntil} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {ShareDataService} from "../../../core/data/share-data.service";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent  {
  roles: any[] = [];
  filteredData: any[] = [];
  public currentRole: Role = {};
  public isEditMode: boolean = false;
  public isModalOpen: boolean = false;
  private destroy$ = new Subject<void>();
  dataSource!: MatTableDataSource<Competence>;
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
    private roleService : RoleService,
  ) { }

  ngOnInit(): void {
    this.getRoleList();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getRoleList(): void {
    this.roleService.getRoleList()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          this.roles = response.data || [];
          console.log('Request complete',this.roles)
          this.totalData = this.roles.length;
          this.updatePaginated()
        },
        error: error => console.error('GET error:', error),
        complete: () => console.log('Request complete')
      });
  }

  private createCompetence(role: Role): void {
    this.roleService.createRole(role)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          console.log('role created:', response);
          this.getRoleList();
        },
        error: error => console.error('POST error:', error)
      });
  }

  private updateCompetence(candidate: any): void {
    if (candidate.id !== undefined) {
      this.roleService.updateRole(candidate, candidate.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response: any) => {
            console.log('Domain updated:', response);
            this.getRoleList();
          },
          error: error => console.error('PUT error:', error)
        });
    }
  }

  public onSubmit(): void {
    if (this.isEditMode) {
      this.updateCompetence(this.currentRole);
    } else {
      this.createCompetence(this.currentRole);
    }
    // Reset the form and close the modal
    this.currentRole = {};
    this.isEditMode = false;
    this.closeModal();
  }

  public openModal(role?: Role): void {
    if (role) {
      this.currentRole = { ...role };
      this.isEditMode = true;
    } else {
      this.currentRole = {};
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
    this.filteredData = this.paginate(this.roles);
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
