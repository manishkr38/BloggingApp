import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/layout/header/header.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { HomeComponent } from './sitemodules/home/home.component';
import { NewblogComponent } from './sitemodules/newblog/newblog.component';
import { EditblogComponent } from './sitemodules/editblog/editblog.component';

import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './services/user.service';
import { AuthGuard } from './auth/auth.guard';
import { JwtService } from './auth/jwt.service';
import { DataSharingService } from './auth/data-sharing.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NewblogComponent,
    EditblogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularEditorModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'decreasing',
      closeButton: true,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  exports: [
    FormsModule
  ],
  providers: [UserService, AuthGuard, JwtService, DataSharingService, HeaderComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
