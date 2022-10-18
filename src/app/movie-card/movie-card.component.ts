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

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  openMovieViewComponent(title: string, description: string): void {
    this.dialog.open(MovieViewComponent, {
      data: {
        Title: title,
        Description: description
      },
      width: '500px'
    });
  }

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

  openGenreViewComponent(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        Name: name,
        Description: description
      },
      width: '500px'
    });
  }

  getFavoriteMovie(): void {
    this.fetchApiData.getFavoriteMovie().subscribe((resp: any) => {
      this.favoriteMovies = resp;
      console.log(this.favoriteMovies);
      return this.favoriteMovies;
    });
  }

  isFavorite(id: string): boolean {
    return this.favoriteMovies.includes(id);
  }

  addFavoriteMovie(id: string): void {
    console.log(id);
    console.log('Movie was added to favorites');
    this.fetchApiData.addFavorite(id).subscribe((result) => {
      this.ngOnInit();
    });
  }

  removeFavoriteMovie(id: string): void {
    console.log(id);
    console.log('Movie was removed from favorites');
    this.fetchApiData.removeFavorite(id).subscribe((result) => {
      this.ngOnInit();
    });
  }
}
