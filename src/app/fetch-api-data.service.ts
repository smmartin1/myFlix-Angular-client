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

  /**
   * @service Post a new user to an API endpoint
   * @param {any} userDetails
   * @returns a new user information in a json format
   * @function userRegistration
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }


  /**
   * @service Post a returning user to an API endpoint
   * @param {any} userDetails
   * @returns a returning user information in a json format
   * @function userLogin
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * @service Get all the movies in the database
   * @returns an array of all the movies in json format
   * @function getAllMovies
   */
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

  /**
   * @service Get a movie in the database
   * @param {any} title
   * @returns information of the movie in json format
   * @function getMovie
   */
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

  /**
   * @service Get a movie director in the database
   * @param {any} name
   * @returns information of the movie director in json format
   * @function getDirector
   */
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

  /**
   * @service Get a movie genre in the database
   * @param {any} name
   * @returns information of the movie genre in json format
   * @function getGenre
   */
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

  /**
   * @service Get a user in the database
   * @returns information of the user in json format
   * @function getUser
   */
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

  /**
   * @service Get a user's favorite movie in the database
   * @returns the movie in json format
   * @function getFavoriteMovie
   */
  public getFavoriteMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.get(apiUrl + 'users/' + username + '/movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token
      })
    }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * @service Post a movie to the user's favorite movie array
   * @param {string} movieId
   * @returns information of the user in json format
   * @function addFavorite
   */
  public addFavorite(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.post(apiUrl + 'users/' + username + '/movies/' + movieId, { FavoriteMovie: movieId },
      {headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token
        })
      }).pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
  }

  /**
   * @service Delete a movie to the user's favorite movie array
   * @param {string} movieId
   * @returns information of the user in json format
   * @function removeFavorite
   */
  public removeFavorite(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.delete(apiUrl + 'users/' + username + '/movies/' + movieId,
      {headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token
        })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * @service Put new information of user in database
   * @param {any} updateDetails
   * @returns new information of the user in json format
   * @function updateUser
   */
  public updateUser(updateDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.put(apiUrl + `users/${username}`, updateDetails, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * @service Deletes user in database
   * @returns success message
   * @function removeUser
   */
  public removeUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${username}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * @param error
   * @returns error message
   */
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

  /**
   * @param res
   * @returns response body or nothing
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
}
