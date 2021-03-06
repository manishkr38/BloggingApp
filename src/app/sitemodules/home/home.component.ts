import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSharingService } from 'src/app/auth/data-sharing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  siteData: any = [];
  isUserLoggedIn: boolean;
  constructor(private router: Router, private route: ActivatedRoute,
    private dataSharingService: DataSharingService) { 
      this.dataSharingService.isUserLoggedIn.subscribe(
        value => {
          this.isUserLoggedIn = value;
        });
    }

  ngOnInit(): void {
    debugger;
    if (window.localStorage['blogs'] != undefined && window.localStorage['blogs'] != null) {
      var blogs = JSON.parse(window.localStorage['blogs']);
      if (blogs.length > 0) {
        this.siteData = blogs;
      }

    }
  }

  deleteBlog(index) {
    debugger;
    if (this.siteData.length > 0) {
      if (window.localStorage['blogs'] != undefined && window.localStorage['blogs'] != null) {
        var blogs = JSON.parse(window.localStorage['blogs']);
        if (blogs.length > 0) {
          if (index != null) {
            this.siteData.splice(index, 1);
            window.localStorage.removeItem('blogs');
            if (this.siteData.length > 0) {
              window.localStorage['blogs'] = JSON.stringify(this.siteData);
            }
          }
        }

      }
    }
  }

  editBlog(id) {
    //edit blog functionality here
    this.router.navigate(['/edit', id]);
  }

}
