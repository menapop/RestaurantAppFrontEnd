import { ReservationFoodDto } from "./ReservationFoodDto";

export class CreateReservationDto {
    tableId?:number;
    numberOfpeoples?:number;
    notes ?:string;
    userId!:number;
    reservationFoods?:ReservationFoodDto[]
}
