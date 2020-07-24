import { Component, OnInit, ViewChild, AfterViewInit, Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'grandtotal'
})

export class GrandTotalPipe implements PipeTransform {

transform(product_price: number, quantity: number) {
  
var totals = [];
var sub_total;
sub_total = product_price * quantity;
totals.push(sub_total);
var i;
var grand_total = 0;
for (i = 0; i < totals.length; i++) {
grand_total += totals[i];
}
return grand_total;
  }
}
