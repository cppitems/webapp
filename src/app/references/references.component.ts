import {Component, OnInit} from '@angular/core';
import {DeviceinfoService} from './../deviceinfo.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.sass']
})
export class ReferencesComponent implements OnInit {

  constructor(public router: Router) {}

  ngOnInit() {}
}
