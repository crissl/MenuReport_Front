import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'app/services/rest.service';
import { AuthService } from 'app/services/auth.service';
import { PersonalDataService } from 'app/services/personal-data.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {

  public isLoggedIn = false;
  public userName: string;
  datos: boolean;
  id: any;

  pidm;
  cedula2;
  nombres;
  codId;
  
  persona: any = [];
  cedula: any = [];
  nombreC: void;
  constructor(private authService: AuthService, private personaldataService: PersonalDataService, private router: Router, private restService: RestService) { }

  ngOnInit() {
  // this.pidm = localStorage.getItem('pidm');
  this.isLoggedIn = this.authService.isLoggedIn();
  console.log(this.isLoggedIn);
  if (this.isLoggedIn) {
    this.userName = this.authService.getUserName();
    console.log(this.userName);
    this.personaldataService.findDataUser(environment.servicioUser, this.userName).subscribe((data: {}) => {
      this.persona = data[0];
      this.personaldataService.findDataUser(environment.servicioUserldap, this.userName).subscribe(
        data => {
          this.initialiseInvites2(data.nombreCompleto, data.codId);
         
          this.personaldataService.findDataUser(environment.servicioCedulaById, data.codId).subscribe(
            data => {
              this.cedula = data[0];

              this.initialiseInvites1(this.cedula.cedula);
            }
          )
        }
      )
      console.log('USUARIO', this.persona.pidm);
      this.initialiseInvites(this.persona.pidm);
    });
  }
}

initialiseInvites(upidm) {

  localStorage.setItem('pidm', upidm);
}
initialiseInvites1(cedula) {
  localStorage.setItem('cedula', cedula);
  this.cedula = localStorage.getItem('cedula');
}
initialiseInvites2(nombreC, codId) {
  localStorage.setItem('nombreCompleto', nombreC);
 
  this.nombres = localStorage.getItem('nombreCompleto')

  localStorage.setItem('codigo', codId);
  this.codId = localStorage.getItem('codigo');

}

}
