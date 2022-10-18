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

  viewMovies(): void {
    this.router.navigate(['movies']);
  }

  viewProfile(): void {
    this.router.navigate(['profile']);
  }

  logoutUser(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['welcome']);
  }
}
