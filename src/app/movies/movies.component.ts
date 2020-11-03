import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnInit } from '@angular/core';

import {Movie, Movies, MovieService } from 'src/app/api-services/movie-service'
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies: Movies[]= []
  con = true;
  timeout: any;
  searchText = "";
  constructor(private movieService: MovieService, private route: ActivatedRoute, private router: Router) {
     
  }
  ngOnInit() {
    if(this.route.snapshot.params['text']){
       this.searchText = this.route.snapshot.params['text']
       if(this.searchText.length > 2){
        this.getMovies(this.searchText);
      //   sessionStorage.clear();
         return;
       }
    }
    
      this.getMovies()
  }
  GetDetails(id: number){
    sessionStorage.setItem('searchText', this.searchText);
    this.router.navigate(['movie/' + id])
    
  }
  onChange(text: string){
      if(text.length  < 3){
        this.searchText = text;
        this.con = false;
        this.getMovies();
      } 
      else{
        this.con = true;
        clearTimeout(this.timeout)
        this.timeout = setTimeout(()=>{
          this.getMovies(text)
        }, 1000)
        this.searchText = text;
 
      }
  }
  GetTvShows(){
    if(this.searchText != ""){
        this.router.navigate(['shows/' + this.searchText + '/search'])
    }
    else{
      this.router.navigate(['shows'])
    }
  }
  getMovies(text? : string){
   
    this.movies.splice(0, this.movies.length) // or this.movies = [];
    if(text != null && this.con){
        this.movieService.GetMovies(text).subscribe(s=>{

          s.results.forEach(i=>{
            if(i.poster_path != null) {
              i.poster_path = "https://image.tmdb.org/t/p/w500" + i.poster_path
            }
            else{
              i.poster_path = "https://i.ibb.co/8PLRbbS/no-image.png"
            }
           
                this.movies.push(new Movies(i.poster_path, i.title, i.id))
     
            })
          })
      }
      else{
        this.movieService.GetAll().subscribe(s=>{
          for(var i = 0; i < 10; i++){
            s.results[i].poster_path =  "https://image.tmdb.org/t/p/w500" + s.results[i].poster_path;
              this.movies.push(new Movies(s.results[i].poster_path,s.results[i].title, s.results[i].id))
          }
        })
      }
    
  }
}
