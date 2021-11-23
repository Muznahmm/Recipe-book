import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './auto-logout-modal.component.html',
  styleUrls: ['./auto-logout-modal.component.scss']
})
export class AutoLogoutModalComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<AutoLogoutModalComponent>, 
  ) { }

  ngOnInit(): void {
  }

  onCancel() {
    this.dialogRef.close();
    this.authService.logout();
  }

  onConfirm() {
    this.authService.refreshAuthKey()
    .subscribe(_ => {
      this.dialogRef.close();
    })
  }

}
