import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';

/**
 * Modules
 * */
import {MainRoutingModule} from './main-routing.module';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';

/**
 * Components
 * */
import { HomeComponent } from './screens/home/home.component';
import { ListTaskComponent } from './components/list-task/list-task.component';
import { TaskComponent } from './screens/task/task.component';
import { TasksComponent } from './screens/tasks/tasks.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [MainComponent, HomeComponent, ListTaskComponent, TaskComponent, TasksComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    RouterModule,
    SharedModule,
    NgxSkeletonLoaderModule.forRoot({
      animation: 'pulse',
      loadingText: 'This item is actually loading...',
    }),
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class MainModule { }
