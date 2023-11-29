import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private favoritesSubject: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  favorites$: Observable<number[]> = this.favoritesSubject.asObservable();

  private apiKey: string = "3e790404c75423e7b9ef7e533a2ac81b";
  private localStorageKey: string = 'favoriteMovies';

  constructor(private http: HttpClient) { 
    const storedFavorites = localStorage.getItem(this.localStorageKey);

    if (storedFavorites) {
      this.favoritesSubject.next(JSON.parse(storedFavorites));
    }
  }

  searchMovies(searchInput: string) {
    return this.http.get(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${searchInput}`)
  }

  getMovieDetails(movieId: any) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${this.apiKey}`);
  }

  addFavorites(movieId: number) {
    const currentFavorites = this.favoritesSubject.getValue();
    const updatedFavorites = [...currentFavorites, movieId];
    this.favoritesSubject.next(updatedFavorites);
    localStorage.setItem(this.localStorageKey, JSON.stringify(updatedFavorites));
  }

  getFavorites(): number[] {
    return this.favoritesSubject.getValue();
  }
}
