import { Injectable } from '@angular/core';
import { Blog } from '../model/blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor() { }

  createBlog(heading, scData, urlData) {
    if (scData != null && heading != null) {
      var blog: Blog = {
        id: 0,
        scData: scData,
        userName: "blogUser",
        userId: "1",
        dateCreated: "",
        isActive: 1,
        heading: heading,
        urlData: urlData
      }
      debugger;
      blog.dateCreated = new Date().toDateString();
     
      debugger;
      if (window.localStorage['blogs'] != undefined && window.localStorage['blogs'] != null) {
        var blogs = JSON.parse(window.localStorage['blogs']);
        if (blogs != undefined && blogs != null) {
          if (blogs.length > 0) {
            blog.id = blogs.length + 1;
            blogs.push(blog);
            window.localStorage.removeItem('blogs');
            window.localStorage['blogs'] = JSON.stringify(blogs);
          }
        }
      }
      else {
        var newBlog = [];
        blog.id = 1;
        newBlog.push(blog);
        window.localStorage['blogs'] = JSON.stringify(newBlog);
      }

      return blog;
    }
    return null;
  }

  
  editBlog(heading, scData, urlData, blogid) {
    if (scData != null && heading != null) {
     
        var blog = {};
     
      debugger;
      if (window.localStorage['blogs'] != undefined && window.localStorage['blogs'] != null) {
        var blogs = JSON.parse(window.localStorage['blogs']);
        if (blogs != undefined && blogs != null) {
          if (blogs.length > 0) {
            blogs[blogid].heading = heading;
            blogs[blogid].scData = scData;

            window.localStorage.removeItem('blogs');
            window.localStorage['blogs'] = JSON.stringify(blogs);
          }
        }
      }

      return blog;
    }
    return null;
  }

}
