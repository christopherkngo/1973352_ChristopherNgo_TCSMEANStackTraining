import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TrackerComponent } from './tracker/tracker.component';
import { MyAuthGaurd } from './myauthguard';

const routes: Routes = [
  {path:"\Home", component:TrackerComponent,canActivate:[MyAuthGaurd]},
  {path:"\Login", component:LoginComponent},
  {path:"\Register", component:RegisterComponent},
  {path:"",redirectTo:"\Login",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
