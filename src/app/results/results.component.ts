import { Component, OnInit } from '@angular/core';
import {Item, CppitemsService} from '../cppitems.service';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.sass']
})
export class ResultsComponent implements OnInit {

  public ready: any = "ddd";
  private sub: any;

  constructor(public cppitemsService: CppitemsService, private router: Router,
    private route: ActivatedRoute) { 

    }

    ngOnInit() {

      this.sub = this.route.queryParams
        .subscribe(params => {
          if (params.find === undefined || /^ *$/.test(params.find))
          {
            this.router.navigate(['/items/all']);
          } else {
            this.cppitemsService.find = decodeURIComponent(params.find);

            this.cppitemsService.getResultsReady(this.cppitemsService.find).subscribe(data => {
              this.ready = "ready";

            });
            
          }
        }
      );
    
    }

    ngOnDestroy() {
      this.sub.unsubscribe();
    }
    // public goto(route: string){
    //   this.router.navigate([route]);
    // }

}
