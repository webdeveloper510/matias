import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HelpComponent } from './help/help.component';
import { HomeComponent } from './home/home.component';
import {CreateShipmentComponent} from './create-shipment/create-shipment.component'
import { MyAddressesComponent } from './my-addresses/my-addresses.component';
import { IntegracionesComponent } from './integraciones/integraciones.component';
import { MyShipmentsComponent } from './my-shipments/my-shipments.component';
import { AccountDataComponent } from './account-data/account-data.component';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SigninFormComponent } from './signin-form/signin-form.component';
import { AuthGuardGuard } from './auth-guard.guard';
// import { MyShipmentsComponent } from './my-shipments/my-shipments.component';

const routes: Routes = [
  {path : '', component : LoginComponent},
  {path : 'createShipment', component : CreateShipmentComponent, canActivate: [AuthGuardGuard]},
  {path : 'login', component : LoginFormComponent},
  {path : 'register', component : SigninFormComponent},
  {path : 'help', component : HelpComponent, canActivate: [AuthGuardGuard]},
  {path : 'address', component : MyAddressesComponent, canActivate: [AuthGuardGuard]},
  {path:'integration',component:IntegracionesComponent, canActivate: [AuthGuardGuard]},
  {path:'my-shipment',component:MyShipmentsComponent, canActivate: [AuthGuardGuard]},
  {path:'account-data',component:AccountDataComponent, canActivate: [AuthGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
