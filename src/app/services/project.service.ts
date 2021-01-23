import { Injectable, Inject } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/Rx';
import { Project } from '../domain';
import { Observable } from 'rxjs';
import {mergeMap, count, switchMap,map} from 'rxjs/operators'

@Injectable()
export class ProjectService {
    private readonly domain = 'projects';
    private hearders = new HttpHeaders({
        'Content-Type': 'application/json'
    })
    constructor(private http: HttpClient,@Inject('BASE_CONFIG') private config){}

    add(project: Project):Observable<Project>{
      
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
        .post<Project>(uri,JSON.stringify(project),{
            headers: this.hearders
        });
    }

    update(project: Project):Observable<Project>{
        const uri = `${this.config.uri}/${this.domain}/${project.id}`;
        const toUpdate = {
            name: project.name,
            desc: project.desc,
            coverImg: project.coverImg
        }
        return this.http
        .patch<Project>(uri,JSON.stringify(project),{
            headers: this.hearders
        });
    }

    del(project: Project):Observable<Project>{
        const delTasks$ = Observable.from(project.taskLists)
        .mergeMap(listId => this.http.delete(`${this.config.uri}/taskLists/${listId}`))
        .count();
        return delTasks$.pipe(
            switchMap(p => this.http.delete(`${this.config.uri}/${this.domain}/${project.id}`)
        .pipe(map(prj => project)))
        )
    };
    

    
    get(userId: string):Observable<Project[]>{
      
        const uri = `${this.config.uri}/${this.domain}`;
        const params = new HttpParams().set('members_like', userId);
        return this.http.get<Project[]>(uri,{
            params: params,
            headers: this.hearders
        });
    
    }

}