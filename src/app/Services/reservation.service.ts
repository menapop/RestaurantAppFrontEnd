import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OutputReservationDto } from '../Models/OutputReservationDto';
import { baseUrl,ReserveUrl,ReservationsUrl } from './ApiUrl';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  constructor(private httpClient: HttpClient) { }

  reserve(data:any):Observable<boolean>
  {
     return this.httpClient.post<boolean>(baseUrl+ReserveUrl,data);
  }

  getAllReservations():Observable<OutputReservationDto[]>
  {
    return this.httpClient.get<OutputReservationDto[]>(baseUrl+ReservationsUrl);
  }

}
