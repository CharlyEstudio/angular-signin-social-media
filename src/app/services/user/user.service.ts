import {Injectable, NgZone} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

declare const gapi: any;

/**
 * Models
 * */
import {CredentialModel} from './models/credential.model';
import {SignInModel} from './models/signInModel';

/**
 * Services
 * */
import {ApiService} from '../../api/api.service';
import {StorageService} from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  auth2: any;
  private active = false;
  private signInUser: SignInModel;
  token: string;
  userId: number;

  constructor(
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly apiService: ApiService,
    private readonly storageService: StorageService,
    private readonly ngZone: NgZone,
  ) {
    this.token = this.storageService.getStorage('token') ? this.storageService.getStorage('token') : null;
    this.userId = this.storageService.getStorage('userId') ? Number(this.storageService.getStorage('userId')) : null;

    this.googleInit();
  }

  googleInit() {
    return new Promise(resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '1030961734562-oia45hn99ure5r2b3rrojvvo0iustitu.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });
    });
  }

  isActive(): boolean {
    return !!this.storageService.getStorage('token');
  }

  signIn(crendentials: CredentialModel): Observable<SignInModel> {
    return this.http.post<SignInModel>(this.apiService.login(), crendentials).pipe(
      map((user) => {
        this.signInUser = user;
        this.active = true;
        if (crendentials.remember) {
          this.storageService.setStorage('email', crendentials.email);
        }
        this.storageService.setStorage('channel', 'loopback');
        this.storageService.setStorage('token', user.id);
        this.storageService.setStorage('userId', user.userId.toString());
        this.router.navigate(['/home']);
        return user;
      }),
    );
  }

  signInGoogle(googleUser) {
    // TODO mandar al servidor los datos
    this.storageService.setStorage('channel', 'google');
    this.storageService.setStorage('email', googleUser.getBasicProfile().getEmail());
    this.storageService.setStorage('token', googleUser.getAuthResponse().id_token);
    this.storageService.setStorage('userId', googleUser.getBasicProfile().getId());
    this.ngZone.run(() => this.router.navigate(['/home']));
  }

  signOut(): Observable<any> {
    const channel = this.storageService.getStorage('channel');
    switch (channel) {
      case 'google':
        this.auth2 = gapi.auth2.getAuthInstance();
        return of(this.auth2.signOut().then(() => {
          console.log('User signed out.');
          this.ngZone.run(() => {
            this.storageService.remove('email');
            this.storageService.remove('channel');
            this.storageService.remove('token');
            this.storageService.remove('userId');
            this.router.navigate(['/login']);
          });
        }));
      default:
        const headers = new HttpHeaders({
          Accept: 'application/json'
        });

        if (!this.token) {
          this.token = this.storageService.getStorage('token');
        }

        return this.http.post(
          `${this.apiService.logout()}`,
          null,
          {headers, params: {access_token: this.token}}
        ).pipe(
          map((resp) => {
            this.remove();
            this.router.navigate(['/login']);
            return resp;
          }),
          catchError((err) => {
            this.remove();
            return err;
          })
        );
    }
  }

  remove() {
    this.storageService.remove('channel');
    this.storageService.remove('token');
    this.storageService.remove('userId');
    this.router.navigate(['/login']);
  }
}
