import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconsModule } from '../icons/icons.module';
import { ArticleComponent } from './components/article/article.component';
import { WaitingWrapperComponent } from './components/waiting-wrapper/waiting-wrapper.component';



@NgModule({
  declarations: [
    ArticleComponent,
    WaitingWrapperComponent
  ],
  imports: [
    CommonModule,
    IconsModule
  ],
  exports: [
    ArticleComponent
  ]
})
export class LayoutModule { }
