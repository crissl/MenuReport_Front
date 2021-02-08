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
  var imgSrcData = window.btoa(fileLoadedEvent.target.result);
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
  getImagem(readerEvt, midia){
    //console.log('change no input file', readerEvt);
    let file = readerEvt.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        //console.log('base64 do arquivo',reader.result);
        midia.binario = btoa(reader.result);
        //console.log('base64 do arquivo codificado',midia.binario);
    };
    reader.onerror = function (error) {
        console.log('Erro ao ler a imagem : ', error);
    };
}

}
