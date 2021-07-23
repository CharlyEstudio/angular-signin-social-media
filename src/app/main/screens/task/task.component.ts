import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

/**
 * Models
 * */
import {Tasks} from '../../../services/tasks/models/tasks.model';

/**
 * Services
 * */
import {TasksService} from '../../../services/tasks/tasks.service';
import {StorageService} from '../../../services/storage/storage.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  formUpdate: FormGroup;
  update = false;
  new = false;
  invalid = false;
  task: Tasks;
  message: string;
  userId: number;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly tasksService: TasksService,
    private readonly storageService: StorageService,
  ) {
    this.task = new Tasks();
    this.userId = Number(this.storageService.getStorage('userId'));
  }

  ngOnInit() {
    if (!this.route.snapshot.paramMap.get('new')) {
      this.dataLoad();
    } else {
      this.loadFormUpdate();
      this.new = true;
    }

    this.message = '';
  }

  dataLoad() {
    this.task.id = Number(this.route.snapshot.paramMap.get('id'));
    this.task.task = this.route.snapshot.paramMap.get('task');
    this.task.idUser = Number(this.route.snapshot.paramMap.get('idUser'));
    this.task.finished = this.route.snapshot.paramMap.get('finished') === 'true';
    this.task.createdAt = new Date(this.route.snapshot.paramMap.get('createdAt'));
    this.task.updatedAt = new Date(this.route.snapshot.paramMap.get('updatedAt'));
    this.loadFormUpdate(this.task);
  }

  loadFormUpdate(task?: Tasks) {
    this.formUpdate = new FormGroup({
      id: new FormControl(task ? task.id : null),
      task: new FormControl(task ? task.task : '', [Validators.minLength(3), Validators.required]),
      idUser: new FormControl(task ? task.idUser : this.userId),
      finished: new FormControl(task ? task.finished : false),
      createdAt: new FormControl(task ? task.createdAt : new Date()),
      updatedAt: new FormControl(task ? task.updatedAt : new Date()),
    });
  }

  finish(finished: boolean) {
    this.formUpdate.controls.finished.setValue(finished);
    this.updateTask();
  }

  updated() {
    this.message = '';
    this.update = true;
  }

  cancel() {
    this.update = false;
  }

  updateTask() {
    this.tasksService.updatedTask(this.formUpdate.value).subscribe(
      (resp) => {
        this.task.task = resp.task;
        this.cancel();
      },
      error => {
        this.message = error.error.error.message;
        this.dataLoad();
      }
    );
  }

  onChangeInput() {
    this.invalid = false;
  }

  createdTask() {
    this.invalid = false;

    if (this.formUpdate.status === 'INVALID') {
      this.invalid = true;
      return;
    }

    if (!this.formUpdate.controls.idUser.value) {
      console.log('No existe un ID de Usuario');
      return;
    }
    this.tasksService.newTask(this.formUpdate.value).subscribe(
      () => {
        this.goBack();
      },
      error => {
        this.message = error.error.error.message;
      }
    );
  }

  deleted() {
    this.tasksService.deleteTask(this.formUpdate.controls.id.value).subscribe(
      () => {
        this.goBack();
      },
      error => {
        this.message = error.error.error.message;
      }
    );
  }

  goBack() {
    this.router.navigate(['/home']);
  }

}
