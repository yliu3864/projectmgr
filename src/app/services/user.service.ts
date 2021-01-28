import { Injectable, Inject } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/Rx';
import { Project, User } from '../domain';
import { Observable, from } from 'rxjs';
import {mergeMap, count, switchMap,map, filter, reduce} from 'rxjs/operators'

@Injectable()
export class UserService {
    private readonly domain = 'users';
    private hearders = new HttpHeaders({
        'Content-Type': 'application/json'
    })
    constructor(private http: HttpClient,@Inject('BASE_CONFIG') private config){}

    searchUsers(filter: string) : Observable<User[]>{
        const uri = `${this.config.uri}/${this.domain}`;
        const params = new HttpParams().set('email_like', filter);
        return this.http.get<User[]>(uri,{
            params: params,
            headers: this.hearders
        });
    }

    getUsersByProject(projectId: string):Observable<User[]>{
      
        const uri = `${this.config.uri}/${this.domain}`;
        const params = new HttpParams().set('projectId', projectId);
        return this.http.get<User[]>(uri,{
            params: params,
            headers: this.hearders
        });
    
    }

    addProjectRef(user: User, projectId: string): Observable<User>{
        const uri = `${this.config.uri}/${this.domain}/${user.id}`;
        const projectIds = user.projectIds ? user.projectIds :[];
        return this.http
        .patch<User>(uri,JSON.stringify({ projectIds: [...projectIds, projectId]}),
        {
            headers: this.hearders
        });
    }

    removerProjectRef(user: User,projectId: string):Observable<User>{
        const uri = `${this.config.uri}/${this.domain}/${user.id}`;
        const projectIds = user.projectIds ? user.projectIds :[];
        const index = projectIds.indexOf(projectId);
        const toUpdate = [...projectIds.slice(0,index),...projectIds.slice(index + 1)]
        return this.http
        .patch<User>(uri,JSON.stringify({projectIds: toUpdate}),
        {
            headers: this.hearders
        }); 
    };

    batchUpdateProjectRef(project: Project):Observable<User[]>{
        const projectId = project.id;
        const memberIds = project.members ? project.members : [];
        return from(memberIds).pipe(
            switchMap( id => {
                const uri = `${this.config.uri}/${this.domain}/${id}`;
                return this.http.get(uri);
            }),
            filter(
                (user:User) =>
                user.projectIds ? user.projectIds.indexOf(projectId) <0 : false
            ),
        
        switchMap((u:User)=> this.addProjectRef(u, projectId)),
        reduce((users: User[], curr: User) => [...users, curr],[])
        );
    }
}