import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface Config {
    name?: string;
    author?: string;

 }
@Injectable({
    providedIn: 'root'
})

export class PostService {
    private getUrl = 'http://localhost:8083/api/books'


    constructor(private http: HttpClient) {}
    getPosts(){
        return this.http.get<Config>(this.getUrl)
    }
}