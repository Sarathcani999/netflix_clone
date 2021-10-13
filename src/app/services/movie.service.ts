import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { environment } from '../../environments/environment'


export interface Tv {
  backdrop_path: string;
  created_by: any[];
  episode_run_time: number[];
  first_air_date: string;
  genres: any[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: any;
  name: string;
  networks: any[];
  next_episode_to_air: any;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: any[];
  production_countries: any[];
  seasons: any[];
  spoken_languages: any[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: any;
  budget: number;
  genres: any[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: any[];
  production_countries: any[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: any[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private API_KEY = environment.tmdbAPIKey; 

  constructor(private http : HttpClient) { }

  getPopularMovies() {
    return this.http.get(`https://api.themoviedb.org/3/movie/popular?api_key=${this.API_KEY}&language=en-US&page=1`)
  
  }

  getTopRatedMovies() {
    return this.http.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${this.API_KEY}&language=en-US&page=1`)
  
  }




  getMovie(id : string) {
    return this.http.get<Movie>(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.API_KEY}&language=en-US`)
  }

  getTv(id : string) {
    // return this.http.get<Movie>(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.API_KEY}&language=en-US`)
    return this.http.get<Tv>(`https://api.themoviedb.org/3/tv/${id}?api_key=${this.API_KEY}&language=en-US`)

  }

  getNowPlaying() {
    // https://api.themoviedb.org/3/movie/now_playing?api_key=<<api_key>>&language=en-US&page=1
    return this.http.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${this.API_KEY}&language=en-US&page=1`)

  }

  getUpcoming() {

    return this.http.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${this.API_KEY}&language=en-US&page=1`)

  }
}
