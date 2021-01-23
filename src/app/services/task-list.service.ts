import { Injectable, Inject } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/Rx';
import { TaskList,Project,Task } from '../domain';
import { Observable,concat } from 'rxjs';
import {mergeMap, reduce, switchMap,map, mapTo} from 'rxjs/operators'

@Injectable()
export class TaskListService {
    private readonly domain = 'task';
    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
    })
    constructor(private http: HttpClient,@Inject('BASE_CONFIG') private config){}

    add(taskList: TaskList):Observable<TaskList>{
      
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
        .post<TaskList>(uri,JSON.stringify(taskList),{
            headers: this.headers
        });
    }

    update(taskList: TaskList):Observable<TaskList>{
        const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
        const toUpdate = {
            name: taskList.name,
        }
        return this.http
        .patch<TaskList>(uri,JSON.stringify(taskList),{
            headers: this.headers
        });
    }

    del(taskList: TaskList):Observable<TaskList>{
        const uri = `${this.config.uri}/tasklists/${taskList.id}`;
        return this.http.delete(uri)
        .pipe(mapTo(taskList));
        
    };
    

    
    get(projectId: string):Observable<TaskList[]>{
      
        const uri = `${this.config.uri}/${this.domain}`;
        const params = new HttpParams().set('members_like', projectId);
        return this.http.get<TaskList[]>(uri,{
            params: params,
            headers: this.headers
        });
        
    }

    swapOrder(src: TaskList, target: TaskList): Observable<TaskList[]>{
        const dragUri = `${this.config.uri}/${this.domain}/${src.id}`;
        const dropUri = `${this.config.uri}/${this.domain}/${target.id}`;
        const drag$ = this.http.patch<TaskList>(dragUri,JSON.stringify({order: target.order}),
        { headers : this.headers}
        );
        const drop$ = this.http.patch<TaskList>(dropUri,JSON.stringify({order: src.order}),
        {headers: this.headers}
        );

        return concat(drag$,drop$).pipe(
            reduce((r: TaskList[], x: TaskList) => [...r,x],[])
        );
        }


}