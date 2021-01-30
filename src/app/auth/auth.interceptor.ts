import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { map, filter, tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';

import { Component, OnInit, Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { JwtService } from './jwt.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    isBrowser: boolean;

    constructor(private router: Router, private accountService: UserService, @Inject(PLATFORM_ID) platformId: Object, 
    private jwtService: JwtService) {
        this.isBrowser = isPlatformBrowser(platformId);
        this.isBrowser = true;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('No-Auth') == "True")
            return next.handle(req.clone());

        if (this.isBrowser) {
            //if (l_ocalStorage.getItem('userToken') != null) {
            if (this.jwtService.getToken() != null) {
                const clonedreq = req.clone({
                    headers: req.headers.set("Authorization", "Bearer " + this.jwtService.getToken())
                });
                return next.handle(clonedreq).pipe(
                    tap(
                        succ => { },
                        err => {
                            if (err.status === 401) {
                                this.router.navigateByUrl('/home');
                                //this.accountService.setUserAsNotAuthenticated();
                            }
                        }
                    ));
            }
            else {
                this.router.navigateByUrl('/home');
            }
        }

    }
}