import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://fathomless-peak-84165.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  constructor(private http: HttpClient) {
    this.http = http;
  }

 // User Registration
 public userRegistration(userDetails: any): Observable<any> {
   console.log(userDetails);
   return this.http.post(apiUrl + 'users', userDetails).pipe(
     catchError(this.handleError)
   );
 }

 //User Login
 public userLogin(userDetails: any): Observable<any> {
   return this.http.post(apiUrl + 'login', userDetails).pipe(
     catchError(this.handleError)
   );
 }

 //Get all Movies
 public getAllMovies(): Observable<any> {
   const token = localStorage.getItem('token');
   const username = localStorage.getItem('user');
   return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
     {
       Authorization: 'Bearer ' + token
     })}).pipe(
       map(this.extractResponseData),
       catchError(this.handleError)
     );
 }

 //Get one Movie
 public getMovie(title: any): Observable<any> {
   const token = localStorage.getItem('token');
   return this.http.get(apiUrl + `movies/${title}`, {headers: new HttpHeaders(
     {
       Authorization: 'Bearer ' + token
     })}).pipe(
       map(this.extractResponseData),
       catchError(this.handleError)
     );
 }

 //Get a Director
 public getDirector(name: any): Observable<any> {
   const token = localStorage.getItem('token');
   return this.http.get(apiUrl + `director/${name}`, {headers: new HttpHeaders(
     {
       Authorization: 'Bearer ' + token
     })}).pipe(
       map(this.extractResponseData),
       catchError(this.handleError)
     );
 }

 //Get a genre
 public getGenre(name: any): Observable<any> {
   const token = localStorage.getItem('token');
   return this.http.get(apiUrl + `genre/${name}`, {headers: new HttpHeaders(
     {
       Authorization: 'Bearer ' + token
     })}).pipe(
       map(this.extractResponseData),
       catchError(this.handleError)
     );
 }

 //Get a User
 public getUser(): Observable<any> {
   const token = localStorage.getItem('token');
   const username = localStorage.getItem('user');
   return this.http.get(apiUrl + 'users/' + username, {headers: new HttpHeaders(
     {
       Authorization: 'Bearer ' + token
     })}).pipe(
       map(this.extractResponseData),
       catchError(this.handleError)
     );
 }

 //Get Favorite Movies
 public getFavoriteMovie(): Observable<any> {
   const token = localStorage.getItem('token');
   const username = localStorage.getItem('user');
   return this.http.get(apiUrl + 'users/' + username + '/movies', {headers: new HttpHeaders(
     {
       Authorization: 'Bearer ' + token
     })}).pipe(
       map(this.extractResponseData),
       catchError(this.handleError)
     );
 }

 //Add a movie to favorites
 public addFavorite(movieId: string): Observable<any> {
   const token = localStorage.getItem('token');
   const username = localStorage.getItem('user');
   return this.http.post(apiUrl + 'users/' + username + '/movies/' + movieId, { FavoriteMovie: movieId }, {headers: new HttpHeaders(
     {
       Authorization: 'Bearer ' + token
     })}).pipe(
       map(this.extractResponseData),
       catchError(this.handleError)
     );
 }

 //Remove a movie from Favorites
 public removeFavorite(movieId: any): Observable<any> {
   const token = localStorage.getItem('token');
   const username = localStorage.getItem('user');
   return this.http.delete(apiUrl + 'users/' + username + '/movies/' + movieId, {headers: new HttpHeaders(
     {
       Authorization: 'Bearer ' + token
     })}).pipe(
       map(this.extractResponseData),
       catchError(this.handleError)
     );
 }

 //Update User Info
 public updateUser(updateDetails: any): Observable<any> {
   const token = localStorage.getItem('token');
   const username = localStorage.getItem('user');
   return this.http.put(apiUrl + `users/${username}`, updateDetails, {headers: new HttpHeaders(
     {
       Authorization: 'Bearer ' + token
     })}).pipe(
       map(this.extractResponseData),
       catchError(this.handleError)
     );
 }

 //Delete User
 public removeUser(): Observable<any> {
   const token = localStorage.getItem('token');
   const username = localStorage.getItem('user');
   return this.http.delete(apiUrl + `users/${username}`, {headers: new HttpHeaders(
     {
       Authorization: 'Bearer ' + token
     })}).pipe(
       map(this.extractResponseData),
       catchError(this.handleError)
     );
  }

 private handleError(error: HttpErrorResponse): any {
   if (error.error instanceof ErrorEvent) {
     console.error('Some error occurred:', error.error.message);
   } else {
     console.error(
       `Error Status code ${error.status}, ` +
       `Error body is: ${error.error}`
     );
   }
   return throwError(
     'Something bad happened; please try again later.'
   );
 }

 private extractResponseData(res: any): any {
   const body = res;
   return body || {};
 }
}
