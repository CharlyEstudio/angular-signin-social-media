import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';

const USERS = 'Users';
const TASKS = 'tasks';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  login(): string {
    return `${environment.uriApi}/${USERS}/login`;
  }

  logout(): string {
    return `${environment.uriApi}/${USERS}/logout`;
  }

  tasks(): string {
    return `${environment.uriApi}/${TASKS}`;
  }
}
