import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditRecordComponent } from '../add-edit-record/add-edit-record.component';
import { RecordModel } from 'src/app/common/models/record';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

const ELEMENT_DATA: RecordModel[] = [
  {id: 1, title: 'Hydrogen', startDate: '22-05-2023', dueDate: '22-05-2023', attachment: ''},
  // {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  // {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  // {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  // {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  // {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  // {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  // {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  // {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  // {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  // {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit{
  displayedColumns: string[] = ['title', 'startDate', 'dueDate', 'attachment', 'actions'];
  dataSource = new MatTableDataSource<RecordModel>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  animal: string = '';
  name: string = '';
 


  constructor(public dialog: MatDialog) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openAddEditRecordDialog(id = 0) {
    const dialogRef = this.dialog.open(AddEditRecordComponent, {
      data: {name: 'rws', animal: 'sjsjjs'},
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }


  
}
