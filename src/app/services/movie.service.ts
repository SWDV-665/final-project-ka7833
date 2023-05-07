import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResult } from '../interfaces/ApiResult';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient ) { }

  getTopRatedMovies(page = 1): Observable<ApiResult> {
    return this.http.get<ApiResult>(`${environment.baseUrl}/movie/popular?api_key=${environment.apiKey}&page=${page}`);
    };

  getMovieDetails(movieId: string) {
    return this.http.get(`${environment.baseUrl}/movie/${movieId}?api_key=${environment.apiKey}`)
  }
}
