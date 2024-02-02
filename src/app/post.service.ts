import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface Config {
    name?: string;
    actor?: string;

 }
@Injectable({
    providedIn: 'root'
})

export class PostService {
    private getUrl = 'http://localhost:8080/api/movies'


    constructor(private http: HttpClient) {}
    getPosts(){
        return this.http.get<Config>(this.getUrl)
    }
}