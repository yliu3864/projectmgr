import { Injectable, Inject } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/Rx';
import { Task,TaskList } from '../domain';
import { Observable, from, merge } from 'rxjs';
import {mergeMap, reduce, switchMap,mapTo} from 'rxjs/operators'

@Injectable()
export class TaskService {
    private readonly domain = 'tasks';
    private hearders = new HttpHeaders({
        'Content-Type': 'application/json'
    })
    constructor(private http: HttpClient,@Inject('BASE_CONFIG') private config){}

    add(task: Task):Observable<Task>{
      
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
        .post<Task>(uri,JSON.stringify(task),{
            headers: this.hearders
        });
    }

    update(task: Task):Observable<Task>{
        const uri = `${this.config.uri}/${this.domain}/${task.id}`;
        const toUpdate = {
            desc: task.desc,
            priority: task.priority,
            duedate: task.dueDate,
            reminder: task.reminder,
            ownerId: task.ownerId,
            participantIds: task.participantIds,
            remark: task.remark,
        }
        return this.http
        .patch<Task>(uri,JSON.stringify(task),{
            headers: this.hearders
        });
    }

    del(task: Task):Observable<Task>{
        const uri = `${this.config.uri}/taskLists/${task.id}`;
        return this.http.delete(uri).pipe(mapTo(task));
    };
    
    get(taskListId: string):Observable<Task[]>{
      
        const uri = `${this.config.uri}/${this.domain}`;
        const params = new HttpParams().set('taskListId', taskListId);
        return this.http.get<Task[]>(uri,{ params});
    }

    getByList(lists: TaskList[]): Observable<Task[]>{
        return Observable.from(lists)
        .mergeMap(list => this.get(list.id))
        .reduce((tasks: Task[], t:Task[]) => [...tasks,...t],[]);
    }

    complete(task: Task):Observable<Task>{
        const uri = `${this.config.uri}/${this.domain}/${task.id}`;

        return this.http
        .patch<Task>(uri,JSON.stringify({completed: !task.completed}),{
            headers: this.hearders
        });
    }

    move(taskId: string,taskListId: string):Observable<Task>{
        const uri = `${this.config.uri}/${this.domain}/${taskId}`;

        return this.http
        .patch<Task>(uri,JSON.stringify({taskListId:taskListId}),
        {
            headers: this.hearders
        });
    }

    moveAll(srcListId: string,targetListId: string):Observable<Task[]>{
        return this.get(srcListId).pipe(
            mergeMap((tasks: Task[]) => from(tasks)),
            mergeMap((task: Task)=> this.move(<string>task.id,targetListId)),
            reduce((arrTasks: Task[],t:Task) =>{
                return [...arrTasks,t];
            },[])
        );
        
    }

}