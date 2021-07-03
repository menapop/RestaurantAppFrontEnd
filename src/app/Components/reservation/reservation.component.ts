import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FoodType } from 'src/app/Models/FoodType';
import { Table } from 'src/app/Models/Table';
import { CreateReservationDto } from 'src/app/Models/CreateReservationDto';
import { LookupService } from 'src/app/Services/lookup.service';
import { ReservationService } from 'src/app/Services/reservation.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  form !: FormGroup;
  tables:Table[]=[];
  foodTypes!:FoodType[];
  constructor(private fb :FormBuilder, private reservationService :ReservationService,
    private router : Router,private lookupService:LookupService,private authService:AuthService) { }

  ngOnInit(): void {
    this.createForm();
    this.getTables();
    this.getFoodTypes();

  }

getTables()
{
  this.lookupService.getTables().subscribe(res=>{
    this.tables=res;
    console.log(this.tables)
  })
}

getFoodTypes()
{
  this.lookupService.getFoodTypes().subscribe(res=>{
    this.foodTypes=res;
    console.log(this.foodTypes)
  })
}

  createForm(){
    this.form = this.fb.group({
      tableId:['', Validators.required],
      numberOfpeoples:[0, Validators.required],
      notes: [''],
      reservationFoods:new FormArray([
        this.AddReservationFoodFormGroup()
       ])
    });
  }

  AddReservationFoodFormGroup():FormGroup
  {
     return  this.fb.group(
      {
        foodTypeId:new FormControl('',[Validators.required]),
        quantity:new FormControl(0,[Validators.required]),
      });
  }

  public get foods(): FormArray
  {

      return this.form.get('reservationFoods') as FormArray;


  }

  addFood(){
    this.foods.push(this.AddReservationFoodFormGroup());
  }
  deletefood(i:number)
  {
    this.foods.removeAt(i);
  }

  Reserve(){

    let CreateReservationDto : CreateReservationDto =
    {
       tableId:+this.form.value.tableId,
       notes:this.form.value.notes,
       numberOfpeoples:+this.form.value.numberOfpeoples,
       userId:+this.authService.getUserId(),
       reservationFoods:this.form.value.reservationFoods.map((f:any)=>(
         {
        foodTypeId:+f.foodTypeId,
        quantity:+f.quantity
         })
       )

    } as CreateReservationDto
    console.log(CreateReservationDto)
    this.reservationService.reserve(CreateReservationDto).subscribe(res=>{
      if(res){
        alert("Reservation Success");
        this.form.reset();

      }
      else{
        alert("Reservation Error");
      }
    })
  }
}
