import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

/**
 * Services
 * */
import {UserService} from '../services/user/user.service';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss']
})
export class Error404Component implements OnInit {

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
  ) { }

  ngOnInit() {
  }

  comeBack() {
    if (this.userService.isActive()) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }

}
