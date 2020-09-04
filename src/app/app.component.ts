import { Component,OnInit } from '@angular/core';
import {Item, CppitemsService} from './cppitems.service';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent  {
  title = 'cppitems';

  items: Item[] = [];

  constructor(public cppitemsService: CppitemsService,iconRegistry: MatIconRegistry, sanitizer: DomSanitizer){   
    this.cppitemsService.getContentReady().subscribe(message => {
      this.items = this.cppitemsService.items;
    });    
    iconRegistry.addSvgIcon(
      'home',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/desktop.svg'));    
      iconRegistry.addSvgIcon(
        'menu',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/prev.svg'));      
  }



}
