import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

/**
 * Models
 * */
import {Tasks} from './models/tasks.model';

/**
 * Services
 * */
import {ApiService} from '../../api/api.service';
import {StorageService} from '../storage/storage.service';
import {RegardModel} from './models/regard.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  headers: HttpHeaders;
  token: string;
  userId: number;

  constructor(
    private readonly http: HttpClient,
    private readonly apiService: ApiService,
    private readonly storageService: StorageService
  ) {
    this.token = this.storageService.getStorage('token');
    this.userId = Number(this.storageService.getStorage('userId'));
    this.headers = new HttpHeaders({
      Accept: 'application/json'
    });
  }

  wellcome(): Observable<string> {
    return this.http.get<RegardModel>(
      `${this.apiService.tasks()}/regards`,
      {headers: this.headers, params: {access_token: this.token}}
    ).pipe(
      map((wellcome) => {
        return wellcome.regard;
      })
    );
  }

  tasks(): Observable<Tasks[]> {
    const where = JSON.stringify({where: {idUser: this.userId, finished: false}});

    return this.http.get<Tasks[]>(
      `${this.apiService.tasks()}`,
      {headers: this.headers, params: {filter: where, access_token: this.token}}
    ).pipe(
      map((tasks) => {
        return tasks;
      })
    );
  }

  allTasks(): Observable<Tasks[]> {
    const where = JSON.stringify({where: {idUser: this.userId}});

    return this.http.get<Tasks[]>(
      `${this.apiService.tasks()}`,
      {headers: this.headers, params: {filter: where, access_token: this.token}}
    ).pipe(
      map((tasks) => {
        return tasks;
      })
    );
  }

  newTask(task: Tasks): Observable<Tasks> {
    return this.http.post<Tasks>(
      `${this.apiService.tasks()}`,
      task,
      {headers: this.headers, params: {access_token: this.token}}
    ).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  updatedTask(task: Tasks): Observable<Tasks> {
    return this.http.put<Tasks>(
      `${this.apiService.tasks()}`,
      task,
      {headers: this.headers, params: {access_token: this.token}}
    ).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  deleteTask(id: number): Observable<void> {
    try {
      return this.http.delete<void>(
        `${this.apiService.tasks()}/${id}`,
        {headers: this.headers, params: {access_token: this.token}}
      );
    } catch (e) {
      return e;
    }
  }
}
