import { Component, OnInit,ViewChild,ElementRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { CommonServiceService } from '../commonServices/common-service.service';
import {HttpHeaders  } from '@angular/common/http';
import { MapsAPILoader } from '@agm/core';
@Component({
  selector: 'app-create-shipment',
  templateUrl: './create-shipment.component.html',
  styleUrls: ['./create-shipment.component.css']
})
export class CreateShipmentComponent implements OnInit {
  pickUpLocation: FormGroup;
  DropLocationGroup: FormGroup;
  isEditable = true;
  latitude: number;
  zoom:number;
  formattedaddress=" "; 
longitude: number;
location = '';
location1 = '';
private geoCoder:any;
@ViewChild('search',{static: false})
public searchElementRef: ElementRef;
option={ 
  componentRestrictions:{ 
    country:["us"] 
  } 
} 
 
  constructor(private _formBuilder: FormBuilder,private commonService:CommonServiceService,  private mapsAPILoader: MapsAPILoader, private ngZone:NgZone) {
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
    });
   }
  items: {
    "categoryId": string,
    "description": string,
    "value": string,
    "volume": string,
    "quantity": string,
    "weight": string
  }[] = []
  user:any=''
userId:any=''
  ngOnInit(): void {
    let user=localStorage.getItem('user');
    this.user=user
    this.userId=JSON.parse(this.user)
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 15;
        });
      });
    });
    // console.log(this.userId[0])
    // this.onSecondForm(this.userId[0].id)
    this.pickUpLocation = this._formBuilder.group({
      type: "PICK_UP",
      addressStreet: [this.location, Validators.required],
      name: ['', Validators.required],
      latitude: -33.4249838,
      longitude:  -70.6051579,
      city: ['', Validators.required],
      phone: ['', Validators.required],
      "order": 1,
      instructions: ['', Validators.required],
      // withdrawal: ['', Validators.required],
      date: ['', Validators.required],
      notificationMail: ['', Validators.required],
      referenceId:['',Validators.required],
      addressAdditional: ['', Validators.required],
      //referenceId: ['', Validators.required],

    });
    this.DropLocationGroup = this._formBuilder.group({
      type: "DROP_OFF",
      latitude: -33.4268146,
      longitude: -70.5869082,
      city: ['', Validators.required],
      phone: ['', Validators.required],
      name: ['', Validators.required],
      instructions: ['', Validators.required],
      addressStreet: [this.location1, Validators.required],
      addressAdditional: ['', Validators.required],
      drop_withdraw: ['', Validators.required],
      drop_nickname: ['', Validators.required],
      "order": 2

    });
  }
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
        this.getAddress(this.latitude, this.longitude);
        this.getAddress1(this.latitude, this.longitude);
      });
    }
  }

  onFirstForm() {
    let data = this.pickUpLocation.value;
    //console.log('-----Team in JSON Format-----');
    console.log(data);
    console.log(this.items)
  }
  AddressChange(address: any) { 
    console.log(address)
    //setting address from API to local variable 
     this.formattedaddress=address.formatted_address 
     this.location = address.formatted_address 
     for (var i = 0; i < address.address_components.length; i++) {
      var addressType = address.address_components[i].types[0];
      if (addressType == "locality") {
        this.location = address.address_components[i].long_name + ', ';
      }
      if (addressType == "administrative_area_level_1") {
        this.location += address.address_components[i].short_name;
      }
    }
  } 
  AddressChange1(address: any) { 
    console.log(address)
    //setting address from API to local variable 
     this.formattedaddress=address.formatted_address 
     this.location1 = address.formatted_address 
     for (var i = 0; i < address.address_components.length; i++) {
      var addressType = address.address_components[i].types[0];
      if (addressType == "locality") {
        this.location1 = address.address_components[i].long_name + ', ';
      }
      if (addressType == "administrative_area_level_1") {
        this.location1 += address.address_components[i].short_name;
      }
    }
  } 
  onSecondForm() {
    let data = this.DropLocationGroup.value;
    //console.log('-----Team in JSON Format-----');
    const Data = {
      "isTest": true,
      "deliveryTime": this.pickUpLocation.value.date,
      "notificationMail": this.pickUpLocation.value.notificationMail,
      "items": this.items,
      "volume": 20.02,
      "weight": 0.8,
      "referenceId":this.pickUpLocation.value.referenceId

    }
    delete this.pickUpLocation.value.date,
    delete this.pickUpLocation.value.notificationMail
    delete this.pickUpLocation.value.referenceId
    const finalData = {
      ...Data,
      "waypoints": [
        this.pickUpLocation.value,
        this.DropLocationGroup.value
      ]
    }

    console.log(finalData);
    this.createShipment(finalData)
  }
  createShipment(finalData:any,){
    let header = new HttpHeaders().set(
      "token",
      this.userId[0].remember_token
    )
    this.commonService.createShipments(finalData,header).subscribe((res:any)=>{
      console.log(res)
    })
  }
  addSection() {
    this.items.push({
      "categoryId": "",
      "description": "",
      "value": "",
      "volume": "",
      "quantity": "",
      "weight": "  "
    })
  }
  deleteSection(i: any) {
    console.log(i)
    this.items.splice(i, 1)
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
              this.pickUpLocation.patchValue({
                addressStreet:this.location
              });
              // this.locationFormControl.setValue(results[0].formatted_address)
          
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    
    });
  }
  markerDragEnd($event: google.maps.MouseEvent) {
    console.log($event);
    this.latitude = $event.latLng.lat();
    this.longitude =  $event.latLng.lng();
    this.getAddress(this.latitude, this.longitude);
  }
  markerDragEnd1($event: google.maps.MouseEvent) {
    console.log($event);
    this.latitude = $event.latLng.lat();
    this.longitude =  $event.latLng.lng();
    this.getAddress1(this.latitude, this.longitude);
  }
  getAddress1(latitude:any, longitude:any) {
    console.log(latitude,longitude)
    this.location1=''
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results:any, status:any) => {
      if (status === 'OK') {
        console.log(results)
        if (results[0]) {
          // this.address = results[0].formatted_address;                
              this.location1 = results[0].formatted_address
              this.DropLocationGroup.patchValue({
                addressStreet:this.location1
              });
              // this.locationFormControl.setValue(results[0].formatted_address)
          
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    
    });
  }
}
