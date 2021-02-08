import { Component, OnInit } from '@angular/core';
import { MenuService } from 'app/services/menu.service';
import { Menu } from 'app/models/menu';

@Component({
  selector: 'app-contenido-menu',
  templateUrl: './contenido-menu.component.html',
  styleUrls: ['./contenido-menu.component.scss']
})
export class ContenidoMenuComponent implements OnInit {

  menus: Menu;

  constructor(private menuService: MenuService) { }

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
