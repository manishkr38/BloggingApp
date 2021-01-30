import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Component, OnInit, Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isBrowser: boolean;

  constructor(private router: Router, @Inject(PLATFORM_ID) platformId: Object, private jwtService: JwtService) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.isBrowser = true;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.isBrowser) {
      //if (l_ocalStorage.getItem("userToken") != null)
      if (this.jwtService.getToken() != null)
        return true;
      this.router.navigate(['/home']);
      return false;
    }
  }
}
