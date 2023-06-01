import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-add-edit-record',
  templateUrl: './add-edit-record.component.html',
  styleUrls: ['./add-edit-record.component.scss']
})
export class AddEditRecordComponent {

  constructor(public dialogRef: MatDialogRef<AddEditRecordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) {}

    onNoClick(): void {
      this.dialogRef.close();
    }
}
