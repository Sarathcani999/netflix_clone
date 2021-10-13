import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MovieComponent } from './movie/movie.component';
import { TvComponent } from './tv/tv/tv.component';
import { UseraccessGuard } from './authentication/useraccess.guard'
import {DebuggingGuard}  from './authentication/debugging.guard'


const routes: Routes = [
  {path : 'home' , component : HomeComponent , canActivate : [UseraccessGuard]} ,
  {path : 'login' , component : LoginComponent , canActivate : [DebuggingGuard]} ,
  {path : '' , component : RegisterComponent , canActivate : [DebuggingGuard]} ,
  {path : 'movie/:id' , component : MovieComponent , canActivate : [UseraccessGuard]} ,
  {path : 'tv/:id' , component : TvComponent , canActivate : [UseraccessGuard]} ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
