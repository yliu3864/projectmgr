import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Quote } from '../domain/quote.model';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';


@Injectable()
export class QuoteService {
    constructor(private http: HttpClient,@Inject('BASE_CONFIG') private config){}

    getQuote(): Observable<Quote>{
        const uri = `${this.config.url}/quotes/${Math.floor(Math.random()*10)}`;
        return this.http.get(uri)
        .map(res => res as Quote);
    }

}