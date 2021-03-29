import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  enterPortfolio(){
    //Token must store when username and password must be correct 
    //session Id or JWT (Json web Token);

    var user:string = (<HTMLInputElement>document.getElementById("loginUser")).value;
    var pass:string = (<HTMLInputElement>document.getElementById("loginPass")).value;

    if (user != "" && pass != "") {
      if (this.userExists(user)) {
        var arr = new Array();

        var str = localStorage.getItem("users");
        if (str != null) {
          arr = JSON.parse(str);

          for (let i = 0; i < arr.length; i++) {
            if (arr[i].username == user) {
              if (arr[i].password == pass) {
                sessionStorage.setItem("token", user);
                this.router.navigate(["Home"]);
              } else {
                window.confirm("Password is incorrect");
              }
            }
          }
        }
        
      } else {
        window.confirm("User does not exist");
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

  register(){
    this.router.navigate(["Register"]);
  }

}
