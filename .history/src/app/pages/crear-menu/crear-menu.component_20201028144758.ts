import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng//api';
import { NgxSpinnerService } from 'ngx-spinner';
import { PersonalDataService } from 'app/services/personal-data.service';
import { User } from 'app/models/user.model';
import { MenuService } from 'app/services/menu.service';
import { Menu } from 'app/models/menu';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { DomSanitizer } from '@angular/platform-browser';





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
  spidem;
  submitted: boolean;
  menuPadre: any;
  private selectedFile: any;
  menus: Menu;
  registroMenuPadre: FormGroup;
  registroMenuHijo: FormGroup;
  registroContenido: FormGroup;
  registroNoticia: FormGroup;
  datosFormularios: any;
  idF = "0";
  codigoMenuF = "0";

  nombre = "";

  descripcion = "";

  estado = "A";

  link = "";

  fechaCrea = "11/07/2021";

  usuarioCrea = "334571";





  handleImage(event: any): void {
    this.selectedFile = event.target.files[0];
    console.log('IMage', this.selectedFile);
  }

  // fecha = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
  pipe = new DatePipe('en-US');
  now = Date.now();
  fechaActual = this.pipe.transform(this.now, 'yyyy-MM-dd');


  menusH: Menu;
  menusP: Menu;


  constructor(private menuService: MenuService, private personalDataService: PersonalDataService, private spinner: NgxSpinnerService,
    private route: ActivatedRoute, private router: Router, private messageService: MessageService, private formBuilder: FormBuilder, private datePipe: DatePipe, private toastr: ToastrService, private http: HttpClient, private _sanitizer: DomSanitizer) {
    this.initializar();
    this.spinner.show();

  }

  initializar(): void {
    // this.cedula = atob(this.route.snapshot.params.id);
    // this.getMenu();
    this.getMenuPadre();
    //this.getMenuHijo();
    this.registroMenuPadre = this.formBuilder.group({
      // idP: [0],
      // codigoMenu: [1],
      idF: [0],
      codigoMenuF: [0],
      nombre: ["", Validators.required],
      // descripcion: [null],
      // estado: ["A"],
      // link: [null],
      // imagen: [null],
      fechaCrea: [Date.now()],
      // usuarioCrea: [null],
      // sistemaId: [null],
      // opcionId: [null]
    });
    this.registroMenuHijo = this.formBuilder.group({
      idF: [this.idP],
      codigoMenuF: [0],
      nombre: ["", Validators.required],
      // descripcion: [null],
      // estado: ["A"],
      // link: [null],
      fechaCrea: [Date.now()],
      // usuarioCrea: [null],
      // sistemaId: [null],
      // opcionId: [null]
    });
    this.registroContenido = this.formBuilder.group({
      idF: [],
      codigoMenuF: [],
      nombre: ["", Validators.required],
      descripcion: ["", Validators.required],
      estado: ["A"],
      link: ["", Validators.required],
      imagen: ["", Validators.required],
      fechaCrea: [Date.now()],
      usuarioCrea: [null],
      // sistemaId: [null],
      // opcionId: [null]
    });
    // this.param = 'L00290697';
    // this.getUserbyidEspe(this.param);

  }

  idP: number

  buscarMenu(menuidP) {
    console.log(menuidP);
    this.menuService.get('contenidoIdContenido/' + menuidP + '/0').subscribe(
      data => {
        console.log(data);
        this.menusH = data
            }
    )

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
        console.log("menu : ", this.menus);
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
        console.log("menu padre: ", this.menusP);
      },
      (err) => {
        console.log("error getmenu :", err);
      }
    );
  }

  // getMenuHijo() {
  //   this.menuService.get("menugetHijo/").subscribe(
  //     (data) => {
  //       this.menusH = data;
  //       console.log("menu hijo: ", this.menusH);
  //     },
  //     (err) => {
  //       console.log("error getmenu :", err);
  //     }
  //   );
  // }

  crearMenu() {
    this.submitted = true;
    if (this.registroMenuPadre.invalid) {
      return;
    }
    console.log("datos padre: ", this.registroMenuPadre.value);

    this.menuService.addData(this.registroMenuPadre.value, "crearMenu/").subscribe(
      (data) => {
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
  crearSubMenu() {
    this.submitted = true;
    if (this.registroMenuHijo.invalid) {
      return;
    }
    console.log("datos hijo: ", this.registroMenuHijo.value);

    this.menuService.addData(this.registroMenuHijo.value, "crearMenu/").subscribe((data) => {
      if (data) {
        // this.closeBtn.nativeElement.click();
        this.registroMenuHijo.reset();
        this.getMenu();
        this.toastr.success("Exito al Guardar")
      } else {
        //this.showError();
        console.log(" Error al crear noticia", this.registroMenuHijo);
      }
    });
  }

  crearContenido() {
    this.submitted = true;
    cons
    // if (this.registroContenido.invalid) {
    //   return;
    // }
    // console.log("datos: ", this.registroContenido);

    // const uploadData = new FormData();


    // uploadData.append('idF', this.idF);   //this.datosFormularios.valu.idf
    // uploadData.append('codigoMenuF', this.codigoMenuF);
    // uploadData.append('nombre', this.nombre);
    // uploadData.append('descripcion', this.descripcion);
    // uploadData.append('estado', this.estado);
    // uploadData.append('link', this.link);
    // uploadData.append('imagen', this.selectedFile);
    // this.selectedFile.imageName = this.selectedFile.name;
    // uploadData.append('fechaCrea', this.fechaCrea);
    // uploadData.append('usuarioCrea', this.usuarioCrea);


    // // this.registroContenido.value;
    // this.http.post('http://localhost:8083/menus/crearContenido', uploadData, { observe: 'response' })
    //   //  this.menuService
    //   //     .addData("crear",  uploadData, {observe: 'response'})
    //   .subscribe((data) => {
    //     if (data) {
    //       // this.closeBtn.nativeElement.click();
    //       this.registroContenido.reset();
    //       this.getMenu();
    //       this.toastr.success("Exito al Guardar")
    //     } else {
    //       //this.showError();
    //       console.log(" Error al crear noticia", this.registroContenido);
    //     }
    //   });
  }
  // crearContenido2() {
  //   const uploadData = new FormData();
  //   uploadData.append('imagen', this.selectedFile);
  //   this.selectedFile.imageName = this.selectedFile.name;
  //   this.http.post('http://localhost:8083/menus/upload', uploadData, { observe: 'response' })
  //     .subscribe((response) => {
  //       if (response.status === 200) {
  //         this.submitted = true;
  //         if (this.registroContenido.invalid) {
  //           return;
  //         }
  //         console.log("datos: ", this.registroContenido);
  //         this.menuService
  //           .addData(this.registroContenido.value, "crearContenido/")
  //           .subscribe((data) => {
  //             if (data) {
  //               // this.closeBtn.nativeElement.click();
  //               this.registroContenido.reset();
  //               this.getMenu();
  //               this.toastr.success("Exito al Guardar")
  //             } else {
  //               //this.showError();
  //               console.log(" Error al crear noticia", this.registroContenido);
  //             }
  //           });
  //       } else {
  //         console.log(" Error al crear noticia", this.registroContenido);
  //       }

  //     }
  //   );
  // }

}
