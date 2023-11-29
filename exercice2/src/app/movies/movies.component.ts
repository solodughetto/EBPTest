import { Component } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent {

  searchInput: string = "";
  movies: any[] = [];

  constructor(private moviesService: MovieService, private router: Router) {}


  search(): void {
    this.moviesService.searchMovies(this.searchInput).subscribe((data: any) => 
    {
      console.log("data", data);
      this.movies = data.results;
    })
  }

  onDetailsView(movieId: number): void {
    this.router.navigate(['/movies/details', movieId])
  }

  trackByFn(index: number, item: any): number {
    return item.id;
  }
}
