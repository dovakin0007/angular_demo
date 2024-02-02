import { Routes } from '@angular/router';
import { ShowMoviesComponent } from './show-movies/show-movies.component';
import { AddMoviesComponent } from './add-movies/add-movies.component';

export const routes: Routes =   [{path: 'show_mv', component: ShowMoviesComponent},
{path: 'add_mv', component: AddMoviesComponent}];
