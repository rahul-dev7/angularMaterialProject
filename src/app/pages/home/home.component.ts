import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditRecordComponent } from '../add-edit-record/add-edit-record.component';
import { RecordModel } from 'src/app/common/models/record';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store, select } from '@ngrx/store';
import { getRecords } from '../store/records.selector';
import { AppState } from '../store/app.state';
import { Observable } from 'rxjs';
import { addRecord, deleteRecord } from '../store/records.action';
import { RecordsState } from '../store/record.state';

const ELEMENT_DATA: RecordModel[] = [
  { id: '0', 
    title: '', 
    startDate: '', 
    dueDate: '', 
    attachment: ''
  }
];
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnInit{
  displayedColumns: string[] = ['title', 'startDate', 'dueDate', 'attachment', 'actions'];
  dataSource = new MatTableDataSource<RecordModel>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
 
 
  posts: Observable<RecordModel[]>;

  constructor(
    public dialog: MatDialog, 
    private _snackBar: MatSnackBar,
    private store: Store<{records: RecordsState}>
   ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.store.select(getRecords).subscribe(res => {
      console.log(res, 'post');
      this.dataSource = new MatTableDataSource<RecordModel>(res);
    })
  }

  openAddEditRecordDialog(id = 0) {
    const dialogRef = this.dialog.open(AddEditRecordComponent, {
      data: {id: id},
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  
  onDeleteRecord(id: string, title: string) {
    if(confirm('Are you sure you want to delete')) {
      console.log('delete the post');
      this.store.dispatch(deleteRecord({id}));
      this._snackBar.open(`${title} deleted Successfully`, 'dismiss');
    }
  }
}
