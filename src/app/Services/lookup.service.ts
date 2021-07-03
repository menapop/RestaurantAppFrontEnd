import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FoodType } from '../Models/FoodType';
import { Table } from '../Models/Table';
import {baseUrl,TablesUrl,FoodTypesUrl} from '../Services/ApiUrl';
@Injectable({
  providedIn: 'root'
})
export class LookupService {

  constructor(private httpClient: HttpClient) { }

  getTables():Observable<Table[]>
  {
     return this.httpClient.get<Table[]>(baseUrl+TablesUrl);
  }

  getFoodTypes():Observable<FoodType[]>
  {
     return this.httpClient.get<FoodType[]>(baseUrl+FoodTypesUrl);
  }
}
