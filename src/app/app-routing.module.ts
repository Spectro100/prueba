import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { UserformComponent } from './modules/home/users/userform/userform.component';
import { UserlistComponent } from './modules/home/users/userlist/userlist.component';
import { LoginComponent } from './modules/login/login/login.component';
import { SignupComponent } from './modules/login/signup/signup.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '', 
    component: HomeComponent,
    children: [
      {path: 'userform', component: UserformComponent},
      {path: 'userlist', component: UserlistComponent}
    ],
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
