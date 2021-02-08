import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { PersonalDataService } from 'app/services/personal-data.service';
import { Router } from '@angular/router';
import { MenuService } from 'app/services/menu.service';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Menu } from 'app/models/menu';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";



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
  // { path: '/contenidoMenu', title: 'Contenido Menu', icon: 'content_paste', class: '' },
  /*{ path: '/typography', title: 'Typography', icon: 'library_books', class: '' },
  { path: '/icons', title: 'Icons', icon: 'bubble_chart', class: '' },
  { path: '/maps', title: 'Maps', icon: 'location_on', class: '' },
  { path: '/notifications', title: 'Notifications', icon: 'notifications', class: '' },
  { path: '/upgrade', title: 'Upgrade to PRO', icon: 'unarchive', class: 'active-pro' },*/
];
export const ROUTESC: RouteInfo[] = [
  { path: '/contenidoMenu', title: 'Contenido Menu', icon: 'content_paste', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public isLoggedIn = false;
  public userName: string;

  registroMenuPadre: FormGroup;
  registroMenuHijo: FormGroup;
  registroContenido: FormGroup;
  registroNoticia: FormGroup;
  menus: Menu;

  menusH: Menu;

  menusP: Menu;
  persona: any = [];
  cedula: any = [];

  nombres: string;


  menuItems: any[];

  idp:any
  codep:any
  submitted: boolean;


  constructor(private authService: AuthService, private personaldataService: PersonalDataService, private router: Router,  private menuService: MenuService,  private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getMenu();
    this.getMenuPadre();
   
  
   
    // this.param = 'L00290697';
    // this.getUserbyidEspe(this.param);

  
    // this.getMenuHijo();
    this.menuItems = ROUTES.filter(menuItem => menuItem);
        // this.menuItems = ROUTESC.filter(menuItem2 => menuItem2);

    this.isLoggedIn = this.authService.isLoggedIn();
    console.log(this.isLoggedIn);
    if (this.isLoggedIn) {
      this.userName = this.authService.getUserName();
      console.log(this.userName);
      this.personaldataService.findDataUser(environment.servicioUser, this.userName).subscribe((data: {}) => {
        this.persona = data[0];
        this.personaldataService.findDataUser(environment.servicioUserldap, this.userName).subscribe(
          data => {
            //this.nombreC = data[0].nombreCompleto
            this.initialiseInvites2(data.nombreCompleto, data.codId);
            // this.getUser();
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
    this.menuService.get('tipoPersona/' + localStorage.getItem('pidm')).subscribe((data: {}) => {
      this.persona = data[0];
      console.log('PER', this.persona);
      // this.router.navigate(['personal']);
      // this.menuItems = ROUTES.filter(menuItem => menuItem);

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

    localStorage.setItem('pidm', upidm);
}
initialiseInvites1(cedula) {
    localStorage.setItem('cedula', cedula);
}
initialiseInvites2(nombreC, codId) {
    localStorage.setItem('nombreCompleto', nombreC);

    this.nombres = localStorage.getItem('nombreCompleto')

    localStorage.setItem('codigo', codId);

}
  getMenu() {
    this.menuService.get("menuget/").subscribe(
      (data) => {
        this.menus = data;
        console.log("menu: ", this.menus);
      },
      (err) => {
        console.log("error getmenu :", err);
      }
    );
  }

  idP: number

  buscarMenu(menuidP) {
    console.log("buscar ids ", .menuidP);
    this.menuService.get('contenidoIdContenido/' + menuidP + '/0').subscribe(
      data => {
        console.log(data);
        this.menusH = data
            }
    )

  }
  getMenuPadre() {
    this.menuService.get("menugetPadre/").subscribe(
      (data) => {
        this.menusP = data;
        console.log("menu: ", this.menusP);
      },
      (err) => {
        console.log("error getmenu :", err);
      }
    );
  }

  buscar(){
  
    console.log(this.idp,this.codep)
    this.router.navigate(['/contenidoMenu/'+this.idp+'/'+this.codep], {    
      skipLocationChange: true,
     
   });
 if( this.submitted = true){
   

 }
  }

getUser() {
  this.personaldataService.findDataUser('https://servicios.espe.edu.ec:8443/adm_user-0.0.1-SNAPSHOT/adm/id/', localStorage.getItem('codigo') + '/101').subscribe(
    data => {
      if (data.opciones) {
        this.menuItems = Array.from(
          new Set(data.opciones.map(x => x.opcion))
        ).map(datos => {
          return {
            opcion: data.opciones.find(s => s.opcion === datos).opcion,
            url: data.opciones.find(s => s.opcion === datos).url,
            icono: data.opciones.find(s => s.opcion === datos).icono,
            clase: data.opciones.find(s => s.opcion === datos).clase
          };
        });
      }

    }
  )
}

saveC(id){
this.codep=id
}

saveP(id){
  this.idp = id
  
}

}
