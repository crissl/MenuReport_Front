import { Component, OnInit } from '@angular/core';
import {version} from '../../../../package.json';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  test : Date = new Date();

  public version: string = version; 
  // public nombres: string = localStorage.getItem('nombreCompleto');
  
  constructor() { }

  ngOnInit() {
  }

}
