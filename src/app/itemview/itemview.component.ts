import { Component, OnInit,OnDestroy } from '@angular/core';
import {Item, CppitemsService} from '../cppitems.service';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-itemview',
  templateUrl: './itemview.component.html',
  styleUrls: ['./itemview.component.sass']
})
export class ItemviewComponent implements OnInit, OnDestroy {

  markdown: string;
  item: Item;
  constructor(public cppitemsService: CppitemsService, private router: Router,
    private route: ActivatedRoute){   
  
  }

  routeID: string;
  private sub: any;
  ngOnInit() {
    // console.log('ngOnInit');
    // Get parent ActivatedRoute of this route.
  this.sub = this.route.params.subscribe((params => {
    // console.log('ngOnInit:' + this.routeID);
      this.routeID = params['idx'];
      // console.log(params['idx']);
      this.cppitemsService.getItemReady(this.routeID).subscribe(message => {
        this.item = this.cppitemsService.showItem;
        // console.log('getItemReady');

      });        

    }));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
