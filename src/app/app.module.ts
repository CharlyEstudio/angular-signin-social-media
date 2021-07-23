import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/**
 * Modules
 **/
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {MainModule} from './main/main.module';
import {SharedModule} from './shared/shared.module';

/**
 * Components
 * */
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { Error404Component } from './error404/error404.component';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import { GoogleComponent } from './components/modals/google/google.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    Error404Component,
    GoogleComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MainModule,
    SharedModule,
    NgxSkeletonLoaderModule.forRoot({
      animation: 'pulse',
      loadingText: 'This item is actually loading...',
    })
  ],
  providers: [],
  exports: [SharedModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
