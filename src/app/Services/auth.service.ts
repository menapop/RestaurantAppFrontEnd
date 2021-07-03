import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";
import { Observable, Subject } from 'rxjs';
import { CreateUserDto } from '../Models/CreateUserDto';
import { InputRefreshTokenDto } from '../Models/InputRefreshTokenDto';
import { InputSignInUserDto } from '../Models/InputSignInUserDto';
import { OutputRefreshTokenDto } from '../Models/OutputRefreshTokenDto';
import { OutputSignInUserDto } from '../Models/OutputSignInUserDto';
export const TOKEN_NAME = 'token';
export const REFRESH_TOKEN_NAME = 'refreshToken';
import {baseUrl,LoginUrl, TokenUrl,UserRegisterUrl} from '../Services/ApiUrl';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  loggedIn = new Subject<boolean>();


  isLogin(): boolean {
    if (this.getToken() && !this.isTokenExpired(this.getToken())) {

      return true;
    } else {
      return false;
    }
  }
  getToken(): string {
    return localStorage.getItem(TOKEN_NAME)??'';
  }

  setToken(token: string ): void {
    localStorage.setItem(TOKEN_NAME, token);
  }
  getRefreshToken(): string {
    return localStorage.getItem(REFRESH_TOKEN_NAME)??'';
  }

  setRefreshToken(refreshToken: string): void {
    localStorage.setItem(REFRESH_TOKEN_NAME, refreshToken);
  }

  getTokenExpirationDate(token: string): Date | null{
    const decoded :any  = jwt_decode(token);

    if (decoded.exp === undefined) {
        return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }
  getRoleId() {
    const decoded :any = jwt_decode(this.getToken());

    if (decoded.Roles === undefined) {
      return null;
    }

    return decoded.Roles.split(',');
  }
  getUserId()
  {
    const decoded :any = jwt_decode(this.getToken());

    if (decoded.sub === undefined) {
      return null;
    }

    return decoded.sub;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      token = this.getToken();
    }
    if (!token) {
      return true;
    }

    const date :any= this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf());
  }

  login(inputSignInUserDto: InputSignInUserDto): Promise<boolean> {

    return this.httpClient.post<OutputSignInUserDto>(baseUrl+LoginUrl,inputSignInUserDto)
      .toPromise()
      .then(
        (value) => {
          if(value==null)
          {
            return false;
          }
           else{

            this.setToken(value.token??'');
            this.setRefreshToken(value.refreshToken??'');
            this.refreshToken(value.token??'', value.refreshToken??'');
            this.loggedIn.next(true);
            return true;
           }


        },
        (error) => {
          return false;
        }
      );
  }


  Register(createUserDto: CreateUserDto): Promise<boolean> {
    return this.httpClient.post<OutputSignInUserDto>(baseUrl+UserRegisterUrl,createUserDto)
      .toPromise()
      .then(
        (value) => {
          if(value==null)
          {
            return false;
          }
       else{

        this.setToken(value.token??'');
        this.setRefreshToken(value.refreshToken??'');
        this.refreshToken(value.token??'', value.refreshToken??'');
        this.loggedIn.next(true);
         return true;
       }

        },
        (error) => {
          return false;
        }
      );
  }

  refreshToken(token:string, refreshToken:string) {
    const millisTill10 = new Date(this.getTokenExpirationDate(token)??'').getTime() - new Date().getTime();

    const time = setTimeout(() => {
      this.httpClient.post<OutputRefreshTokenDto>(baseUrl+TokenUrl,{token,refreshToken} as InputRefreshTokenDto)
        .subscribe(
          (value) => {
            this.setRefreshToken(value.refreshToken??'');
            this.setToken(value.token??'');
            this.setRefreshToken(value.refreshToken??'');
            this.refreshToken(value.token??'', value.refreshToken??'');
          },
          (error) => {
            clearTimeout(time);
          }
        );
    }, millisTill10);
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.loggedIn.next(false);
  }
}
