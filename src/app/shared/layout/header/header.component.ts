import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/auth/data-sharing.service';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isUserLoggedIn: boolean;
  user: User;
  constructor(public router: Router, private userService: UserService,
    private dataSharingService: DataSharingService) { 
      this.dataSharingService.isUserLoggedIn.subscribe(
        value => {
          this.isUserLoggedIn = value;
        });
    }

  ngOnInit(): void {
  }

  Logout() {
    this.userService.purgeAuth();
    this.router.navigate(['/home']);
  }

}
