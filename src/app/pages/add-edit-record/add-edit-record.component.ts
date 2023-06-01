import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
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
  @ViewChild('fileInput') fileInput: ElementRef;
  fileAttr = 'Choose File';

  constructor(public dialogRef: MatDialogRef<AddEditRecordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) {}
    
    onNoClick(): void {
      this.dialogRef.close();
    }
    
    uploadFileEvt(imgFile: any) {
      if (imgFile.target.files && imgFile.target.files[0]) {
        this.fileAttr = '';
        Array.from(imgFile.target.files).forEach((file: any) => {
          this.fileAttr += file.name + ' - ';
        });
        // HTML5 FileReader API
        let reader = new FileReader();
        reader.onload = (e: any) => {
          let image = new Image();
          image.src = e.target.result;
          image.onload = (rs) => {
            let imgBase64Path = e.target.result;
          };
        };
        reader.readAsDataURL(imgFile.target.files[0]);
        // Reset if duplicate image uploaded again
        this.fileInput.nativeElement.value = '';
      } else {
        this.fileAttr = 'Choose File';
      }
    }
}
