import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';

import { MovieViewComponent } from '../movie-view/movie-view.component';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovie();
  }

  /**
   * Get all movies from database
   * @returns an array of all movies
   * @function getMovies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Displays a movie synopsis
   * @param title
   * @param description
   */
  openMovieViewComponent(title: string, description: string): void {
    this.dialog.open(MovieViewComponent, {
      data: {
        Title: title,
        Description: description
      },
      width: '500px'
    });
  }

  /**
   * Displays a movie director bio
   * @param name
   * @param bio
   * @param birthday
   */
  openDirectorViewComponent(name: string, bio: string, birthday: Date): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birthday: birthday
      },
      width: '500px'
    });
  }

  /**
   * Displays a movie director bio
   * @param name
   * @param description
   */
  openGenreViewComponent(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        Name: name,
        Description: description
      },
      width: '500px'
    });
  }

  /**
   * Get all favorite movies from database
   * @returns an array of all favorite movies
   * @function getFavoriteMovie
   */
  getFavoriteMovie(): void {
    this.fetchApiData.getFavoriteMovie().subscribe((resp: any) => {
      this.favoriteMovies = resp;
      console.log(this.favoriteMovies);
      return this.favoriteMovies;
    });
  }

  /**
   * Check if a movie is a favorite
   * @param id
   * @returns a boolean on whether a movie is a favorite or not
   */
  isFavorite(id: string): boolean {
    return this.favoriteMovies.includes(id);
  }

  /**
   * Add a movie to favorites
   * @param id
   * @function addFavoriteMovie
   */
  addFavoriteMovie(id: string): void {
    console.log(id);
    console.log('Movie was added to favorites');
    this.fetchApiData.addFavorite(id).subscribe((result) => {
      this.ngOnInit();
    });
  }

  /**
   * Remove a movie remove favorites
   * @param id
   * @function addFavoriteMovie
   */
  removeFavoriteMovie(id: string): void {
    console.log(id);
    console.log('Movie was removed from favorites');
    this.fetchApiData.removeFavorite(id).subscribe((result) => {
      this.ngOnInit();
    });
  }
}
