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
  registroNoticia: FormGroup;

  menusH: Menu;
  menusP: Menu;


  constructor(private menuService: MenuService, private personalDataService: PersonalDataService, private spinner: NgxSpinnerService,
    private route: ActivatedRoute, private router: Router, private messageService: MessageService) {
    this.initializar();
    this.spinner.show();
  
  }

  initializar() {
    // this.cedula = atob(this.route.snapshot.params.id);
    // this.getMenu();
    this.getMenuPadre();
    this.registroMenu = this.formBuilder.group({
      id_noticia: [null],
      contenido: ["", Validators.required],
      titulo: ["", Validators.required],
      fecha: [this.fecha],
      imagePost: ["", Validators.required],
      estado_noticia: ["Activa"],
    });
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
  ngOnDestroy() {

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

getMenuHijo() {
  this.menuService.get("menugetHijo/").subscribe(
    (data) => {
      this.menusH = data;
      console.log("menu: ", this.menusH);
    },
    (err) => {
      console.log("error getmenu :", err);
    }
  );
}

crearMenu() {
  this.submitted = true;
  if (this.registroNoticia.invalid) {
    return;
  }
  console.log("datos: ", this.registroNoticia);
  this.restservices
    .addData(this.registroNoticia.value, "noticias/crear")
    .subscribe((data) => {
      if (data) {
        this.closeBtn.nativeElement.click();
        this.registroNoticia.reset();        
        this.getNoticias();
        this.toastr.success("Exito al Guardar")
      } else {
        //this.showError();
        console.log(" Error al crear noticia", this.noticiausuario);
      }
    });
}

}
