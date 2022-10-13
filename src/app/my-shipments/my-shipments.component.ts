import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../commonServices/common-service.service';
import { HttpHeaders } from '@angular/common/http';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-my-shipments',
  templateUrl: './my-shipments.component.html',
  styleUrls: ['./my-shipments.component.css']
})
export class MyShipmentsComponent implements OnInit {
  constructor(private commonService: CommonServiceService, private mapsAPILoader: MapsAPILoader) {
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
      console.log(this.geoCoder)
    });
  }

  user: any = ''
  userId: any = ''
  shipmentDetails: any = {};
  shipmentId:any='';
  shipmentType:any={};
  shipments: any = [];
  latitude: number;
  longitude: number;
  location = '';
  deliveryData:any={};
  private geoCoder: any;
  option = {
    componentRestrictions: {
      country: ["AU"]
    }
  }
  status: boolean = false;
  id: number;
clickEvent(id:any){
  console.log(id)
    this.id = id
    this.status = !this.status;       
}
  ngOnInit(): void {
    let user = localStorage.getItem('user')
    this.user = user
    this.userId = JSON.parse(this.user)
    console.log(this.userId[0])
    this.getShipments(this.userId[0].id)
  }
  origin: any = {};
  destination: any = {};
  getShipments(id: any) {
    let header = new HttpHeaders().set(
      "token",
      this.userId[0].remember_token
    )
    this.commonService.getShipments(id, header).subscribe((res: any) => {

      console.log(res.response)
      // var finalData = res.shipments[0].price.replace(/\\/g, "");
      // console.log(finalData)
      this.shipments = res.response
      this.shipmentDetails = res.response[0].waypoints
      this.latitude = this.shipmentDetails[0].latitude
      this.longitude = this.shipmentDetails[0].longitude
      this.mapsAPILoader.load().then(() => {
        this.setCurrentLocation(this.latitude, this.longitude);
        this.geoCoder = new google.maps.Geocoder;
      });
      console.log(this.latitude, this.longitude)
      this.origin = {
        "lat": this.latitude,
        "lng": this.longitude,
      },
        this.destination = {
          "lat": this.shipmentDetails[1].latitude,
          "lng": this.shipmentDetails[1].longitude,
        }
      this.distance(this.shipmentDetails[0].latitude, this.shipmentDetails[0].longitude, this.shipmentDetails[1].latitude, this.shipmentDetails[1].longitude, "K")

      //  console.log(res[0].waypoints)
    })
  }
  private setCurrentLocation(lat: any, long: any) {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = lat;
        this.longitude = long;
        // this.getAddress(this.latitude, this.longitude);
        // this.getAddress1(this.latitude, this.longitude);
      });
    }
  }
  waypointDetails(shipment: any, id: any) {
    console.log(shipment, id)
    this.shipmentId=id
    this.shipmentType=shipment.type
    this.shipmentDetails = shipment.waypoints
    console.log(this.shipmentDetails)
    this.latitude = this.shipmentDetails[0].latitude;
    this.longitude = this.shipmentDetails[0].longitude
    this.origin = {
      "lat": this.shipmentDetails[0].latitude,
      "lng": this.shipmentDetails[0].longitude,
    },
      this.destination = {
        "lat": this.shipmentDetails[1].latitude,
        "lng": this.shipmentDetails[1].longitude,
      }
    this.distance(this.shipmentDetails[0].latitude, this.shipmentDetails[0].longitude, this.shipmentDetails[1].latitude, this.shipmentDetails[1].longitude, "K")
  }

  showmylocation() {
    console.log(navigator);
    navigator.geolocation.getCurrentPosition(pos => {
      console.log(pos)
      this.longitude = pos.coords.longitude;
      this.latitude = pos.coords.latitude;
      this.getAddress(this.latitude, this.longitude);
    });
  }
  getAddress(latitude: any, longitude: any) {
    console.log(latitude, longitude)
    this.location = ''
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results: any, status: any) => {
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
  distanceValue: any = ''
  distance(lat1: any, lon1: any, lat2: any, lon2: any, unit: any) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      this.distanceValue = 0
    }
    else {
      var radlat1 = Math.PI * lat1 / 180;
      var radlat2 = Math.PI * lat2 / 180;
      var theta = lon1 - lon2;
      var radtheta = Math.PI * theta / 180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == "K") { dist = dist * 1.609344 }
      if (unit == "N") { dist = dist * 0.8684 }
      this.distanceValue = dist;
      console.log('distanceValue', this.distanceValue)
    }
  }
  markerDragEnd($event: any) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }
  proofDetails(){
    console.log('here',this.shipmentId)
    console.log('here',this.shipmentType)
    let header = new HttpHeaders().set(
      "token",
      this.userId[0].remember_token
    )
    let data={
     "id":this.shipmentId,
      //  "id":'17632210031436180777133',
      "type":this.shipmentType
    }
    this.commonService.getProof(data,header).subscribe((res:any)=>{
      console.log(res.image)
      this.deliveryData=res;
    })
  }
}
