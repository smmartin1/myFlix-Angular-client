import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  constructor(
    public router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * Directs users to the movies page
   * @function viewMovies
   */
  viewMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Directs users to their profile
   * @function viewProfile
   */
  viewProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * Logs users out and returns them to the welcome page
   * @function logoutUser
   */
  logoutUser(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['welcome']);
  }
}
