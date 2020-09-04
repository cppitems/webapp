import { Component, OnInit } from '@angular/core';
import {Item, CppitemsService} from '../cppitems.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  // items: Item[] = [];

  constructor(public cppitemsService: CppitemsService){   
   
  }

  ngOnInit(): void {
    
  }

}
