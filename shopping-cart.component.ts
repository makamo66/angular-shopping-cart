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

items = [];
//items  : any[];
products: any[];
quantity: number;

product_price: number;

totals = [];

isSubmitted : boolean;

storageKey = 'MyDataStorageKey';

public onSubmit(thumbnail, quantity, product_name, product_price){

this.product_price = parseFloat(product_price);

const data = {
   thumbnail,
   quantity,
   product_name,
   product_price
};

this.items.push(data);
localStorage.setItem(this.storageKey, JSON.stringify(this.items));
this.isSubmitted = true;
}

get grandTotal() {

let i;
let sub_total = 0;
let grand_total = 0;
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

console.log("took away condition");
}


 writeValue(): void {

  }
  registerOnChange(): void {
  
  }
  

  registerOnTouched(): void {
  }
  
   setDisabledState(): void {
  }
getStorageItems(): any[] {
    try {
        return JSON.parse(localStorage.getItem('items'));
    } catch(err) {
        console.warn(err);
        return [];
    }
}

setStorageItems(items: any[]) {
    localStorage.setItem('items', JSON.stringify(items));
}
ngOnInit(): void {
   this.myForm = new FormGroup({
       int: new FormControl()
    });
	this.items.length = 0;
   this.items = this.getStorageItems();
 }
 
   ngAfterContentChecked() {
    this.cd.detectChanges();
  } 
  ngAfterViewInit() {
this.cd.detectChanges();
}
    

}
