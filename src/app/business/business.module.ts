import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { BusinessRoutingModule } from './business-routing.module';
import { BusinessListComponent } from './containers/business-list/business-list.component';
import { BusinessService } from './service/business.service';



@NgModule({
  declarations: [
    BusinessListComponent
  ],
  imports: [
    BusinessRoutingModule,
    CommonModule,
    LayoutModule
  ],
  providers: [
    BusinessService
  ]
})
export class BusinessModule { }
