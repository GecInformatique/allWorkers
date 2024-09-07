import {Component, ViewChild,} from '@angular/core';
import {
  Competence,
  CompetenceService,
  Role,
  RoleService,
  User,
  UserService
} from "../../../core/libs/scripts/libs/all-workers-api";
import {Subject, takeUntil} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {ShareDataService} from "../../../core/data/share-data.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  users: any[] = [];
  roles: any[] = [];
  filteredData: any[] = [];
  public currentUser: any = {};
  public isEditMode: boolean = false;
  public isModalOpen: boolean = false;
  private destroy$ = new Subject<void>();
  dataSource!: MatTableDataSource<User>;
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
    private userService : UserService,
    private roleService : RoleService,
  ) { }

  ngOnInit(): void {
    this.getRoleList();
    this.getUserList();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getUserList(): void {
    this.userService.getUserList()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          this.users = response.data || [];
          console.log('Request complete',this.users)
          this.totalData = this.users.length;
          this.updatePaginated()
        },
        error: error => console.error('GET error:', error),
        complete: () => console.log('Request complete')
      });
  }

  private getRoleList(): void {
    this.roleService.getRoleList()
      .subscribe({
        next: (response: any) => {
          this.roles = response.data || [];
          console.log('Request complete',this.roles)
        },
        error: error => console.error('GET error:', error),
        complete: () => console.log('Request complete')
      });
  }

  private createCompetence(user: User): void {
    this.userService.createUser(user)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          console.log('user created:', response);
          this.getUserList();
        },
        error: error => console.error('POST error:', error)
      });
  }

  private updateCompetence(user: any): void {
    if (user.id !== undefined) {
      this.userService.updateUser(user, user.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response: any) => {
            console.log('user updated:', response);
            this.getUserList();
          },
          error: error => console.error('PUT error:', error)
        });
    }
  }

  public onSubmit(): void {
    if (this.isEditMode) {
      this.updateCompetence(this.currentUser);
    } else {
      this.createCompetence(this.currentUser);
    }
    // Reset the form and close the modal
    this.currentUser = {};
    this.isEditMode = false;
    this.closeModal();
  }

  public openModal(user?: User): void {
    if (user) {
      this.currentUser = { ...user };
      this.isEditMode = true;
    } else {
      this.currentUser = {};
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
    this.filteredData = this.paginate(this.users);
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
