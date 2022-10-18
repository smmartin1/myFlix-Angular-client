import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user;
    });
  }

  openEditProfileComponent(): void {
    this.dialog.open(EditProfileComponent, { width: '300px'});
  }

  deleteUser(): void {
    if (confirm('Are you sure you want to delete your account?')) {
      this.router.navigate(['welcome']);

      this.fetchApiData.removeUser().subscribe((result) => {
        localStorage.clear();
      });
    }
  }
}
