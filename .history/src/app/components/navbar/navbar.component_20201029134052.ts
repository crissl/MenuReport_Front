import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { environment } from 'environments/environment';
import { PersonalDataService } from 'app/services/personal-data.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;
      mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;

    public isLoggedIn = false;
    public userName: string;
    persona: any = [];


    constructor( private authService: AuthService, location: Location,  private element: ElementRef, private router: Router, private personaldataService: PersonalDataService,) {
      this.location = location;
          this.sidebarVisible = false;
    }

    ngOnInit(){

      this.listTitles = ROUTES.filter(listTitle => listTitle);
      this.isLoggedIn = this.authService.isLoggedIn();
      console.log(this.isLoggedIn);
      if (this.isLoggedIn) {
        this.userName = this.authService.getUserName();
        console.log(this.userName);
        this.personaldataService.findDataUser(environment.servicioUser, this.userName).subscribe((data: {}) => {
          this.persona = data[0];
          this.personaldataService.findDataUser(environment.servicioUserldap, this.userName).subscribe(
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
          )
          console.log('USUARIO', this.persona.pidm);
          this.initialiseInvites(this.persona.pidm);
          this.getUsuario();
        });
  
      }
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
      this.router.events.subscribe((event) => {
        this.sidebarClose();
         var $layer: any = document.getElementsByClassName('close-layer')[0];
         if ($layer) {
           $layer.remove();
           this.mobile_menu_visible = 0;
         }
     });
    }
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
        // Set default values and re-fetch any data you need.
        // localStorage.getItem('PID');
        // //console.log('pidm', btoa(upidm))
        localStorage.setItem('pidm', upidm);
        // localStorage.getItem('pidm') 
      }


    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function() {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function() {
                $toggle.classList.add('toggled');
            }, 430);

            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            // if (body.querySelectorAll('.main-panel')) {
            //     document.getElementsByClassName('main-panel')[0].appendChild($layer);
            // }else if (body.classList.contains('off-canvas-sidebar')) {
            //     document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            // }

            setTimeout(function() {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function() { //asign a function
              body.classList.remove('nav-open');
              this.mobile_menu_visible = 0;
              $layer.classList.remove('visible');
              setTimeout(function() {
                  $layer.remove();
                  $toggle.classList.remove('toggled');
              }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };

    getTitle(){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }

      for(var item = 0; item < this.listTitles.length; item++){
          if(this.listTitles[item].path === titlee){
              return this.listTitles[item].title;
          }
      }
      return 'Dashboard';
    }
    logout() {
        localStorage.removeItem('param');
        localStorage.clear();
        this.authService.logout();

    }
}
