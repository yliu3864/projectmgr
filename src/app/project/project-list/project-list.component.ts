import { Component, OnInit, HostBinding, ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import{ NewProjectComponent} from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import{slideToRight} from '../../anims/router.anim'
import{listAnimation} from '../../anims/list.anim'
import { ServicesModule } from 'src/app/services/services.module';
import * as _ from 'lodash';
import { range, Observable } from 'rxjs';
import { reduce,map } from 'rxjs/operators';
import { Project } from 'src/app/domain';


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
  constructor(private dialog:MatDialog, private cd: ChangeDetectorRef, private service: ServicesModule ) { }

  ngOnInit() {
    // this.service$.get("1").subscribe(this.projects => {
    //   this.projects = this.projects;
    //   this.cd.markForCheck();
    // }

    // )
  }

  openNewProjectDialog(){
    const img = `/assets/img/covers/${Math.floor(Math.random() * 40)}_tn.jpg`;
   
    const dialogRef = this.dialog.open(
      NewProjectComponent,
      {data:{thumbnails: this.getThumbnailsObs(), img: img}
    });
    dialogRef.afterClosed()
      .take(1)
      .map(val => ({...val, coverImg: this.buildImgSrc(val.coverImg)}))
      .subscribe(project => {
       
      this.projects = [...this.projects, project];
      this.cd.markForCheck();
      
    });

  }

  launchInviteDialog(){
    const dialogRef = this.dialog.open(InviteComponent);
  }

  launchUpdateDialog(project: Project){
    const dialogRef = this.dialog.open(
      NewProjectComponent,
      {data:{thumbnails: this.getThumbnailsObs(), project: project}
    });
    dialogRef.afterClosed()
      .take(1)
      .map(val => ({...val, id:project.id,coverImg: this.buildImgSrc(val.coverImg)}))
      .subscribe(project => {
      const index = this.projects.map(p => p.id).indexOf(project.id);
      this.projects = [...this.projects.slice(0, index), project, ...this.projects.slice(index +1)]  
      this.cd.markForCheck();
      
    });
  }

  launchConfirmDialog(project){
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{data:{title: 'delete project: ', content: 'Delete this project?'}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.projects = this.projects.filter(p => p.id !== project.id);
      this.cd.markForCheck();
    });
  }

  private getThumbnailsObs(){
    return _.range(0,40)
      .map(i => `/assets/img/covers/${i}_tn.jpg`);

    // return range(0, 40).pipe(
    //   map(i => `/assets/img/covers/${i}_tn.jpg`),
    //   reduce((r: string[], x:string) =>{
    //     return [...r,x];
    //   },[])
    // );
  }

  private buildImgSrc(img: string): string{
    return img.indexOf('_') > -1 ? img.split('_',1)[0] + '.jpg' : img;
  }
}

