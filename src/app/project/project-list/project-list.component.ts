import { Component, OnInit, HostBinding, ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import{ NewProjectComponent} from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import{slideToRight} from '../../anims/router.anim'
import{listAnimation} from '../../anims/list.anim'

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations :[
    slideToRight,
    listAnimation,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectListComponent implements OnInit {

  @HostBinding('@routeAnim') state;

  projects = [
    {
      "id": 1,
      "name" : "Project timeline",
      "desc" : "This is a company project",
      "coverImg" : "assets/img/covers/0.jpg",
    },
    {
      "id": 2,
      "name" : "QA project",
      "desc" : "This is a company project",
      "coverImg" : "assets/img/covers/1.jpg",
    },
  ];
  constructor(private dialog:MatDialog, private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  openNewProjectDialog(){
    const dialogRef = this.dialog.open(NewProjectComponent,{data:{title: 'new project: '}});
    dialogRef.afterClosed().subscribe(result => {
       console.log(result);
       this.projects = [...this.projects, 
        {id:3, name: 'a new project',desc: ' this is a new project',  "coverImg" : "assets/img/covers/8.jpg"},
        {id:4, name: 'another new project',desc: ' this is another new project',  "coverImg" : "assets/img/covers/9.jpg"}
      ];
      this.cd.markForCheck();
    });

  }

  launchInviteDialog(){
    const dialogRef = this.dialog.open(InviteComponent);
  }

  launchUpdateDialog(){
    const dialogRef = this.dialog.open(NewProjectComponent,{data:{title: 'edit project: ' }});
  }

  launchConfirmDialog(project){
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{data:{title: 'delete project: ', content: 'Delete this project?'}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.projects = this.projects.filter(p => p.id !== project.id);
      this.cd.markForCheck();
    });
  }
}

