import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExamService } from '../exam.service';
import { Questions } from '../questions';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  constructor(public router:Router, public examSer:ExamService) { }

  columns = ["Question", "Choice A", "Choice B", "Choice C", "Choice D", "Correct"];

  index = ["id", "choiceA", "choiceB", "choiceC", "choiceD", "correct"];

  questions: Questions[] = [];

  ngOnInit(): void {
    this.examSer.getQuestions().subscribe
    (
      (response)=>
      {
        this.questions = response;
      },
      (error)=>
      {
        console.log("Error");
      }
    );
  }

  storeQuestion(questionRef:any) {
    console.log(questionRef);
    this.examSer.storeQuestion(questionRef);
    location.reload();
  }

  // This returns to the home page
  returnHome() {
    this.router.navigate(["Home"]);
  }

  // This clears local storage
  deleteData() {
    localStorage.clear();
    location.reload();
  }
}
