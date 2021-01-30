import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Component, OnInit, Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { JwtService } from './jwt.service';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  isBrowser: boolean;
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public redirectUrl: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor(@Inject(PLATFORM_ID) platformId: Object, private jwtService: JwtService) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.isBrowser = true;
    this.setLoginStatus();
  }

  setLoginStatus() {
    if (this.isBrowser) {
      //if (l_ocalStorage.getItem("userToken") != null) {
      if (this.jwtService.getToken() != null) {
        this.isUserLoggedIn.next(true);
      }
      else {
        this.isUserLoggedIn.next(false);
      }
    }
  }

  setRedirectUrl(redirecturl: string) {
    if (!isNullOrUndefined(redirecturl)) {
      this.redirectUrl.next(redirecturl);
    }
  }

  removeRedirectUrl()
  {
    this.redirectUrl.next("");
  }

}
