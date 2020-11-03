import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
@Injectable({ providedIn: 'root' })


export class MovieService{
    private readonly endpoint = `${environment.baseUrl}`

    constructor (private http: HttpClient){
        
    }
    GetAll() {
        return this.http.get<IMovie>(this.endpoint + 'movie/top_rated?api_key=4c3b1bd81671bf575e375011b0aaad11' );
    }
    GetMovies (text: string) {
        return this.http.get<IMovie>(this.endpoint + "search/movie?api_key=4c3b1bd81671bf575e375011b0aaad11&query=" + text);
    }
    GetById (id: number){
        return this.http.get<IMovie>(this.endpoint + "movie/"+id+"?api_key=4c3b1bd81671bf575e375011b0aaad11");
    }
    GetMovieVideo(id: number){

        return this.http.get<IMovie>(this.endpoint + "movie/" + id +  " /videos?api_key=4c3b1bd81671bf575e375011b0aaad11");
    }

}
 interface IMovie{
  
    results: MovieResults[];
    poster_path: string
    original_title: string;
    overview: string;
    key: string;
}

class MovieResults {
    poster_path: string
    title: string;
    release_date: string;
    id : number;
    key: string;
    type: string;

}
export class Movie{
    poster_path: string
    original_title: string;
    overview: string;
    constructor(poster_path: string, title: string, overview: string){
        this.poster_path = poster_path
        this.original_title = title;
        this.overview = overview

    }
}
export class Movies{
    poster_path: string;
    title: string;
    id: number;

    constructor(poster_path: string, title: string, id: number){
        this.poster_path = poster_path
        this.title = title;
        this.id = id

    }
   //title: string;
}