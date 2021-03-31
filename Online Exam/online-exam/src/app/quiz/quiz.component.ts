import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExamService } from '../exam.service';
import { Questions } from '../questions';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  submitted : boolean;

  constructor(public router:Router, public examSer:ExamService) { }

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
    this.submitted = false;
  }

  // This submits the quiz
  submitQuiz() {
    
    // If quiz has not already been submitted
    if (!this.submitted) {
      var radios = document.getElementsByTagName("input");
 
      var totalQuestions = this.questions.length;
      var totalCorrect = 0;
      
      // For each question compare the checked choice to the correct answer and display results accordingly, keeping tally of correct responses
      for (let i = 0; i < radios.length; i+=4) {
        if (!radios[i].checked && !radios[i+1].checked && !radios[i+2].checked && !radios[i+3].checked) {
          var container = document.createElement("span");
          var noAnswer = document.createTextNode("INCORRECT: You have not selected an answer. Correct Answer: " + this.getAnswer(radios[i].parentElement.getAttribute("id")));
          container.appendChild(noAnswer);
          container.style.color = "red";
          radios[i].parentElement.appendChild(container);
        } else {
          for (let j = i; j < i + 4; j++) {
            if (radios[j].checked) {
              var answer = this.getAnswer(radios[j].parentElement.getAttribute("id"));
              if(radios[j].value == answer) {
                var container = document.createElement("span");
                var correctAnswer = document.createTextNode("CORRECT: Your Answer: " + radios[j].value + " Correct Answer: " + answer);
                container.appendChild(correctAnswer);
                container.style.color = "green";
                radios[j].parentElement.appendChild(container);
                totalCorrect++;
              } else {
                var container = document.createElement("span");
                var incorrectAnswer = document.createTextNode("INCORRECT: Your Answer: " + radios[j].value + " Correct Answer: " + answer);
                container.appendChild(incorrectAnswer);
                container.style.color = "red";
                radios[j].parentElement.appendChild(container);
              }
            }
          }
        }
      }
      
      // This calculates the percentage and displays the results (>=70% PASS or <70% FAIL)
      var quizPercentage = totalCorrect / totalQuestions;
      if (quizPercentage >= 0.7) {
        var container = document.createElement("span");
        var result = document.createTextNode("RESULT: " + totalCorrect + "/" + totalQuestions + " : PASS");
        container.appendChild(result);
        container.style.color = "green";
        document.getElementById("quizResult").appendChild(container);
      } else {
        var container = document.createElement("span");
        var result = document.createTextNode("RESULT: " + totalCorrect + "/" + totalQuestions + " : FAIL");
        container.appendChild(result);
        container.style.color = "red";
        document.getElementById("quizResult").appendChild(container);
      }
      // When quiz is submitted, flag submitted as true so user cannot resubmit
      this.submitted = true;
    }
  }

  // This returns the correct answer given a question
  getAnswer(question:string) : string {
    for (let i = 0; i < this.questions.length; i++) {
      if (this.questions[i].id == question) {
        return this.questions[i].correct;
      }
    }
  }

  // This returns to the home page
  returnHome() {
    this.router.navigate(["Home"]);
  }
}
