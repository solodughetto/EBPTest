import { Injectable } from '@angular/core';
import { MovieService } from './movie.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieResolverService {

  constructor(private movieService: MovieService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const movieId: number = +route.paramMap.get('id');
    return this.movieService.getMovieDetails(movieId);
  }
}
