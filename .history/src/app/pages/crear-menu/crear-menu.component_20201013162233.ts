import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng//api';
import { NgxSpinnerService } from 'ngx-spinner';
import { PersonalDataService } from 'app/services/personal-data.service';
import { User } from 'app/models/user.model';
import { MenuService } from 'app/services/menu.service';
import { Menu } from 'app/models/menu';

@Component({
  selector: 'app-crear-menu',
  templateUrl: './crear-menu.component.html',
  styleUrls: ['./crear-menu.component.scss'],
  providers: [MessageService, NgxSpinnerService]
})
export class CrearMenuComponent implements OnInit, OnDestroy {

  navigationSubscription;
  public usuarioData: User;
  cedula: any;
  param: any;
  datos: boolean;
  spidem ;
  menus: Menu;


  constructor(private menuService: MenuService, private personalDataService: PersonalDataService, private spinner: NgxSpinnerService,
    private route: ActivatedRoute, private router: Router, private messageService: MessageService) {
    this.initializar();
    this.spinner.show();
  }

  initializar() {
    // this.cedula = atob(this.route.snapshot.params.id);
    this.param = 'L00290697';
    this.getUserbyidEspe(this.param);

  }

  getUserbyid(id: number) {
    this.personalDataService.getUsuario(id).subscribe
      (data => {
        if (data) {
          this.usuarioData = data[0];
          console.log('this.usuarioData', this.usuarioData)
          this.datos = true;
          this.spinner.hide();

          if (Object.keys(data).length === 0) {
            this.datos = false;
          }
        }
      },
        err => {
          console.log(err);
        });
  }

  getUserbyidEspe(id) {
    this.personalDataService.getCedula(id).subscribe
      (data => {
        if (data) {
          this.cedula = data[0].cedula;
          console.log('data', data)
          this.getUserbyid(this.cedula)
        }
      },
        err => {
          console.log(err);
        });
  }
  ngOnInit() {
    // this.spidem= localStorage.getItem('pidm');

  }
  get() {
    this.menuService.get("noticias/estado_noticia/").subscribe(
      (data) => {
        this.menus = data;
        console.log("noticias: ", this.menus);
      },
      (err) => {
        console.log("error getNoticias :", err);
      }
    );
  }
  ngOnDestroy() {

  }

}
