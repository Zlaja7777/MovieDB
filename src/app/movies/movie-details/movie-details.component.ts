import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie, Movies, MovieService } from 'src/app/api-services/movie-service';
import { DomSanitizer} from '@angular/platform-browser';
import {MovieModel} from 'src/app/shared/movie-model';
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movieId : number;
  movie : MovieModel = new MovieModel();
  search = "";
  videoExists= false;
  url = "https://www.youtube.com/embed/"
  key :string

  constructor(private movieService: MovieService, private route : ActivatedRoute, private router: Router, private sanitizer: DomSanitizer ) { 

  }

  ngOnInit(): void {  

    this.movieId = this.route.snapshot.params['id'];
     this.GetMovieDetails(this.movieId)
   
  }
  GetMovieDetails(id: number){

    this.movieService.GetById(id).subscribe(s=>{
      if(s.poster_path != null) {
             s.poster_path = "https://image.tmdb.org/t/p/w500" + s.poster_path
           }
           else{
             s.poster_path = "https://i.ibb.co/8PLRbbS/no-image.png"
          }
        
          this.movie.setMovieData(s.poster_path, s.overview, s.original_title);

    })
    this.movieService.GetMovieVideo(id).subscribe(v=>{
     if(v.results.length > 0){
        for(var i = 0; i<= v.results.length; i++){
          if(v.results[i].key != undefined ){
            this.url+=v.results[i].key;
            this.videoExists = true;
            break;
          }
        }
      }
  })
  }
  GetVideo(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.url)
  }
  Back(){
    this.search = sessionStorage.getItem("searchText") ;
    if(this.search == ""){
      this.router.navigate(['/movie'])
    }
    else{
      this.search = sessionStorage.getItem("searchText");
      sessionStorage.clear();
      this.router.navigate(['/movie/' +  this.search + "/search"])
    }
   
  }
  
}
