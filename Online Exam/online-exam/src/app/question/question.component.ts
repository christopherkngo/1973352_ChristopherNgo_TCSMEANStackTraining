import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit(): void {
    this.loadQuestions();
  }

  // This adds a question to local storage once all fields are filled
  addQuestion() {
    var arr = new Array();

    var str = localStorage.getItem("questions");
    if (str != null) {
        arr = JSON.parse(str);
    }

    var ques:string = (<HTMLInputElement>document.getElementById("questionID")).value;
    var choice1:string = (<HTMLInputElement>document.getElementById("choiceA")).value;
    var choice2:string = (<HTMLInputElement>document.getElementById("choiceB")).value;
    var choice3:string = (<HTMLInputElement>document.getElementById("choiceC")).value;
    var choice4:string = (<HTMLInputElement>document.getElementById("choiceD")).value;
    var corr:string = (<HTMLInputElement>document.getElementById("correctAns")).value;

    if (ques != "" && choice1 != "" && choice2 != "" && choice3 != "" && choice4 != "" && corr != "") {
      arr.push({
        question:ques,
        choiceA:choice1,
        choiceB:choice2,
        choiceC:choice3,
        choiceD:choice4,
        correct:corr
      });

      localStorage.setItem("questions", JSON.stringify(arr));
      location.reload();
    }
  }

  // This loads questions from local storage to view
  loadQuestions() {
    var arr1 = new Array();

    var str = localStorage.getItem("questions");
    if (str != null) {
      arr1 = JSON.parse(str);

      var tbl = <HTMLTableElement>document.getElementById("qTable");
      
      for (let i = 0; i < arr1.length; i++) {
        var row = tbl.insertRow();
        
        var cell1 = row.insertCell();
        var cell2 = row.insertCell();
        var cell3 = row.insertCell();
        var cell4 = row.insertCell();
        var cell5 = row.insertCell();
        var cell6 = row.insertCell();

        cell1.innerHTML = arr1[i].question;
        cell2.innerHTML = arr1[i].choiceA;
        cell3.innerHTML = arr1[i].choiceB;
        cell4.innerHTML = arr1[i].choiceC;
        cell5.innerHTML = arr1[i].choiceD;
        cell6.innerHTML = arr1[i].correct;
      }
    }
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
