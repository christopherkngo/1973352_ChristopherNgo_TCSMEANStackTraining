import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public router:Router) { }

  userArray = new Array<Array<String>>();

  ngOnInit(): void {
  }

  backToLogin() {
    this.router.navigate(["Login"]);
  }

  register() {
    var arr = new Array();

    var str = localStorage.getItem("users");
    if (str != null) {
        arr = JSON.parse(str);
    }

    var name:string = (<HTMLInputElement>document.getElementById("fullName")).value;
    var user:string = (<HTMLInputElement>document.getElementById("registerUser")).value;
    var pass:string = (<HTMLInputElement>document.getElementById("registerPass")).value;

    if (user != "" && pass != "") {
      if (this.userExists(user)) {
        window.confirm("User already exists");
        this.router.navigate(["Login"]);
      } else {
        arr.push({
          fullname:name,
          username:user,
          password:pass
        });
        localStorage.setItem("users", JSON.stringify(arr));
        window.confirm("User sucessfully registered");
        this.router.navigate(["Login"]);
      }
    }
  }

  userExists(name:string) : boolean {
    var arr1 = new Array();
    var str = localStorage.getItem("users");
    if (str != null) {
      arr1 = JSON.parse(str);

      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i].username == name) {
          return true;
        }
      }
      
      return false;
    } else {
      return false;
    }
  }

  deleteData() {
    localStorage.clear();
    location.reload();
  }

}
