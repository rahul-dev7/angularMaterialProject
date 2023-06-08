import { Component, ElementRef, Inject, LOCALE_ID, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { RecordModel } from 'src/app/common/models/record';
import { RecordsState } from '../store/record.state';
import { addRecord, updateRecord } from '../store/records.action';
import { formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { getRecordById } from '../store/records.selector';

export interface DialogData {
  animal: string;
  name: string;
}

const EMPTY_RECORD:RecordModel  = 
  { id: '0', 
  title: '', 
  startDate: '', 
  dueDate: '', 
  attachment: ''
};

@Component({
  selector: 'app-add-edit-record',
  templateUrl: './add-edit-record.component.html',
  styleUrls: ['./add-edit-record.component.scss']
})
export class AddEditRecordComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput') fileInput: ElementRef;
  fileAttr = 'Choose File';
  todayDate:Date = new Date();
  addEditForm: FormGroup;
  recordSubscription: Subscription;
  record: RecordModel = EMPTY_RECORD;

  constructor(
    public dialogRef: MatDialogRef<AddEditRecordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, 
    @Inject(LOCALE_ID) public locale: string,
    private fb: FormBuilder,
    private store: Store<{records: RecordsState}>,
    private _snackBar: MatSnackBar,
    ) {}
   
    onClose(): void {
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

    ngOnInit(): void {
      if(this.data['id'] != 0) {
        const id = this.data['id'];
        this.recordSubscription = this.store.select(getRecordById, {id}).subscribe((data) => {
          console.log(data, 'data');
          this.record = data;
          this.setAddRecord();
        })
      }
      this.initalizeForm();
    }

    setAddRecord() {
      // this.addEditForm.patchValue({
      //   title: this.record.title,
      //   startDate: new Date( this.convertDateFormat(this.record.startDate)),
      //   dueDate:  new Date( this.convertDateFormat(this.record.dueDate)),
      //   attachment: this.record.attachment
      // })
    }

    initalizeForm() {
      const startDate = new Date( this.convertDateFormat(this.record.startDate));
      const dueDate=  new Date( this.convertDateFormat(this.record.dueDate));
      
      this.addEditForm = this.fb.group({
        title: [this.record.title],
        startDate: [startDate],
        dueDate:  [dueDate],
        attachment: [this.record.attachment]
      });
    }

    onSubmit() {
      if(!this.addEditForm.valid) {
        console.log(this.findInvalidControls());
        return;
      }
      const formValue = this.addEditForm.value;
      formValue.startDate = this.convertFormat(formValue.startDate);
      formValue.dueDate = this.convertFormat(formValue.dueDate);

      let record: RecordModel = {
        title: formValue.title, 
        startDate: formValue.startDate, 
        dueDate: formValue.dueDate, 
        attachment: formValue.attachment
      };
      
      if(this.data['id'] != 0) {
        record.id = this.data['id'];
        this.store.dispatch(updateRecord({record}));
        this._snackBar.open('Record updated Successfully', 'dismiss');
      }
      else {
        this.store.dispatch(addRecord({record}));
        this._snackBar.open('Record inserted Successfully', 'dismiss');
      }
      this.dialogRef.close();
    }


    convertFormat(date) {
      return formatDate(date, 'dd-MM-yyyy' ,this.locale);
    }


    convertDateFormat(date) {
      return date.split('-').reverse().join('-');
    }


    ngOnDestroy() {
    
      if(this.recordSubscription) {
        this.recordSubscription.unsubscribe();
      }
    }

    public findInvalidControls() {
        const invalid = [];
        const controls = this.addEditForm.controls;
        for (const name in controls) {
            if (controls[name]) {
                invalid.push(name);
            }
        }
        return invalid;
    }


}
