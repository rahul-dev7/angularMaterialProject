import { Component, OnInit } from '@angular/core';
import { AppState } from './pages/store/app.state';
import { Store } from '@ngrx/store';
import { getRecords } from './pages/store/records.selector';
import { Observable } from 'rxjs';
import { RecordModel } from './common/models/record';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angularMaterialProject';

  constructor() {}
  ngOnInit() {
   
  }
}
