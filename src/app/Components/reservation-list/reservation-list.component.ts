import { Component, OnInit } from '@angular/core';
import { OutputReservationDto } from 'src/app/Models/OutputReservationDto';
import { ReservationService } from 'src/app/Services/reservation.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent implements OnInit {

 reservations:OutputReservationDto[]=[]

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.getAllReservation();
  }

  getAllReservation(){
    this.reservationService.getAllReservations().subscribe(res=>{
      this.reservations=res;
      console.log(res)
    })
  }

}
