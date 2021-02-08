import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { PersonalDataService } from 'app/services/personal-data.service';
import { Router } from '@angular/router';
import { MenuService } from 'app/services/menu.service';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'environments/environment';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  // { path: '/hojaSalida', title: 'Hoja de Salida', icon: 'dashboard', class: '' },
  // { path: '/matriculaPac', title: 'Matrícula PAC', icon: 'person', class: '' },
  { path: '/createMenu', title: 'Menu Reportes', icon: 'content_paste', class: '' },
  /*{ path: '/typography', title: 'Typography', icon: 'library_books', class: '' },
  { path: '/icons', title: 'Icons', icon: 'bubble_chart', class: '' },
  { path: '/maps', title: 'Maps', icon: 'location_on', class: '' },
  { path: '/notifications', title: 'Notifications', icon: 'notifications', class: '' },
  { path: '/upgrade', title: 'Upgrade to PRO', icon: 'unarchive', class: 'active-pro' },*/
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public isLoggedIn = false;
  public userName: string;
  persona: any = [];

  menuItems: any[];

  constructor(private authService: AuthService, private personaldataService: PersonalDataService, private router: Router,  private menuService: MenuService) { }

  ngOnInit() {
    // this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.isLoggedIn = this.authService.isLoggedIn();
    console.log(this.isLoggedIn);
    if (this.isLoggedIn) {
      this.userName = this.authService.getUserName();
      console.log(this.userName);
      this.personaldataService.findDataUser(environment.servicioUser, this.userName).subscribe((data: {}) => {
        this.persona = data[0];
        // this.personaldataService.findDataUser(environment.servicioUserldap, this.userName).subscribe(
          // data => {
          //   //this.nombreC = data[0].nombreCompleto
          //   this.initialiseInvites2(data.nombreCompleto, data.codId);
          //   this.getUser();
          //   this.personaldataService.findDataUser(environment.servicioCedulaById, data.codId).subscribe(
          //     data => {
          //       this.cedula = data[0];

          //       this.initialiseInvites1(this.cedula.cedula);
          //     }
          //   )
          // }
        // )
        console.log('USUARIO', this.persona.pidm);
        this.initialiseInvites(this.persona.pidm);
        this.getUsuario();
      });

    }


  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

  getUsuario() {
    this.persona = [];
    this.meunService.get('tipoPersona/' + localStorage.getItem('pidm')).subscribe((data: {}) => {
      this.persona = data[0];
      console.log('PER', this.persona);
      // this.router.navigate(['personal']);
      if (this.persona === undefined) {
        this.menuItems2 = ROUTESE.filter(menuItem => menuItem);
        this.menuItems3 = ROUTESRE.filter(menuItem => menuItem);
        this.menuItems4 = ROUTESTE.filter(menuItem => menuItem);
        // this.validacionpagina();
      } else {
        // //console.log('JSON', JSON.stringify(this.aux));
        if (data[0] == undefined) {
          this.menuItems2 = ROUTESE.filter(menuItem => menuItem);
          this.menuItems3 = ROUTESRE.filter(menuItem => menuItem);
          this.menuItems4 = ROUTESTE.filter(menuItem => menuItem);
          // this.validacionpagina();
        }
        if (this.persona.codigo == ('DO')) {
          this.menuItems2 = ROUTESDO.filter(menuItem => menuItem);
          this.menuItems3 = ROUTESRD.filter(menuItem => menuItem);
          this.menuItems4 = ROUTESTD.filter(menuItem => menuItem);

          // //console.log('SERVIDOR PUBLICO' + ROUTES3.filter(menuItem => menuItem))

        }

      }
    }, (err) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 500) {
          // //console.log('ERROR');
          this.router.navigate(['/error']);
        }
      }
    }
    )

  }
  initialiseInvites(upidm) {
    // Set default values and re-fetch any data you need.
    // localStorage.getItem('PID');
    // //console.log('pidm', btoa(upidm))
    localStorage.setItem('pidm', upidm);
    // localStorage.getItem('pidm') 
  }
}
