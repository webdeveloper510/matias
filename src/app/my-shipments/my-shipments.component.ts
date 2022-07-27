import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../commonServices/common-service.service';
import {HttpHeaders  } from '@angular/common/http';

@Component({
  selector: 'app-my-shipments',
  templateUrl: './my-shipments.component.html',
  styleUrls: ['./my-shipments.component.css']
})
export class MyShipmentsComponent implements OnInit {
  constructor(private commonService:CommonServiceService ) {}
user:any=''
userId:any=''
shipments:any=[];
latitude: number;
longitude: number;
location = '';
private geoCoder:any;
option={ 
  componentRestrictions:{ 
    country:["AU"] 
  } 
} 
  ngOnInit(): void {
    let user=localStorage.getItem('user')
    this.user=user
    this.userId=JSON.parse(this.user)
    console.log(this.userId[0])
    this.getShipments(this.userId[0].id)
  }
getShipments(id:any){
  let header = new HttpHeaders().set(
    "token",
    this.userId[0].remember_token
  )
  this.commonService.getShipments(id,header).subscribe((res:any)=>{
    console.log(res)
    // var finalData = res.shipments[0].price.replace(/\\/g, "");
    // console.log(finalData)
     this.shipments=res
  })
}
showmylocation() {
  console.log(navigator);
  navigator.geolocation.getCurrentPosition( pos => {
    console.log(pos)
    this.longitude =  pos.coords.longitude;
    this.latitude = pos.coords.latitude;
    this.getAddress(this.latitude, this.longitude);
  });
}
getAddress(latitude:any, longitude:any) {
  console.log(latitude,longitude)
  this.location=''
  this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results:any, status:any) => {
    if (status === 'OK') {
      console.log(results)
      if (results[0]) {
        // this.address = results[0].formatted_address;                
            this.location = results[0].formatted_address
            // this.locationFormControl.setValue(results[0].formatted_address)
        
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  
  });
}
markerDragEnd($event: any) {
  console.log($event);
  this.latitude = $event.coords.lat;
  this.longitude = $event.coords.lng;
  this.getAddress(this.latitude, this.longitude);
}
}
