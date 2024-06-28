import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { UserformComponent } from './modules/home/users/userform/userform.component';
import { UserlistComponent } from './modules/home/users/userlist/userlist.component';

const routes: Routes = [
  {
    path: '', 
    component: HomeComponent,
    children: [
      {path: 'userform', component: UserformComponent},
      {path: 'userlist', component: UserlistComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
