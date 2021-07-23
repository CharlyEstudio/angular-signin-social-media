import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

/**
 * Components
 * */
import {HomeComponent} from './screens/home/home.component';
import {TasksComponent} from './screens/tasks/tasks.component';
import {TaskComponent} from './screens/task/task.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'tasks', component: TasksComponent },
  { path: 'task', component: TaskComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)]
})
export class MainRoutingModule { }
