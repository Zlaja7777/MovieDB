import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from 'src/app/movies/movies.component';
import { TvShowsComponent } from 'src/app/tv-shows/tv-shows.component';

import { MovieDetailsComponent } from 'src/app/movies/movie-details/movie-details.component';
import { TvShowDetailsComponent } from 'src/app/tv-shows/tv-show-details/tv-show-details.component';
import { SafePipeModule } from 'safe-pipe';
import { SafePipe } from 'safe-pipe/lib/safe-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    TvShowsComponent,
    MovieDetailsComponent,
    TvShowDetailsComponent,

 ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'movie', component: MoviesComponent},
      {path: 'shows', component: TvShowsComponent}, 
      {path: 'movie/:text/search', component: MoviesComponent}, 
      {path: 'shows/:text/search', component: TvShowsComponent}, 
      {path: 'show/:id', component: TvShowDetailsComponent}, 
      {path: 'movie/:id', component: MovieDetailsComponent}, 


    ]),


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
