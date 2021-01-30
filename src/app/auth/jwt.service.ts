import { Injectable } from '@angular/core';
import { Component, OnInit, Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';



@Injectable()

export class JwtService {

  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.isBrowser = true;
  }

  getToken(): String {
    return window.localStorage['userToken'];
  }

  saveToken(token: string) {
    window.localStorage['userToken'] = token;
  }

  destroyToken() {
    window.localStorage.removeItem('userToken');
  }

  destroyCookie() {
    if (this.isBrowser) {
      this.eraseCookie('loggedinuser');
    }
  }

  eraseCookie(name) {
    if (this.isBrowser) {
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
  }

}
