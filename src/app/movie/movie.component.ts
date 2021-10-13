import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MovieService,Movie} from '../services/movie.service';

  

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {


  movieDetails !: Movie ;
  movieName : string = "";
  imagePath : string = "";
  desc : string = "" ;
  votes !: number ;
  lang : string = "";  

  popularMovies : any[] = [];

  movieId : string = "";
 
  constructor(private route : ActivatedRoute , private movie : MovieService ) { }


  ngOnInit(): void {

    this.movieId = this.route.snapshot.params["id"]

    this.movie.getPopularMovies()
      .subscribe((response : any) => {


        // console.log(response.results)
        this.popularMovies = response.results

      }, (error) => {

      })

    this.movie.getMovie(this.movieId)
      .subscribe(response => {

        // console.log(response)

        this.movieName = response.title;
        this.imagePath = response.backdrop_path;
        this.desc = response.overview;
        this.votes = response.vote_count;
        this.lang = response.original_language;
      })

  }



}
