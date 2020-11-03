import { IfStmt } from '@angular/compiler';
import { AfterContentChecked, AfterViewInit, Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {Shows, ShowService} from 'src/app/api-services/show-service'
@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.css']
})
export class TvShowsComponent implements OnInit {
  shows : Shows[] = [];
  con = true;
  timeout : any;
  searchText = "";
  constructor( private showService: ShowService, private route: ActivatedRoute, private router : Router) { }

  ngOnInit() {
    if(this.route.snapshot.params['text']){
      this.searchText = this.route.snapshot.params['text']
      if(this.searchText.length > 2){
       this.getShows(this.searchText);
        return;
      }
   }
    this.getShows();

    
  }
  GetDetails(id: number){
    sessionStorage.setItem('searchText', this.searchText);
    this.router.navigate(['show/' + id])
    
  }
  GetMovies(){
      if(this.searchText != ""){
          this.router.navigate(['movie/' + this.searchText + '/search'])
      }
      else{
        this.router.navigate(['movie'])
      }

  }
  onChange(text: string){
    if(text.length  < 3 ){
      this.searchText = text;
      this.con = false;
      this.getShows();
    }
    else{
      this.con = true;
      clearTimeout(this.timeout)
      this.timeout = setTimeout(()=>{
        this.getShows(text)
      }, 1000)
      this.searchText = text;
    }
}
  getShows(text? : string){

  
    this.shows = [];
    if(text != null && this.con){
      this.showService.GetShow(text).subscribe(s=>{
      
        s.results.forEach(i=>{
          if(i.poster_path != null) {
            i.poster_path = "https://image.tmdb.org/t/p/w500" + i.poster_path
    
          }
          else{
            i.poster_path = "https://i.ibb.co/8PLRbbS/no-image.png"
           
          }
              this.shows.push(new Shows(i.poster_path, i.name, i.id, i.overview))
          })
      
      })
    }
    else{

      this.showService.GetAll().subscribe(s=>{
       
        for(var i = 0; i < 10; i++){
          s.results[i].poster_path =  "https://image.tmdb.org/t/p/w500" + s.results[i].poster_path;
            this.shows.push(new Shows(s.results[i].poster_path,s.results[i].name, s.results[i].id, s.results[i].overview))
        }
    })
    }
    
  }
}
