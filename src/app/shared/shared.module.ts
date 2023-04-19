import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutModule } from './layout/layout.module';
import { NavigationModule } from './navigation/navigation.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NavigationModule,
    LayoutModule
  ],
  exports: [
    CommonModule,
    NavigationModule,
    LayoutModule
  ]
})
export class SharedModule { }
