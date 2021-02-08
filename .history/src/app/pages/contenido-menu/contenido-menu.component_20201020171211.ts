import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contenido-menu',
  templateUrl: './contenido-menu.component.html',
  styleUrls: ['./contenido-menu.component.scss']
})
export class ContenidoMenuComponent implements OnInit {

  menus: Menu;

  constructor() { }

  ngOnInit() {
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
