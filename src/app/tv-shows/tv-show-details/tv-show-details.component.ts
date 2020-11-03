import { Component, OnInit, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
import { Movie } from 'src/app/api-services/movie-service';
import {ShowService} from 'src/app/api-services/show-service';
import {ShowModel} from 'src/app/shared/show-model'
@Component({
  selector: 'app-tv-show-details',
  templateUrl: './tv-show-details.component.html',
  styleUrls: ['./tv-show-details.component.css']
})
export class TvShowDetailsComponent implements OnInit {

  constructor(private showService : ShowService, private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer) { }

  showId : number;
  search: string;
  videoExists = false;
  show : ShowModel = new ShowModel();
  url = "https://www.youtube.com/embed/"
  ngOnInit(): void {
    this.showId = this.route.snapshot.params['id'];

     this.GetShowDetails(this.showId)
  }
  GetShowDetails(id: number){

    this.showService.GetById(id).subscribe(s=>{
      if(s.poster_path != null) {
             s.poster_path = "https://image.tmdb.org/t/p/w500" + s.poster_path
           }
           else{
             s.poster_path = "https://i.ibb.co/8PLRbbS/no-image.png"
      }
      this.show.setShowData(s.poster_path, s.overview, s.name);
      
    })
    this.showService.GetShowVideo(id).subscribe(v=>{
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
      this.router.navigate(['/shows'])
    }
    else{
      sessionStorage.clear();
      this.router.navigate(['/shows/' +  this.search + "/search"])
    }
   
  }
}
