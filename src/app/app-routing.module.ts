import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { ReservationListComponent } from './Components/reservation-list/reservation-list.component';
import { ReservationComponent } from './Components/reservation/reservation.component';
import { AdminGuard } from './Guards/admin.guard';
import { UserGuard } from './Guards/user.guard';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'Login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'reserve',component:ReservationComponent,canActivate:[UserGuard]},
  {path:'reservations',component:ReservationListComponent,canActivate:[AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
