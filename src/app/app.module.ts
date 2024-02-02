import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {routes} from './app.routes'
import { HttpClientModule } from '@angular/common/http';

import {AppComponent} from './app.component';
import { ShowMoviesComponent } from './show-movies/show-movies.component';
import { AddMoviesComponent } from './add-movies/add-movies.component';

const appRoutes: Routes = routes;

@NgModule({
  imports: [
    BrowserModule, FormsModule,HttpClientModule,ReactiveFormsModule ,
    RouterModule.forRoot(
        appRoutes)
  ],
  declarations: [
    AppComponent,ShowMoviesComponent, AddMoviesComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}