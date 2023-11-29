import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent {

  movie: any;
  favorites: any[] = [];
  isFavorited: boolean = false;

  constructor(private route: ActivatedRoute, private movieService: MovieService, private router: Router) {
    this.route.data.subscribe((data: any) => {
      this.movie = data.movieData;
      this.isFavorited = this.movieService.getFavorites().includes(this.movie.id);
      console.log(data);
    });
  }

  addFavorites(): void {
    const movieId: number = this.movie.id;

    if(!this.isFavorited) {
      this.movieService.addFavorites(movieId);
      this.isFavorited = true;
      console.log("ajouter aux favories");
      this.getFavorites();
    } else {
      console.log("déjà dans les favories");
      this.getFavorites();
    }
  }

  getFavorites(): void {
    this.favorites = this.movieService.getFavorites();
    console.log("tout les favories", this.favorites);
  }

}
