import { Component, OnInit } from '@angular/core';


import {ActivatedRoute} from '@angular/router';
import {MovieService,Movie} from '../../services/movie.service';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css']
})
export class TvComponent implements OnInit {
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

    this.movie.getTv(this.movieId)
      .subscribe(response => {

        // console.log(response)

        this.movieName = response.name;
        this.imagePath = response.backdrop_path;
        this.desc = response.overview;
        this.votes = response.vote_count;
        this.lang = response.original_language;
      })

  }




}
