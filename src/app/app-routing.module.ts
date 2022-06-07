import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HelpComponent } from './help/help.component';
import { HomeComponent } from './home/home.component';
import {CreateShipmentComponent} from './create-shipment/create-shipment.component'
import { MyAddressesComponent } from './my-addresses/my-addresses.component';
import { IntegracionesComponent } from './integraciones/integraciones.component';
import { MyShipmentsComponent } from './my-shipments/my-shipments.component';

const routes: Routes = [
  {path : '', component : CreateShipmentComponent},
  {path : 'help', component : HelpComponent},
  {path : 'address', component : MyAddressesComponent},
  {path:'integration',component:IntegracionesComponent},
  {path:'my-shipment',component:MyShipmentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
