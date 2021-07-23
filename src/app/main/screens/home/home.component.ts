import { Component, OnInit } from '@angular/core';

/**
 * Services
 * */
import {TasksService} from '../../../services/tasks/tasks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  message: string;

  constructor(
    private readonly tasksService: TasksService,
  ) {
    this.tasksService.wellcome().subscribe((regard) => this.message = regard);
  }

  ngOnInit() {
  }

}
