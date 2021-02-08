import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng//api';
import { NgxSpinnerService } from 'ngx-spinner';
import { PersonalDataService } from 'app/services/personal-data.service';
import { User } from 'app/models/user.model';
import { MenuService } from 'app/services/menu.service';
import { Menu } from 'app/models/menu';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders,HttpErrorResponse } from "@angular/common/http";





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
  submitted: boolean;
  menuPadre: any;
  private selectedFile: any;
  registroMenuPadre: FormGroup;
  registroMenuHijo: FormGroup;
  registroContenido: FormGroup;


  // fecha = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
  pipe = new DatePipe('en-US');
  now = Date.now();
  fechaActual = this.pipe.transform(this.now, 'yyyy-MM-dd');


  menusH: Menu;
  menusP: Menu;


  constructor(private menuService: MenuService,  private personalDataService: PersonalDataService, private spinner: NgxSpinnerService,
    private route: ActivatedRoute, private router: Router, private messageService: MessageService, private formBuilder: FormBuilder, private datePipe: DatePipe, private toastr: ToastrService,private http: HttpClient) {
    this.initializar();
    this.spinner.show();
  
  }

  initializar(): void {
    // this.cedula = atob(this.route.snapshot.params.id);
    // this.getMenu();
    this.getMenuPadre();
    this.registroMenuPadre = new FormGroup({
      // idP: [null],
      // codigoMenu: [null],
      // idF: ['0'],
      codigoMenuF = new FormGroup'0'
  ,
      nombre: ["", Validators.required],
      descripcion: [null],
      estado: ["A"],
      link: [null],
      imagen: [null],
      fechaCrea: [Date.now()],
      usuarioCrea: [null],
      sistemaId: [null],
      opcionId: [null]
    });
    this.registroMenuHijo = this.formBuilder.group({
      idF: [1],
      codigoMenuF: [0],
      nombre: ["", Validators.required],
      descripcion: [null],
      estado: ["A"],
      link: [null],
      fechaCrea: [Date.now()],
      usuarioCrea: ["", Validators.required],
      sistemaId: [null],
      opcionId: [null]
    });
    this.registroContenido = this.formBuilder.group({
      idF: [1],
      codigoMenuF: [1],
      nombre: ["", Validators.required],
      descripcion: ["", Validators.required],
      estado: ["A"],
      link: ["", Validators.required],
      imagen: [null],
      fechaCrea: [Date.now()],
      usuarioCrea: ["", Validators.required],
      sistemaId: [null],
      opcionId: [null]
    });
    // this.param = 'L00290697';
    // this.getUserbyidEspe(this.param);

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
  if (this.registroMenuPadre.invalid) {
    return;
  }
  console.log("datos: ", this.registroMenuPadre);
     this.menuService
    .addData( this.registroMenuPadre.value, "crearMenu/")
    .subscribe((data) => {
      if (data) {
        // this.closeBtn.nativeElement.click();
        this.registroMenuPadre.reset();        
         this.getMenu();
        this.toastr.success("Exito al Guardar")
      } else {
        //this.showError();
        console.log(" Error al crear noticia", this.registroMenuPadre);
      }
    });
}

crearContenido() {
  this.submitted = true;
  if (this.registroContenido.invalid) {
    return;
  }
  console.log("datos: ", this.registroContenido);
  
  const uploadData = new FormData();
 
  uploadData.append('imagen', this.selectedFile);

  this.selectedFile.imageName  = this.selectedFile.name;

 this.formBuilder = this.registroContenido.value;
  this.http.post( 'http://localhost:8083/menus/crearContenido', uploadData, {observe: 'response'})
//  this.menuService
//     .addData("crear",  uploadData, {observe: 'response'})
    
    .subscribe((data) => {
      if (data) {
        // this.closeBtn.nativeElement.click();
        this.registroContenido.reset();        
         this.getMenu();
        this.toastr.success("Exito al Guardar")
      } else {
        //this.showError();
        console.log(" Error al crear noticia", this.registroContenido);
      }
    });
}

}
