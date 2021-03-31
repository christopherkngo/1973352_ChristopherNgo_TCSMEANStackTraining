import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Questions } from './questions';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(public http:HttpClient) { }

  storeQuestion(question:any) {
    this.http.post("http://localhost:3000/questions", question).subscribe(result=>console.log(result), error=>console.log(error));
  }

  getQuestions() {
    return this.http.get<Questions[]>("http://localhost:3000/questions");
  }
}