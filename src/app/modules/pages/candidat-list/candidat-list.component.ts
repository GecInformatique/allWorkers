import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';
import * as AOS from "aos";
import {Router} from "@angular/router";
import {
  Candidate,
  CandidateService,
  DomainActivity,
  DomainActivityService, Group, Specialism, SpecialismService
} from "../../../core/libs/scripts/libs/all-workers-api";
import {DomaineService} from "../../../core/data/network/services/domaine.service";
import {FormBuilder, FormControl} from "@angular/forms";

interface data {
  value: string;
}
@Component({
  selector: 'app-candidat-list',
  templateUrl: './candidat-list.component.html',
  styleUrls: ['./candidat-list.component.scss']
})
export class CandidatListComponent {
  public routes = routes;
  listGroups: any[] = [];
  countCandidates:number = 0;
  domainActivity : DomainActivity[] =[];
  specialism : any[] =[];
  candidates : any[] =[];
  candidatesWithSpecialism: any[] = [];
  specialismName: any;
  public selectedValue1 = '';
  public like : boolean[] = [false];
  isCollapsesDAOpen: boolean = true;
  isCollapsesKillsOpen: boolean = true;

  paginatedCandidates: any[] = [];
  pageSize: number = 10;
  currentPage: number = 1;
  totalPages: number = 0;

  searchKey: string = '';
  filteredCandidates: any[] = [];

  selectedList1: data[] = [
    { value: 'Relevance' },
    { value: 'Rating' },
    { value: 'Popular' },
    { value: 'Latest' },
    { value: 'Free' },
  ];
  toggleLike(index: number){
    this.like[index] = !this.like[index]
  }
  constructor(
    private router: Router,
    private domainActivityService: DomainActivityService,
    private candidateService: CandidateService,
    private specialismService: SpecialismService,
    private fb: FormBuilder
  ) {}

  searchCandidateForm = this.fb.group({
    'searchKey': new FormControl(""),
    'group': new FormControl(""),
    'domainActivity': new FormControl(""),
    'competence': new FormControl(""),
    'language': new FormControl(""),
    'typeDisponibility': new FormControl(""),
  });


  ngOnInit(): void {
    this.getDomainActivityList();
    this.getSpecialismList()
  }

  getDomainName(name: string | undefined): string {
    return name ?? '';
  }



  getDomainActivityList() {
    this.domainActivityService.getDomainActivityList().subscribe(
      (response: any )=> {
        this.domainActivity = response.data;
        console.log(this.domainActivity)
      },
      error => console.error('GET error:', error)
    )
  }

  getSpecialismList() {
    this.specialismService.getSpecialismList().subscribe(
      (response: any )=> {
        this.specialism = response.data;
        this.getCandidateList()

        console.log(this.specialism)
      },
      error => console.error('GET error:', error)
    )
  }

  getCandidateList() {
    this.candidateService.getCandidateList().subscribe(
      (response: any) => {
        this.candidates = response.data;
        console.log('Candidates:', this.candidates);

        // Associer les spécialismes aux candidats
        this.candidates.forEach(candidate => {
          const specialism = this.specialism.find(spec => spec.id === candidate.specialisms_id);
          candidate.specialismName = specialism ? specialism.name : 'Specialism not found';
        });

        // Appliquer le filtre initial
        this.filteredCandidates = this.candidates;
        this.applyFilter();

        // Mettre à jour la pagination après avoir récupéré les candidats filtrés
        this.totalPages = Math.ceil(this.filteredCandidates.length / this.pageSize);
        this.updatePaginatedCandidates();
      },
      error => console.error('GET error:', error)
    );
  }

  mapCandidatesToSpecialism() {
    console.log(this.candidates,'candidates')
    console.log(this.specialism,'specialism')

    //  this.specialismName = this.specialism.find(spec => spec.id === this.candidates.specialisms_id);
      console.log(this.specialismName)

  }


  navigateToCandidateDetail(candidate: any): void {
    this.router.navigate([routes.candidatViewDetail], { state: { candidate } });
  }



  searchCandidate() {
    const val = this.searchCandidateForm.value;
  /*  const data : CandidateSearchEntity =  {
      page: this.currentPage,
      group: val.group ?? "",
      searchKey:  val.searchKey ?? "",
      domainActivity:  val.domainActivity ?? "",
      competence:  val.competence ?? "",
      language:  val.language ?? "",
      typeDisponibility:  val.typeDisponibility ?? ""
    };
    this.searchCandidateWebSite(data)*/
  }

  applyFilter() {
    const lowerCaseSearchKey = this.searchKey.toLowerCase();
    this.filteredCandidates = this.candidates.filter(candidate => {
      const fullNameMatch = candidate.full_name.toLowerCase().includes(lowerCaseSearchKey);
      const specialismMatch = candidate.specialismName.toLowerCase().includes(lowerCaseSearchKey);
      return fullNameMatch || specialismMatch;
    });

    // Mettre à jour la pagination après le filtrage
    this.totalPages = Math.ceil(this.filteredCandidates.length / this.pageSize);
    this.updatePaginatedCandidates();
  }

  updatePaginatedCandidates() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedCandidates = this.filteredCandidates.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedCandidates();
    }
  }
}
