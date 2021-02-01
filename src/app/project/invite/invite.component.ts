import { Component, OnInit,ChangeDetectionStrategy, Inject } from '@angular/core';
import { User } from 'src/app/domain';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InviteComponent implements OnInit {

  // items=[
  //   {
  //     id:1,
  //     name: 'Eric',
  //   },
  //   {
  //     id:2,
  //     name: 'Ray',
  //   },
  //   {
  //     id:3,
  //     name: 'Lisa',
  //   },
  // ];
  members: User[] = []
  constructor(@Inject(MAT_DIALOG_DATA) private data, 
    private dialogRef: MatDialogRef<InviteComponent>) { }

  ngOnInit() {
    this.members = [...this.data.members]
  }

  // displayUser(user: {id:string; name:string}){
  //   return user ? user.name : '';
  // }

 onSubmit(ev:Event, {valid,value}){
   ev.preventDefault();
   if(!valid){
     return;
   }
   this.dialogRef.close(this.members)
 }
}
