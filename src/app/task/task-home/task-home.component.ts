import { Component, OnInit, HostBinding,ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewTaskComponent } from '../new-task/new-task.component';
import { CopyTaskComponent } from '../copy-task/copy-task.component';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { NewTaskListComponent } from '../new-task-list/new-task-list.component';
import{slideToRight} from '../../anims/router.anim'

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations :[
    slideToRight
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskHomeComponent implements OnInit {


  @HostBinding('@routeAnim') state;

  lists=[
    {
      id:1,
      name: 'To do',
      tasks :[
        {
          id:1,
          desc: 'Task1: buy a coffee',
          completed: true, 
          priority: 3,
          owner:{
            id:1,
            name: 'Eric',
            avatar:'avatars:svg-11',
          },
          dueDate: new Date(),
          reminder: new Date()
        },
        {
          id:2,
          desc: 'Task2: finish homework',
          completed: false, 
          priority: 2,
          owner:{
            id:1,
            name: 'Ray',
            avatar:'avatars:svg-12',
          },
          dueDate: new Date(),
        },

      ]
    },
    {
      id:2,
      name: 'Doing',
      tasks :[
        {
          id:1,
          desc: 'Task3: review code',
          completed: false, 
          priority: 1,
          owner:{
            id:1,
            name: 'Lisa',
            avatar:'avatars:svg-13',
          },
          dueDate: new Date(),
        },
        {
          id:2,
          desc: 'Task4: make a plan',
          completed: false, 
          priority: 2,
          owner:{
            id:1,
            name: 'Ray',
            avatar:'avatars:svg-12',
          },
          dueDate: new Date(),
        },

      ]
    }

  ]
  constructor(private dialog: MatDialog, private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  launchNewTaskDialog(){
    const dialogRef = this.dialog.open(NewTaskComponent, {data: {title: 'new task: '}});
  }
  
  launchCopyTaskDialog(){
    const dialogRef = this.dialog.open(CopyTaskComponent,{data : {lists: this.lists}});
  }
  
  launchUpdateTaskDialog(task){
    const dialogRef = this.dialog.open(NewTaskComponent, {data: {title: 'edit task ', task:task}});
  }

  launchConfirmDialog(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{data:{title: 'delete task list: ', content: 'Delete this list?'}});
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  launchEditListDialog(){
    const dialogRef = this.dialog.open(NewTaskListComponent,{data:{title: 'edit list name: '}});
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  launchNewListDialog(){
    const dialogRef = this.dialog.open(NewTaskListComponent,{data:{title: 'new task list : '}});
    dialogRef.afterClosed().subscribe(result => console.log(result));

  }
}
