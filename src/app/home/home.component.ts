import { Component, OnInit } from '@angular/core';
import {MovieService} from '../services/movie.service'
import {Root , Result } from '../models/movie'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  popularMovies : any[] = [];
  topRatedMovies : any[] = [];
  nowPlaying : any[] = [];
  upcoming : any[] = [];


  constructor(private movie : MovieService) { }

  ngOnInit(): void {

    this.movie.getPopularMovies()
      .subscribe((response : any) => {


        // console.log(response.results)
        this.popularMovies = response.results

      }, (error) => {

      })

    this.movie.getTopRatedMovies()
      .subscribe((response : any) => {


        // console.log(response.results)
        this.topRatedMovies = response.results

      }, (error) => {

      })

    this.movie.getNowPlaying()
      .subscribe((response : any) => {
        this.nowPlaying = response.results
      })

      this.movie.getUpcoming()
        .subscribe((response : any) => {
          this.upcoming = response.results;
        })
  }

  goToMovie(movie : string) {
    // console.log(movie)
  }

}
