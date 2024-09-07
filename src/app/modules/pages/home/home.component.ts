import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import * as AOS from 'aos';
import {
  Candidate, CandidateService,
  DomainActivity,
  DomainActivityService, Formation, FormationService,
  Question,
  QuestionService, Testimonial, TestimonialService
} from "../../../core/libs/scripts/libs/all-workers-api";
import { routes } from 'src/app/core/helpers/routes/routes';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public routes = routes;
  domainActivity : DomainActivity[] =[];
  candidates : any[] =[];
  userConnected : Candidate | any;
  questions : Question[] =[];
  testimonials : any[] =[];
  formations : any[] =[];
  selected = 'freelancers';
  getLink = 'project';
  slideConfig = {
    slidesToShow: 1,
    SlidesToScroll: 1,
    asNavFor: '.client-img',
    dots: false,
    nav: false,
  };
  slideConfig2 = {
    slidesToShow: 4,
    SlidesToScroll: 1,
    asNavFor: '.say-about',
    dots: false,
    nav: false,
    centerMode: true,
    infinite: true,
    focusOnSelect: true,
  };
  customOption: OwlOptions = {
    loop: true,
    margin: 30,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: [
      '<i class="fas fa-arrow-left"></i>',
      '<i class="fas fa-arrow-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 1,
      },
      1170: {
        items: 1,
      },
    },
    nav: true,
  };

  projectsOptions: OwlOptions = {
    loop: true,
    margin: 30,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [
      '<i class="fas fa-arrow-left"></i>',
      '<i class="fas fa-arrow-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 3,
      },
      1170: {
        items: 3,
      },
    },
    nav: true,
  };

  blogOptions: OwlOptions = {
    loop: true,
    margin: 30,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: [
      '<i class="fas fa-arrow-left"></i>',
      '<i class="fas fa-arrow-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 3,
      },
      1170: {
        items: 3,
      },
    },
    nav: true,
  };

  companyOptions: OwlOptions = {
    loop: true,
    margin: 30,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: [
      '<i class="fas fa-chevron-left"></i>',
      '<i class="fas fa-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 6,
      },
      1170: {
        items: 6,
      },
    },
    nav: true,
  };

  companyslides = [
    {
      img: 'assets/img/company-logo-01.svg',
    },
    {
      img: 'assets/img/company-logo-02.svg',
    },
    {
      img: 'assets/img/company-logo-03.svg',
    },
    {
      img: 'assets/img/company-logo-04.svg',
    },
    {
      img: 'assets/img/company-logo-05.svg',
    },
    {
      img: 'assets/img/company-logo-06.svg',
    },
  ];
  constructor(
    private router: Router,
    private domainActivityService: DomainActivityService,
    private candidateService: CandidateService,
    private questionService: QuestionService,
    private formationService: FormationService,
    private testimonialService: TestimonialService,
  ) {}
  ngOnInit(): void {
    AOS.init({
      duration: 1200,
      once: true,
    });
    this.getAllDomainActivity();
    this.getQuestionList()
    this.getFormationList()
    this.getAllCandidate()
    this.getAllTestimonial()


  }
  search() {
    if (this.selected === 'projects') {
      this.router.navigateByUrl('/freelancer/project');
    } else if (this.selected === 'freelancers') {
      this.router.navigateByUrl('/freelancer/project');
    }
  }
  public selectedValue = '';

 // selectedList: data[] = [{ value: 'Projects' }, { value: 'Freelancers' }];

  featureCandidateSlider: OwlOptions = {
    items: 6,
    margin: 30,
    dots: false,
    nav: true,
    smartSpeed: 2000,
    navText: [
      '<i class="fas fa-arrow-left"></i>',
      '<i class="fas fa-arrow-right"></i>',
    ],
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      1170: {
        items: 4,
      },
    },
  };
  popularSlider2: OwlOptions = {
    items: 6,
    margin: 30,
    dots: false,
    nav: true,
    smartSpeed: 2000,
    navText: [
      '<i class="fas fa-arrow-left"></i>',
      '<i class="fas fa-arrow-right"></i>',
    ],
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      1170: {
        items: 3,
      },
    },
  };
  testimonialSlider: OwlOptions = {
    items: 5,
    margin: 30,
    dots: false,
    nav: true,
    smartSpeed: 2000,
    navText: [
      '<i class="fas fa-chevron-left"></i>',
      '<i class="fas fa-chevron-right"></i>',
    ],
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      991: {
        items: 3,
      },
      1170: {
        items: 3,
      },
    },
  };
  navigation() {
    this.router.navigate([routes.freelancer_project]);
  }
  navigateTo(domain : any){
    this.router.navigate([routes.candidatView],{ state: { domain }});

  }
  navigateToFormationDetail(formation: any): void {
    this.router.navigate([routes.formationDetail], { state: { formation } });
  }

  getDomainName(name: string | undefined): string {
    return name ?? '';
  }

  getAllDomainActivity() {
    this.domainActivityService.getWebDomainActivityList().subscribe(
      (response: any )=> {
        this.domainActivity = response.data;
        console.log(this.domainActivity)
      },
      error => console.error('GET error:', error)
    )
  }
  getFormationList() {
    this.formationService.getFormationList().subscribe(
      (response: any )=> {
        this.formations = response.data;
        console.log(this.formations)
      },
      error => console.error('GET error:', error)
    )
  }

  getQuestionList() {
    this.questionService.getQuestionList().subscribe(
      (response: any )=> {
        this.questions = response.data;
        console.log(this.questions)
      },
      error => console.error('GET error:', error)
    )
  }

  getAllCandidate() {
    this.candidateService.getCandidateList().subscribe(
      (response: any )=> {
        this.candidates = response.data;
        console.log(this.candidates)
      },
      error => console.error('GET error:', error)
    )
  }

  getAllTestimonial() {
    this.testimonialService.getTestimonialList().subscribe(
      (response: any )=> {
        this.testimonials = response.data;
        console.log(this.testimonials)
      },
      error => console.error('GET error:', error)
    )
  }
}
