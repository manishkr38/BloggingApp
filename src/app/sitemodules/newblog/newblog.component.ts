import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { Blog } from 'src/app/model/blog.model';
import { User } from 'src/app/model/user.model';
import { BlogService } from 'src/app/services/blog.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-newblog',
  templateUrl: './newblog.component.html',
  styleUrls: ['./newblog.component.css']
})
export class NewblogComponent implements OnInit {

  sitecontent: Blog;
  userId: string;
  userName: string;

  headingError: boolean = false;
  contentError: boolean = false;
  tagError: boolean = false;
  generalError: boolean = false;

  user: User;
 
  constructor(private userService: UserService, private toastr: ToastrService, private http: HttpClient,
    private router: Router, private route: ActivatedRoute, private blogServices: BlogService) {
    this.sitecontent = new Blog;
  }

  ngOnInit(): void {
    
  }

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '200px',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      [
        'undo',
        'redo',
        //'bold',
        //'italic',
        //'underline',
        'strikeThrough',
        'subscript',
        'superscript',
        //'justifyLeft',
        //'justifyCenter',
        //'justifyRight',
        //'justifyFull',
        'indent',
        'outdent',
        'insertUnorderedList',
        //'insertOrderedList',
        //'heading',
        'fontName'
      ],
      [
        //'fontSize',
        //'textColor',
        //'backgroundColor',
        'customClasses',
        //'link',
        //'unlink',
        //'insertImage',
        //'insertVideo',
        //'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode'
      ]
    ]
  };


  OnSubmit(form: NgForm) {



    
    if (form.value.heading == "" || !form.value.heading || form.value.heading.trim().length == 0) {
      this.headingError = true;
      this.toastr.error('', 'Please Write a Heading for Article');
    }

    console.log(form.value);

    var urlData = "";
    if (form.value.scData) {

      var re = /src(\s*)=(\s*)"([^\s]*)"/g;
      var str = form.value.scData;
      var xArray;
      var pictures = [];
      while (xArray = re.exec(str)) {
        pictures.push(xArray[3]);
      }

      var content_holder = form.value.scData.replace(/<(?:.|\n)*?>/gm, '');
      content_holder = content_holder.replace(/&nbsp;/gm, '');
      if (content_holder.trim().length == 0) {
        if (pictures.length < 1) {
          this.contentError = true;
          this.toastr.error('', 'Please Write Some content');
        }
        else {
        }
      }
      else {

        
        if (!this.headingError) {
          form.value.titleData = form.value.heading;
          urlData = form.value.heading.replace(/[^A-Z0-9]+/ig, "-");
          if (urlData[urlData.length - 1] == "-") {
            urlData = urlData.slice(0, -1);
          }
          if (urlData[0] == "-") {
            urlData = urlData.substr(1);
          }

          if (urlData.length > 60) {
            urlData = urlData.substring(0, 60);
          }
          urlData = urlData.toLowerCase();
        }



      }
    }


    if (!this.headingError && !this.contentError && !this.tagError) {
      console.log(form.value);
      var dataStatus = this.blogServices.createBlog(form.value.heading, form.value.scData, urlData);
      if (dataStatus != null) {
        this.toastr.success('', 'Successfully Saved');
        this.sitecontent = new Blog;
        this.router.navigate(['/home']);
      }
      else {
        this.generalError = true;
        this.toastr.error('', 'An Error Occured');
      }
    }
  }
}
