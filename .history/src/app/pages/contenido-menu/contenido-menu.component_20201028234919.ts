import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { MenuService } from 'app/services/menu.service';
import { Menu } from 'app/models/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contenido-menu',
  templateUrl: './contenido-menu.component.html',
  styleUrls: ['./contenido-menu.component.scss']
})

export class ContenidoMenuComponent implements OnInit {

  menus: Menu;
  navigationSubscription 
 
  constructor(private menuService: MenuService, private _sanitizer: DomSanitizer, private router: Router) { 
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

}
  