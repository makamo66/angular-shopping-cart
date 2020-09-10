import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AuthService } from './shared/auth.service';
import { FormsModule, FormControl, ReactiveFormsModule, NgForm } from '@angular/forms';
import { CheckOutComponent } from './check-out/check-out.component';
//import { OrdersComponent } from './orders/orders.component';
//import { OrderListComponent } from './order-list/order-list.component';
//import { ReactiveFormsComponent } from './reactive-forms.component';
//import { ReactiveFormsModule } from "@angular/forms";
import { OrdersService } from "./service/orders.service";
import { CrudService } from "./service/crud.service";
import { AngularFirestore } from 'angularfire2/firestore';
import { RouterModule } from '@angular/router';
//import { ReactiveFormsComponent } from './reactive-forms.component';
import { HttpClientModule } from '@angular/common/http';
//import { ShoppingCartModule } from './shopping-cart/shopping-cart-routing.module';

@NgModule({
  declarations: [
    AppComponent,
	ShoppingCartComponent,
	CheckOutComponent 
	//GrandTotalPipe,
	//ReactiveFormsComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
	AppRoutingModule,
	ReactiveFormsModule,
	  HttpClientModule,
    FormsModule,
 RouterModule,
	 AppRoutingModule,
	     RouterModule.forRoot([
      {
        path: 'check-out',
        component: CheckOutComponent
      }
    ])
  ],
providers: [AuthService,
AngularFirestore],
  bootstrap: [AppComponent ]
  
})
export class AppModule { }
