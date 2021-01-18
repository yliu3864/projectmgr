import { Directive,HostListener, ElementRef, Renderer2, Input, Output,EventEmitter  } from '@angular/core';
import { DragDropService, DragData } from '../drag-drop.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Directive({
  selector: '[app-droppable][dropTags][dragEnterClass]'
})
export class DropDirective {

  @Output() dropped = new EventEmitter<DragData>();
  @Input() dragEnterClass: '';
  @Input() dropTags: string[] = [];
  
  private drag$: Observable<DragData | null>;

  constructor(
    private el: ElementRef, 
    private rd: Renderer2,
    private service : DragDropService,
    ) { 
      this.drag$ = this.service.getDragData().pipe(take(1));
    }
  
  @HostListener('dragenter', ['$event'])
  onDragEnter(ev: Event){
    ev.preventDefault();
    ev.stopPropagation();
    if(this.el.nativeElement === ev.target){
      this.drag$.subscribe(dragData =>{
        if(dragData&&this.dropTags.indexOf(dragData.tag) > -1){
          this.rd.addClass(this.el.nativeElement, this.dragEnterClass);
        }
      }

      )
   
    }
  }

  @HostListener('dragover', ['$event'])
  onDragOver(ev: Event){
    ev.preventDefault();
    ev.stopPropagation();
    if(this.el.nativeElement === ev.target){
      this.drag$.subscribe(dragData =>{
        if(dragData&&this.dropTags.indexOf(dragData.tag) > -1){
          this.rd.setProperty(ev,'dataTransfer.effectAllowed','all');
          this.rd.setProperty(ev,'dataTransfer.dropEffect','move' );
        }else{
          this.rd.setProperty(ev,'dataTransfer.effectAllowed','none');
          this.rd.setProperty(ev,'dataTransfer.dropEffect','none' );
        }
      }
      )
    }
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(ev: Event){
    if(this.el.nativeElement === ev.target){
      this.drag$.subscribe(dragData =>{
        if(dragData&&this.dropTags.indexOf(dragData.tag) > -1){
          this.rd.removeClass(this.el.nativeElement, this.dragEnterClass);
        }
      }
      )
    }
  }

  @HostListener('drop', ['$event'])
  onDrop(ev: Event){
    ev.preventDefault();
    ev.stopPropagation();
    if(this.el.nativeElement === ev.target){
      this.drag$.subscribe(dragData =>{
        if(dragData&&this.dropTags.indexOf(dragData.tag) > -1){
          this.rd.removeClass(this.el.nativeElement, this.dragEnterClass);
          this.dropped.emit(dragData);
          this.service.clearDragData();
        }
      });
    }
  }
}