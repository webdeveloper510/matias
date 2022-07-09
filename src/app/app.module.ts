import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { HelpComponent } from './help/help.component';
import { IntegracionesComponent } from './integraciones/integraciones.component';
import { AccountDataComponent } from './account-data/account-data.component';
import { MyAddressesComponent } from './my-addresses/my-addresses.component';
import { CreateShipmentComponent } from './create-shipment/create-shipment.component';
import { MyShipmentsComponent } from './my-shipments/my-shipments.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatStepperModule} from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SigninFormComponent } from './signin-form/signin-form.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { AgmCoreModule } from '@agm/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    HelpComponent,
    IntegracionesComponent,
    AccountDataComponent,
    MyAddressesComponent,
    CreateShipmentComponent,
    MyShipmentsComponent,
    LoginComponent,
    RegisterComponent,
    LoginFormComponent,
    SigninFormComponent
  ],
  imports: [
    MatAutocompleteModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule ,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MatDatepickerModule,
    GooglePlaceModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBEHpF_vwT30zqVUryq8-ryr6t0LPgkQbE'
    })
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
