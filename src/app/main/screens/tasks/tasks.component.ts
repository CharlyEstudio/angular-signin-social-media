import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

/**
 * Models
 * */
import {Tasks} from '../../../services/tasks/models/tasks.model';

/**
 * Services
 * */
import {TasksService} from '../../../services/tasks/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks: Tasks[] = [];

  constructor(
    private readonly router: Router,
    private readonly tasksServices: TasksService,
  ) {
    this.tasksServices.allTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  ngOnInit() {
  }

  toGo(task: Tasks) {
    this.router.navigate(['/task', task]);
  }

}
