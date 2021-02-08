import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const URL = 'https://miespemovil.espe.edu.ec/reportes/reporteWs';

const API_URL = URL + '/usuarioByIdCard/';
const API_URL_COM = URL + '/usuarioFacturaByIdCard/';
const CED_URL = URL + '/cedulaById/';

@Injectable({
  providedIn: 'root'
})
export class PersonalDataService {

  constructor(private http: Http) { }
  getUsuario(id): Observable<any> {
    return this.http.get(API_URL + id)
      .map((res: Response) => res.json());
  }

  getCedula(id): Observable<any> {
    return this.http.get(CED_URL + id)
      .map((res: Response) => res.json());
  }

  getUsuarioCompleto(id): Observable<any> {
    return this.http.get(API_URL_COM + id)
      .map((res: Response) => res.json());
  }

  findDataUser1(user: String) {
    return this.http2.get('https://servicios.espe.edu.ec:8443/adm_user-0.0.1-SNAPSHOT/adm/id' + user + '/23', httpOptions).pipe(
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
  findDataUser(url:string, user: String) {
    return this.http2.get(url + user , httpOptions).pipe(
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
  



  getPidmByUsuario(userName): Observable<any> {
    return this.http.get(USER + userName);
  }
}
