import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


// const URL = environment.URL_SERVICE;

const API_URL = URL + '/usuarioByIdCard/';
const CED_URL = URL + '/cedulaById/';
const USERBY= URL+ '/username/';
const httpconf = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json'
  })
};

// const COR_URL = URL + '/obtenerdatospdf/'
@Injectable()
export class UsuarioService {
  constructor(private httpClient: HttpClient) { }

  getUsuario(id): Observable<any> {
    return this.httpClient.get(API_URL + id) ;
  }

  getCedula(id): Observable<any> {
    return this.httpClient.get(CED_URL + id) ;
  }

  getPidmByUsuario(userName): Observable<any> {
    return this.httpClient.get(USERBY + userName) ;
  }

  findDataUser(user: String) {
    return this.httpClient.get('https://servicios.espe.edu.ec:8443/adm_user-0.0.1-SNAPSHOT/adm/id/' + user + '/14', httpconf).pipe(
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

}
