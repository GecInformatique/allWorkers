import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Question, QuestionService} from "../../../core/libs/scripts/libs/all-workers-api";


@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent  {
  questions : Question[] =[];
  constructor(
    private router: Router,
    private questionService: QuestionService,
  ) {}

  ngOnInit(): void {
    this.getQuestionList();


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

}
