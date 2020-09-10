import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule, NgForm, FormGroup} from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { ActivatedRoute } from '@angular/router';
//import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig} from 'angular2/router';
import { Routes, RouterModule, Router } from "@angular/router";
import { CheckOutComponent } from '../check-out/check-out.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss',
  '../quantity-button/quantity-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})

export class ShoppingCartComponent implements OnInit {
myForm: FormGroup;
yourForm: FormGroup;
submitForm: FormGroup;

items = [];

products: any[];
quantity: number;
public grandTotal: number;
product_price: number;
totals = [];

//isSubmitted : boolean;

isSubmitted = false;
storageKey = 'MyDataStorageKey';

public onSubmit(id, thumbnail, quantity, product_name, product_price){

this.product_price = parseFloat(product_price);


var data = {
    id,
   thumbnail,
   quantity,
   product_name,
   product_price
};

this.isSubmitted = true;

 // Get the saved stringified object from cache
const retrieverObject: string = localStorage.getItem(this.storageKey) || '';
// Parse it to an array, or set to a blank array, if there is no data
const retrieveObject: Array<any> = retrieverObject ? JSON.parse(retrieverObject) : [];
// Find the item from the array
 let presentItem = this.items.find(item => item.id === id);
  if (presentItem) {
    this.quantity += quantity;
    presentItem.quantity += quantity;
  } else {
    this.items.push(data);
  }
  this.setStorageItems(this.items);
  this.calcGrandTotal(this.items);
}

// constructor(public db: AngularFireDatabase){
constructor(public db: AngularFireDatabase, public router: Router, private route: ActivatedRoute){

   db.list('/products')
   .valueChanges().subscribe(products=>{
   this.products=products;
   });
   
    //this.grandTotal = 0;
  }

public checkOut(): void {
alert("In Function");
//this.router.navigate(['/check-out'], {relativeTo: this.route});
this.router.navigate(['check-out']);

}

plus(product:any){
  product.nullValue++;
  this.quantity = product.nullValue;
  return this.quantity;
 
}

minus(product:any){ 
 product.nullValue--;
if(product.nullValue < 0) {
product.nullValue = 0; 
} 

this.quantity=product.nullValue;   
  return this.quantity;

}


calcGrandTotal(items: any) {
    this.grandTotal = this.items.reduce((acc, item: any)=> {
      return acc + (item.quantity * item.product_price);
    }, 0);
  }

deleteItem(i){
  this.items.splice(i,1);
  this.setStorageItems(this.items);
  this.calcGrandTotal(this.items);
  console.log("TEST AGAIN");
}

 writeValue(): void {

  }
  registerOnChange(): void {
  
  }
  

  registerOnTouched(): void {
  }
  
   setDisabledState(): void {
  }

getStorageItems() {
  const retrieverObject: string = localStorage.getItem(this.storageKey) || '';
  return JSON.parse(retrieverObject) || [];
}


setStorageItems(items: any[]) {
  localStorage.setItem(this.storageKey, JSON.stringify(items));
}
ngOnInit(): void {

this.items = this.getStorageItems();

this.calcGrandTotal(this.items);
this.submitForm = new FormGroup({ 
});	
 
   this.myForm = new FormGroup({
       int: new FormControl()
    });
   this.yourForm = new FormGroup({
      
    });	
 
  }

}
