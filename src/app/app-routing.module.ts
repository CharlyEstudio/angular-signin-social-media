import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * Guards
 * */
import {UserGuard} from './guards/user/user.guard';

/**
 * Components
 * */
import {LoginComponent} from './login/login.component';
import {Error404Component} from './error404/error404.component';
import {MainComponent} from './main/main.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainComponent,
    canActivate: [ UserGuard ],
    loadChildren: () => import('./main/main.module').then(m => m.MainModule) },
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })], // Only true debbug
  exports: [RouterModule]
})
export class AppRoutingModule { }
