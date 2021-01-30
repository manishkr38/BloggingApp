import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;
  isLoading: boolean = false;
  isRegisterSuccess: boolean = false;
  isRegisterFailure: boolean = false;

  errorMessages: any = [];
  isPasswordError: boolean = false;
  isEmailError: boolean = false;
  isTermsChecked: boolean = false;

  constructor(private userService: UserService, private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = new User;

  }

  termschecked(values: any) {
    if (values.currentTarget.checked) {
      this.isTermsChecked = true;
    }
    else {
      this.isTermsChecked = false;
    }
  }

  OnSubmit(form: NgForm) {
    this.isLoading = true;
    this.isRegisterFailure = false;
    this.isRegisterSuccess = false;

    this.errorMessages = [];
    this.isPasswordError = false;
    this.isEmailError = false;

    if (form.value.firstName == null || form.value.firstName == undefined || form.value.firstName == "") {
      this.toastr.error('', 'Please enter your first name');
      this.isLoading = false;
      return false;
    }

    if (form.value.lastName == null || form.value.lastName == undefined || form.value.lastName == "") {
      this.toastr.error('', 'Please enter your last name');
      this.isLoading = false;
      return false;
    }

    if (form.value.email != null && form.value.email != undefined && form.value.email != "") {
      var emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!form.value.email.match(emailregex)) {
        this.isEmailError = true;
        this.isLoading = false;
        this.toastr.error('', 'Please enter correct email');
        return false;
      }
    }
    else {
      this.toastr.error('', 'Please enter your email');
      this.isEmailError = true;
      this.isLoading = false;
      return false;
    }

    if (form.value.password != form.value.confirmPassword) {
      this.toastr.error('', 'password and confirm password not matched');
      this.isLoading = false;
      this.isPasswordError = true;
    }

    if (form.value.password != form.value.confirmPassword || form.value.password.length < 6) {
      this.toastr.error('', 'password must have atlease 6 characters');
      this.isLoading = false;
      this.isPasswordError = true;
    }

    this.userService.registerUser(form.value)
      .subscribe((data: any) => {
        if (data == false) {
          this.isLoading = false;
          this.isRegisterFailure = true;
        }
        else if (data.errors.length > 0 && data.succeeded == false) {
          this.errorMessages = data.errors;
          for (var i = 0; i < this.errorMessages.length; i++) {
            this.toastr.error('', this.errorMessages[i].description);
          }
          this.isLoading = false;
        }
        else if (data.errors.length == 0 && data.succeeded == true) {
          this.resetForm(form);
          this.isLoading = false;
          this.isRegisterSuccess = true;
        }
        else {
          this.isLoading = false;
          this.isRegisterFailure = true;
        }
      });
  }


}
