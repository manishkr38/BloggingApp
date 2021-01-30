import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtService } from '../../auth/jwt.service';
import { HeaderComponent } from 'src/app/shared/layout/header/header.component';

import { environment } from '../../../environments/environment';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DataSharingService } from 'src/app/auth/data-sharing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showloginscreen: boolean;
  showforgotscreen: boolean;
  isLoginError: boolean = false;
  isLoading: boolean = false;

  //mk experiment
  isUserAuthenticated = false;
  subscription: Subscription;
  userName: any;

  redirectUrl: string;

  constructor(private userService: UserService, private router: Router,
    private jwtServices: JwtService, private headerComponent: HeaderComponent,
    private httpClient: HttpClient,
    private dataSharingService: DataSharingService, private toastr: ToastrService) {

  }

  ngOnInit(): void {
  }

  OnSubmit(Email, password) {
    this.isLoading = true;
    var isEmailError = false;
    var isPasswordError = false;

    if (Email != null && Email != undefined && Email != "") {
      var emailregex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
      if (!Email.match(emailregex)) {
        isEmailError = true;
        this.isLoading = false;
        this.toastr.error('', 'Please enter correct email');
        return false;
      }
    }
    else {
      this.toastr.error('', 'Please enter your email');
      isEmailError = true;
      this.isLoading = false;
      return false;
    }

    if (password != null && password != undefined && password != "") {

    }
    else {
      this.toastr.error('', 'Please enter your password');
      isPasswordError = true;
      this.isLoading = false;
      return false;
    }

    if (!isEmailError && !isPasswordError) {

      var loginStatus = this.userService.userAuthentication(Email, password);
      if (loginStatus != null) {
        if (loginStatus.accessToken != null) {
          this.jwtServices.saveToken(loginStatus.accessToken);
          this.userService.setAuth(loginStatus);
          this.router.navigate(['/home']);
          this.isLoading = false;
        }
        else {
          this.isLoginError = true;
          this.isLoading = false;
        }
      }
      else {
        this.isLoginError = true;
        this.isLoading = false;
      }
    }
  }

}
