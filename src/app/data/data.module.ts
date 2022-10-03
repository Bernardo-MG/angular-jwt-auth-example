import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataListComponent } from './data-list/data-list.component';
import { DataRoutingModule } from './data-routing.module';
import { DataService } from './service/data.service';



@NgModule({
  declarations: [
    DataListComponent
  ],
  imports: [
    DataRoutingModule,
    CommonModule
  ],
  providers: [
    DataService
  ]
})
export class DataModule { }
