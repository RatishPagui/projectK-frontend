import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewserviceService {

  constructor( private http1:HttpClient) { }

  apiUrl = "http://localhost:5000/api/reviews";
  getReviewdata() {
    return this.http1.get(this.apiUrl)
  }

  postReviewsData(i:any){
    return this.http1.post(this.apiUrl,i)
  }
}
