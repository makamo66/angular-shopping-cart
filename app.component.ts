import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
//import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig} from 'angular2/router';
//import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
//import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig} from 'angular2/router';
//import {ROUTER_DIRECTIVES} from '@angular/router';
import { Routes, RouterModule, Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent{
/*
public checkOut(): void {
alert("In Function");
//this.router.navigate(['/check-out'], {relativeTo: this.route});
this.router.navigate(['check-out']);

}
*/
constructor( public router: Router, private route: ActivatedRoute){}

}
