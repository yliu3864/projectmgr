import { Injectable, Inject } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/Rx';
import { User, Auth } from '../domain';
import { Observable, throwError } from 'rxjs';
import {mergeMap, count, switchMap,map} from 'rxjs/operators'


@Injectable()
export class AuthService {
    private readonly domain = 'users';
    private hearders = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    private token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
    '.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9' +
    '.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';

    constructor(private http: HttpClient,@Inject('BASE_CONFIG') private config){}

    register(user: User): Observable<Auth>{
        const params = new HttpParams().set('email',user.email);
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
        .get(uri,{params}).pipe(
          switchMap(res =>{
            if((<User[]>res).length >0){
                return throwError('username existed');
            }
            return this.http
                .post(uri,JSON.stringify(user),{
                    headers: this.hearders
                })
                .pipe(map(r=>({token:this.token,user:<User>r })));
          })
        );
    }

    login(email: string,password: string):Observable<Auth>{
        const uri = `${this.config.uri}/${this.domain}`;
        const params = new HttpParams()
            .set('email', email)
            .set('password',password);
        return this.http.get(uri,{params}).pipe(
            map(res => {
                const users = <User[]> res;
                if(users.length === 0){
                    throw new Error('Username or password incorrect');
                }
                return {
                    token: this.token,
                    user: users[0],
                }
            })
        )
    }


}