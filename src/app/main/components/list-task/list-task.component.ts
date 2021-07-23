import { Component, OnInit } from '@angular/core';

/**
 * Services
 * */
import {TasksService} from '../../../services/tasks/tasks.service';
import {Tasks} from '../../../services/tasks/models/tasks.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.scss']
})
export class ListTaskComponent implements OnInit {
  tasksArray: Tasks[] = [];
  isLoading = true;

  constructor(
    private readonly router: Router,
    private readonly tasksService: TasksService,
  ) {
    this.tasks();
  }

  ngOnInit() {}

  tasks(): void {
    this.tasksService.tasks().subscribe((tasks) => {
      this.tasksArray = tasks;
      this.isLoading = false;
    });
  }

  newTask() {
    console.log('New Task');
    this.router.navigate(['/task', {new: true}]);
  }

  toGo(task: Tasks) {
    this.router.navigate(['/task', task]);
  }

}
