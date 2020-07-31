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

//import { ReactiveFormsComponent } from './reactive-forms.component';


@NgModule({
  declarations: [
    AppComponent,
	ShoppingCartComponent,
	//GrandTotalPipe,
	//ReactiveFormsComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
	AppRoutingModule,
	ReactiveFormsModule,
    FormsModule 
  ],
providers: [AuthService],
  bootstrap: [AppComponent ]
})
export class AppModule { 

}
