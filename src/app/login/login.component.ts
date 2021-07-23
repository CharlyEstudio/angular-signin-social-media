import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

declare const gapi: any;

/**
 * Services
 * */
import {UserService} from '../services/user/user.service';
import {StorageService} from '../services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formSignIn: FormGroup;
  auth2: any;
  inavlid = false;

  constructor(
    private readonly userService: UserService,
    private readonly storageService: StorageService,
  ) {}

  ngOnInit() {
    this.formSignIn = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.minLength(4), Validators.required]),
      remember: new FormControl(false)
    });

    if (this.storageService.getStorage('email')) {
      this.formSignIn.controls.email.setValue(this.storageService.getStorage('email'));
    }

    this.renderButton();
  }

  onChange() {
    this.inavlid = false;
  }

  signIn() {
    this.inavlid = false;
    if (this.formSignIn.status === 'INVALID') {
      this.inavlid = true;
      return;
    }

    this.userService.signIn(this.formSignIn.value).subscribe((user) => {});
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 120,
      height: 36,
      longtitle: false,
      theme: 'dark'
    });

    this.startApp();
  }

  async startApp() {
    await this.userService.googleInit();
    this.auth2 = this.userService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        this.userService.signInGoogle(googleUser);
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }
}
