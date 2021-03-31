import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuestionComponent } from './question/question.component';
import { QuizComponent } from './quiz/quiz.component';

const routes: Routes = [
  {path:"\Home", component:HomeComponent},
  {path:"\AddQuestions", component:QuestionComponent},
  {path:"\StartQuiz", component:QuizComponent},
  {path:"",redirectTo:"\Home",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
