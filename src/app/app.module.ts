import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
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
    MyShipmentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
