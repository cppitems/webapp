import { Component, OnInit } from '@angular/core';
import {Item, CppitemsService} from '../cppitems.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DeviceinfoService} from '../deviceinfo.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.sass']
})
export class MenubarComponent implements OnInit {

  constructor(public deviceinfo: DeviceinfoService,public cppitemsService: CppitemsService, private router: Router,
    private route: ActivatedRoute,private location: Location) {
      this.router.events.subscribe( even => {
        if (!this.location.path().includes("search")) 
        {
          this.cppitemsService.find = "";
        }
      });      
      // console.log("this.router.url"+this.router.url);
      // console.log(this.location.path() );     

    }

  public search(value:string){
    // console.log('Search');
    this.router.navigate(['/search'], { queryParams: { find: encodeURIComponent(value) } });
    // this.cppitemsService.getResultsReady(value);
  }

  ngOnInit(): void {
    // console.log("this.router.url"+this.router.url);
  }


}
