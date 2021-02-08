import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  

  constructor() { }

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
