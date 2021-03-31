import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit(): void {
    this.loadTable();
  }
  
  submitTask() {
    var arr = new Array();

    var str = localStorage.getItem("taskData");
    if (str != null) {
        arr = JSON.parse(str);
    }

    var ID:string = (<HTMLInputElement>document.getElementById("taskID")).value;
    var Name:string = (<HTMLInputElement>document.getElementById("taskName")).value;
    var Task:string = (<HTMLInputElement>document.getElementById("taskDesc")).value;
    var TaskDate:Date = new Date((<HTMLInputElement>document.getElementById("taskDate")).value);

    if (ID != "" && Name != "" && Task != "" && TaskDate != null) {
      arr.push({
        empID:ID,
        empName:Name,
        empTask:Task,
        empTaskDate:TaskDate,
        username:sessionStorage.getItem("token")
      });

      localStorage.setItem("taskData", JSON.stringify(arr));
    }
  }

  loadTable() {
    var arr1 = new Array();

    var str = localStorage.getItem("taskData");
    if (str != null) {
      arr1 = JSON.parse(str);

      var tbl = <HTMLTableElement>document.getElementById("taskTable");
      
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i].username == sessionStorage.getItem("token")) {
          var row = tbl.insertRow();
          
          var cell1 = row.insertCell();
          var cell2 = row.insertCell();
          var cell3 = row.insertCell();
          var cell4 = row.insertCell();

          cell1.innerHTML = arr1[i].empID;
          cell2.innerHTML = arr1[i].empName;
          cell3.innerHTML = arr1[i].empTask;
          cell4.innerHTML = arr1[i].empTaskDate;
        }
      }
    }
  }

  resetForm() {
    var resetForm = <HTMLFormElement>document.getElementById("taskForm");
    resetForm.reset();
  }

  logout(){
    sessionStorage.removeItem("token");
    this.router.navigate(["Login"]);
  }

  deleteData() {
    localStorage.clear();
    location.reload();
  }

  clearTasksFromTable() {
    var name = sessionStorage.getItem("token");

    var arr = new Array();
    var str = localStorage.getItem("taskData");
    
    if (str != null) {
      arr = JSON.parse(str);
      for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i].username == name) {
          arr.splice(i, 1);
        }
      }
      localStorage.setItem("taskData", JSON.stringify(arr));
      location.reload();
    }
  }
}