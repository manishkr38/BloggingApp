import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditblogComponent } from './sitemodules/editblog/editblog.component';
import { HomeComponent } from './sitemodules/home/home.component';
import { NewblogComponent } from './sitemodules/newblog/newblog.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';


const routes: Routes = [

  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'new', component: NewblogComponent
  },
  {
    path: 'edit/:blogid', component: EditblogComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
