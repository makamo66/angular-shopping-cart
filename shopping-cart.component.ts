import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule, NgForm, FormGroup} from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss',
  '../quantity-button/quantity-button.component.scss'],

})

export class ShoppingCartComponent implements OnInit {
myForm: FormGroup;

items = [];
products: any[];
quantity: number;
product_price: number;
product=0;
totals : number[ ] = [ ];
grandtotal: number;
total: number;

public onSubmit(thumbnail, quantity, product_name, product_price){
this.product_price = parseFloat(product_price);
const data = {
   thumbnail,
   quantity,
   product_name,
   product_price
};
this.items.push(data);
localStorage.setItem('items', JSON.stringify(this.items));
}
get grandTotal() {

var i;
var sub_total;
var grand_total = 0;
this.product_price = parseFloat(this.product_price) || 0;
this.quantity = parseInt(this.quantity) || 0;
sub_total = this.product_price * this.quantity;
this.totals.push(sub_total);
for (i = 0; i < this.totals.length; i++) {
 grand_total += this.totals[i];
}
return grand_total;

}

 constructor(public db: AngularFireDatabase){
   db.list('/products')
   .valueChanges().subscribe(products=>{
   this.products=products;
   });
  }

plus(product:any) {
  product.nullValue++;
  this.quantity = product.nullValue;
  return this.quantity;
}
    
minus(product:any){ 
 product.nullValue--;
   this.quantity = product.nullValue; 
  return this.quantity;

}

deleteItem(i){
this.items.splice(i,1);
}
 writeValue(): void {

  }
  registerOnChange(): void {
  
  }
  

  registerOnTouched(): void {
  }
  
   setDisabledState(): void {
  }

     ngOnInit(): void {
  
   this.myForm = new FormGroup({
       int: new FormControl()
    });
 
 }
}
