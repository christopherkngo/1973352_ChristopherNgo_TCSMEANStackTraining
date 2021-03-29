import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit(): void {
    var fullname = this.getFullName(sessionStorage.getItem("token"));
    document.getElementById("welcome").innerHTML = "Welcome " + fullname + "!";
    this.loadTable();
  }

  getFullName(name:string) : string {
    var arr1 = new Array();
    var str = localStorage.getItem("users");
    
    if (str != null) {
      arr1 = JSON.parse(str);
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i].username == name) {
          return arr1[i].fullname;
        }
      }
    }
  }

  saveContact() {
    var arr = new Array();

    var str = localStorage.getItem("contactData");
    if (str != null) {
        arr = JSON.parse(str);
    }

    var contact:string = (<HTMLInputElement>document.getElementById("contactName")).value;
    var number:string = (<HTMLInputElement>document.getElementById("phoneNum")).value;

    if (contact != "" && number != "") {
      arr.push({
        contactName:contact,
        phoneNo:number,
        username:sessionStorage.getItem("token")
      });

      localStorage.setItem("contactData", JSON.stringify(arr));
    }
  }

  loadTable() {
    var arr1 = new Array();

    var str = localStorage.getItem("contactData");
    if (str != null) {
      arr1 = JSON.parse(str);

      var tbl = <HTMLTableElement>document.getElementById("contactTable");
      
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i].username == sessionStorage.getItem("token")) {
          var row = tbl.insertRow();
          
          var cell1 = row.insertCell();
          var cell2 = row.insertCell();

          cell1.innerHTML = arr1[i].contactName;
          cell2.innerHTML = arr1[i].phoneNo;
        }
      }
    }
  }

  logout(){
    sessionStorage.removeItem("token");
    this.router.navigate(["Login"]);
  }

  deleteData() {
    localStorage.clear();
    location.reload();
  }
}
