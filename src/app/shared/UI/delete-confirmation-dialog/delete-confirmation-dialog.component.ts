import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface ModelData {
  title: string,
  description: string,
  deleteFunc: () => void;
}

@Component({
  selector: 'app-delete-confirmation-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.component.scss']
})
export class DeleteConfirmationDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModelData,
  ) { }

  ngOnInit(): void {
  }

  onCancel() {
    this.dialogRef.close(true);
  }

  onConfirm() {
    if(this.data.deleteFunc) {
      this.data.deleteFunc();
      this.dialogRef.close(false);
    }
  }

}
