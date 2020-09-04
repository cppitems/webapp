import { Component, OnInit } from '@angular/core';
import {DeviceinfoService} from '../deviceinfo.service';
import {Item, CppitemsService} from '../cppitems.service';
@Component({
  selector: 'app-useroptions',
  templateUrl: './useroptions.component.html',
  styleUrls: ['./useroptions.component.sass']
})
export class UseroptionsComponent implements OnInit {

  autoTicks = false;
  disabled = false;
  invert = false;
  max = 11;
  min = 1;
  showTicks = true;
  step = 1;
  thumbLabel = true;
  vertical = false;
  tickInterval = 1;
  constructor(public cppitemsService: CppitemsService,public deviceinfo: DeviceinfoService) { 
  
    
  }

  ngOnInit() {
  }

}
