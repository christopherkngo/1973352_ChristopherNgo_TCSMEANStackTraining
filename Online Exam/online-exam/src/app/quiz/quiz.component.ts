import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  submitted : boolean;

  constructor(public router:Router) { }

  ngOnInit(): void {
    this.loadQuestions();
    this.submitted = false;
  }

  // Load questions onto the page
  loadQuestions() {
    var arr = new Array();

    var str = localStorage.getItem("questions");
    if (str != null) {
      arr = JSON.parse(str);
      
      // Create label for each question and append the 4 radio options
      for (let i = 0; i < arr.length; i++) {
        var label = document.createElement("label");
        label.innerHTML = arr[i].question;
        // Store the question in the label attribute "val"
        document.createAttribute("val");
        label.setAttribute("val", arr[i].question);
        label.appendChild(document.createElement("br"));
        for (let j = 1; j <= 4; j++) {
          var input = document.createElement("input");
          input.type = "radio";
          input.name = "group" + i;
          if (j == 1) {
            label.innerHTML += arr[i].choiceA;
            input.value = arr[i].choiceA;
          } else if (j == 2) {
            label.innerHTML += arr[i].choiceB;
            input.value = arr[i].choiceB;
          } else if (j == 3) {
            label.innerHTML += arr[i].choiceC;
            input.value = arr[i].choiceC;
          } else if (j == 4) {
            label.innerHTML += arr[i].choiceD;
            input.value = arr[i].choiceD;
          }
          label.appendChild(input);
          label.appendChild(document.createElement("br"));
        }
        document.getElementById("quizQues").appendChild(label);
        document.getElementById("quizQues").appendChild(document.createElement("br"));
      }
      // Store total question count in the attribute "val"
      document.createAttribute("val");
      document.getElementById("questionHead").setAttribute("val", ""+arr.length);
      document.getElementById("questionHead").innerHTML = "Questions: " + document.getElementById("questionHead").getAttribute("val");
    }
  }

  // This submits the quiz
  submitQuiz() {
    // If quiz has not already been submitted
    if (!this.submitted) {
      var radios = document.getElementsByTagName("input");
 
      var totalQuestions = parseInt(document.getElementById("questionHead").getAttribute("val"));
      var totalCorrect = 0;
      
      // For each question compare the checked choice to the correct answer and display results accordingly, keeping tally of correct responses
      for (let i = 0; i < radios.length; i+=4) {
        if (!radios[i].checked && !radios[i+1].checked && !radios[i+2].checked && !radios[i+3].checked) {
          var container = document.createElement("span");
          var noAnswer = document.createTextNode("INCORRECT: You have not selected an answer. Correct Answer: " + this.getAnswer(radios[i].parentElement.getAttribute("val")));
          container.appendChild(noAnswer);
          container.style.color = "red";
          radios[i].parentElement.appendChild(container);
        } else {
          for (let j = i; j < i + 4; j++) {
            if (radios[j].checked) {
              var answer = this.getAnswer(radios[j].parentElement.getAttribute("val"));
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
    var arr = new Array();

    var str = localStorage.getItem("questions");
    if (str != null) {
      arr = JSON.parse(str);

      for (let i = 0; i < arr.length; i++) {
        if (arr[i].question == question) {
          return arr[i].correct;
        }
      }
    }
  }

  // This returns to the home page
  returnHome() {
    this.router.navigate(["Home"]);
  }
}
