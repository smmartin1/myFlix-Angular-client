import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})

export class EditProfileComponent implements OnInit {
  @Input() userData: any = {}

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  updateUser(): void {
    console.log(this.userData);
    this.fetchApiData.updateUser(this.userData).subscribe((result) => {
     this.dialogRef.close();
     console.log(result);
     this.snackBar.open('Profile has been updated', 'OK', {duration: 2000});
    });

    localStorage.setItem('user', this.userData.Username);
  }

}
