import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  readonly apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  submitComment(commentData: any){
    this.http.post(`${this.apiBaseUrl}/api/comments`, commentData).subscribe(
      (response) => console.log("Response",response),
      (error) => console.log(error)
    );
  }
}
