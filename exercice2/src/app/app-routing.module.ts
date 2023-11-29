import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieResolverService } from './services/movie-resolver.service';
import { MovieDetailsComponent } from './movies/movie-details/movie-details/movie-details.component';

const routes: Routes = [
    { path: '', component: MoviesComponent },
    { path: 'movies/details/:id', 
      component: MovieDetailsComponent,
      resolve: { movieData: MovieResolverService }   
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
