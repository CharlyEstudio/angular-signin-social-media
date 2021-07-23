import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';

/**
 * Services
 * */
import {UserService} from '../../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
  ) {}

  canActivate(): Promise<boolean> | boolean {
    if (this.userService.isActive()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
