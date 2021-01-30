import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user.model';
import { BehaviorSubject } from 'rxjs';
import { ReplaySubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { JwtService } from '../auth/jwt.service';
import { DataSharingService } from '../auth/data-sharing.service';
import { HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

import { DOCUMENT } from '@angular/common';

import { Component, OnInit } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private jwtService: JwtService,
    private dataSharingService: DataSharingService, @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) platformId: Object) { }

  userAuthentication(email, password) {
    if (email != null && password != null) {
      if (email == "blogger@grapecity.com" && password == "1qaz!QAZ") {
        var user: User = {
          id: 1,
          email: "blogger@grapecity.com",
          password: "1qaz!QAZ",
          confirmPassword: "1qaz!QAZ",
          fullName: "Blogger",
          phoneNumber: "User",
          accessToken: "bfue232v23v4g32v4hg3v4gv234gv23yg4v",
          about: "I am a blogger",
          imageFile: "",
          firstName: "Blogger",
          lastName: "User",
          company: "Company",
          gender: "Male",
          userId: "1",
          loginCount: 0,
          blogCount: 0
        }
        return user;
      }
    }
    return null;
  }

  registerUser(user: User) {

    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'No-Auth': 'True'
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return null;
  }

  setAuth(user: User) {
    //Set Loggedin status to true in data sharing 
    this.dataSharingService.isUserLoggedIn.next(true);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {

    this.dataSharingService.isUserLoggedIn.next(false);
     
    this.jwtService.destroyToken();
    this.jwtService.destroyCookie();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

}
