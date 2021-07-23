import { Component, OnInit } from '@angular/core';

/**
 * Services
 * */
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private readonly userService: UserService
  ) { }

  ngOnInit() {}

  signOut() {
    this.userService.signOut().subscribe(resp => {}, error => console.log(error));
  }

}
