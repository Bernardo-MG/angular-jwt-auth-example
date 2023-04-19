import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationModule } from '@app/shared/navigation/navigation.module';
import { CenteredLayoutComponent } from './containers/centered-layout/centered-layout.component';
import { HeaderLayoutComponent } from './containers/header-layout/header-layout.component';



@NgModule({
  declarations: [
    CenteredLayoutComponent,
    HeaderLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NavigationModule
  ],
  exports: [
    CenteredLayoutComponent,
    HeaderLayoutComponent
  ]
})
export class ViewsModule { }
