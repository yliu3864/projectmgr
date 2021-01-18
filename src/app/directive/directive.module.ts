import { NgModule } from '@angular/core';

import { DragDirective } from './drap-drop/drag.directive';
import { DropDirective } from './drap-drop/drop.directive';
import { DragDropService } from './drag-drop.service';



@NgModule({
  declarations: [
    DragDirective, 
    DropDirective
  ],
  exports: [ 
    DragDirective, 
    DropDirective
  ],
  providers: [
    DragDropService
  ]
})
export class DirectiveModule { }
