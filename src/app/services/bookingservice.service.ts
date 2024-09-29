import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingserviceService {

  constructor( private http1:HttpClient) { }

  apiUrl = "https://project-k-backend.vercel.app/api/bookings";

  postBookingData(i:any){
    return this.http1.post(this.apiUrl,i)
  }
}
