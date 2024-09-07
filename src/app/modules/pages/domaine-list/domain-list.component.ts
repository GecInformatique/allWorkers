import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';
import {Router} from "@angular/router";
import {DomainActivity, DomainActivityService} from "../../../core/libs/scripts/libs/all-workers-api";
interface data {
  value: string;
}
@Component({
  selector: 'app-domain-list',
  templateUrl: './domain-list.component.html',
  styleUrls: ['./domain-list.component.scss']
})
export class DomainListComponent {
  public routes = routes;
  domainActivity : DomainActivity[] =[];
  public selectedValue1 = '';
  public like : boolean[] = [false];

  constructor(
    private router: Router,
    private domainActivityService: DomainActivityService,
  ) {}

  ngOnInit(): void {
    this.getDomainActivityList();


  }

  getDomainName(name: string | undefined): string {
    return name ?? '';
  }
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

  getDomainActivityList() {
    this.domainActivityService.getDomainActivityList().subscribe(
      (response: any )=> {
        this.domainActivity = response.data;
        console.log(this.domainActivity)
      },
      error => console.error('GET error:', error)
    )
  }

  navigateTo(){
    // this.router.navigate([routes.candidatView]);

  }
}
