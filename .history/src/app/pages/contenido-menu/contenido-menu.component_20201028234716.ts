import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { MenuService } from 'app/services/menu.service';
import { Menu } from 'app/models/menu';

@Component({
  selector: 'app-contenido-menu',
  templateUrl: './contenido-menu.component.html',
  styleUrls: ['./contenido-menu.component.scss']
})
// var blob = dataURItoBlob(imageBase64); function dataURItoBlob(dataURI) { 
//   //  convert base64/URLEncoded data component to raw binary data held in a string 
//    var byteString; if (dataURI.split(',')[0].indexOf('base64') >= 0) byteString = atob(dataURI.split(',')[1]); else byteString = unescape(dataURI.split(',')[1]);  
//   //  separate out the mime component 
//    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];  
//   //  write the bytes of the string to a typed array 
//    var ia = new Uint8Array(byteString.length); for (var i = 0; i < byteString.length; i++) { ia[i] = byteString.charCodeAt(i); } return new Blob([ia], {type:mimeString}); } 
export class ContenidoMenuComponent implements OnInit {

  menus: Menu;
  // imgSrcData = CryptoJS.enc.Base64.stringify(fileLoadedEvent.target.result);
  // imgSrcData = window.btoa(fileLoadedEvent.target.result);
  constructor(private menuService: MenuService, private _sanitizer: DomSanitizer, ) { 
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
  