import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
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
    path: 'new', component: NewblogComponent, canActivate: [AuthGuard]
  },
  {
    path: 'edit/:blogid', component: EditblogComponent, canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
