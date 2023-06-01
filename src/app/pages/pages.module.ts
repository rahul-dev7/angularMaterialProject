import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout.component';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { AddEditRecordComponent } from './add-edit-record/add-edit-record.component';


@NgModule({
  declarations: [
    HomeComponent,
    LayoutComponent,
    HeaderComponent,
    AddEditRecordComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
