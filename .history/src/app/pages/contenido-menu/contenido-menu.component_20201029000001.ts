import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { MenuService } from 'app/services/menu.service';
import { Menu } from 'app/models/menu';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-contenido-menu',
  templateUrl: './contenido-menu.component.html',
  styleUrls: ['./contenido-menu.component.scss']
})

export class ContenidoMenuComponent implements OnInit {

  menus: Menu;
  navigationSubscription
  idP: any;
  codeC: any;

  constructor(private menuService: MenuService, private _sanitizer: DomSanitizer, private router: Router, private route: ActivatedRoute) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initializar();
      }
    });
  }

  ngOnInit() {
    this.getMenu();
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

  initializar() {
    if (
      (this.route.snapshot.params.idP.length,
        this.route.snapshot.params.codeC.length)

    ) {
      this.idP = this.route.snapshot.params.id;
      this.codeC = this.route.snapshot.params.tipo_formulario;

      console.log(
        'Codeigo idp ',
        this.idP,
        'CpdeC: ',
        this.codeC
      );
    }
  }

}
