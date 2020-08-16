import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule, NgForm, FormGroup} from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

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

items = [];

products: any[];
quantity: number;

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
}
get grandTotal() {

let i;
let sub_total = 0;
let grand_total = 0;
//this.totals = [];
///if  (this.isSubmitted() == true) {
if  (this.isSubmitted == true) {
 if (typeof this.product_price  !== "undefined" && typeof this.quantity  !== "undefined") {
                                sub_total = this.product_price * this.quantity;
                                this.totals.push(sub_total);
                        }
                }
                          
                                
                for (i = 0; i < this.totals.length; i++) {
                        grand_total += this.totals[i];
                }
		this.isSubmitted = false;
        return grand_total;
}

 constructor(public db: AngularFireDatabase, private cd: ChangeDetectorRef){
   db.list('/products')
   .valueChanges().subscribe(products=>{
   this.products=products;
   });
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

deleteItem(i){
  this.items.splice(i,1);
  this.setStorageItems(this.items);
  console.log("removed");
  //this.isSubmitted = true;
  //this.grandTotal;
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
   this.myForm = new FormGroup({
       int: new FormControl()
    });
   this.yourForm = new FormGroup({
       //int: new FormControl()
    });	
   
 
  
  }
 
   ngAfterContentChecked() {
    this.cd.detectChanges();
  } 
  ngAfterViewInit() {
this.cd.detectChanges();
}
    

}
