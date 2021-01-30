import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  siteData: any = [];
  constructor() { }

  ngOnInit(): void {
    debugger;
    if (window.localStorage['blogs'] != undefined && window.localStorage['blogs'] != null) {
      var blogs = JSON.parse(window.localStorage['blogs']);
      if (blogs.length > 0) {
        this.siteData = blogs;
      }

    }
  }

  deleteBlog(id) {
    //delete functionality here
  }

  editBlog(id)
  {
    //edit blog functionality here
  }

}
