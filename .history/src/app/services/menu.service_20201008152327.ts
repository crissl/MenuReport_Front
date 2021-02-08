import { Response } from '@angular/http';
import {environment} from '../../environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders,HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";



const http = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Accept: "application/json"
  })
};
const API_URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  addData(sistema, add: String) {
    const sistemaAdd = JSON.stringify(sistema);
    return this.http.post(API_URL + add, sistemaAdd, http).pipe(
      map(
        (res: any) => {
          return res;
        },
        error => {
          console.log('Error: ', error);
        }
      )
    );
  }
 UpData(sistema, update: String) {
    const sistemaUp = JSON.stringify(sistema);
    return this.http.put(API_URL + update, sistemaUp, http).pipe(
      map(
        (res: any) => {
          return res;
        },
        error => {
          console.log('Error: ', error);
        }
      )
    );
  }
  findData(data: number) {
    return this.http.get(API_URL + data, http).pipe(
      map(
        (res: any) => {
          return res;
        },
        error => {
          console.log('Error: ', error);
        }
      )
    );
  }

  get(url: string): Observable<any> {
    return this.http.get(API_URL + url)
    .map(res => res );  }

  findDataById(url: string, data: number) {
    return this.http.get(API_URL+ url + data, http).pipe(
      map(
        (res: any) => {
          return res;
        },
        error => {
          console.log('Error: ', error);
        }
      )
    );
  }
  findDataByCampus(url: string, campus: string, slash:string, dia: string) {
    return this.http.get(API_URL+ url + campus + slash + dia, http).pipe(
      map(
        (res: any) => {
          return res;
        },
        error => {
          console.log('Error: ', error);
        }
      )
    );
  }
  findDataByHorarioReforzamiento(url: string, campus: string, slash:string, dia: string, slash1:string, hora_INICIO: string, slash2:string, hora_FIN: string) {
    return this.http.get(API_URL+ url + campus + slash + dia + slash1 + hora_INICIO + slash2 + hora_FIN, http).pipe(
      map(
        (res: any) => {
          return res;
        },
        error => {
          console.log('Error: ', error);
        }
      )
    );
  }
  findData1(url: String) {
    return this.http.get(API_URL + url, http).pipe(
      map(
        (res: any) => {
          return res;
        },
        error => {
          console.log('Error: ', error);
        }
      )
    );
  }

  getData(url: String): Observable<any> {
    return this.http.get(API_URL + url)
    .map(res => res );  }


  get1(url: string): Observable<any> {
    return this.http.get(API_URL + url)
    .map(res => res );  }



}
