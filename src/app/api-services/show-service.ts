import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
@Injectable({ providedIn: 'root' })


export class ShowService{
   
    private readonly endpoint = `${environment.baseUrl}`

    constructor (private http: HttpClient){
        
    }
    GetAll() {
        return this.http.get<IShow>(this.endpoint + `tv/top_rated?api_key=4c3b1bd81671bf575e375011b0aaad11`);
    }
    GetShow(text: string){
        return this.http.get<IShow>(this.endpoint + `search/tv?api_key=4c3b1bd81671bf575e375011b0aaad11&query=` + text)
    }
    GetById(id: number){
        return this.http.get<IShow>(this.endpoint + `tv/` + id + `?api_key=4c3b1bd81671bf575e375011b0aaad11`)
    }
    GetShowVideo(id: number) {
        return this.http.get<IShow>(this.endpoint + "tv/" + id +  " /videos?api_key=4c3b1bd81671bf575e375011b0aaad11");
    }
}
export interface IShow{
    results: Results[];
    poster_path: string
    name: string;
    overview: string;
    key: string;
    
}
class Results {
    poster_path: string
    name: string;
    id : number;
    overview: string;
    key: string;
}
export class Shows{
    poster_path: string;
    name: string;
    id : number;
    overview: string
    constructor(poster_path: string, name: string, id: number, overview: string){
        this.poster_path = poster_path
        this.name = name;
        this.id = id;
        this.overview = overview;
    }

}