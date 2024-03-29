  import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
  import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
  import { NgForm } from '@angular/forms';
  import { CommonServiceService } from '../commonServices/common-service.service';
  import { HttpHeaders } from '@angular/common/http';
  import { AgmCoreModule } from "@agm/core";
  import { MapsAPILoader } from '@agm/core';
import { MatStepper } from '@angular/material/stepper';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
  
  //import {SphericalUtil, PolyUtil} from "node-geometry-library";



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
    zoom: number;
    lat: number = 51.673858;
    log: number = 7.815982;
    lat1: any;
    log1: any;
    formattedaddress = " ";
    longitude: number;
    location = '';
    location1 = '';
    getPrice:any='';
    plateform:any='';
    parcel:any='';
    finalData:any;
    lines:any=[]
    origin:any={}
    destination :any={}
    loading:boolean=false;
    private geoCoder: any;
    @ViewChild('search', { static: false })
    public searchElementRef: ElementRef;
    option = {
      componentRestrictions: {
        country: ["us"]
      }
    }

    constructor(private _formBuilder: FormBuilder, private commonService: CommonServiceService,private mapsAPILoader: MapsAPILoader,
      private toastr: ToastrService, private ngZone: NgZone) {
      this.mapsAPILoader.load().then(() => {
        this.geoCoder = new google.maps.Geocoder;
        console.log(this.geoCoder)
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
    user: any = ''
    userId: any = ''
    ngOnInit(): void {
      this.mapsAPILoader.load().then(() => {
       
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
            this.zoom = 12;
          });
        });
        
      });
      this.setCurrentLocation();
      let user = localStorage.getItem('user');
      this.user = user
      this.userId = JSON.parse(this.user)
      console.log(this.userId[0].id)
    this.latitude =28.645183210587028
    this.longitude =77.21927601704103
    
      // console.log(this.userId[0])
      // this.onSecondForm(this.userId[0].id)
      this.pickUpLocation = this._formBuilder.group({
        type: "PICK_UP",
        addressStreet: [this.location, Validators.required],
         name: ['', Validators.required],

        city: ['', Validators.required],
        phone: ['', [Validators.required, Validators.maxLength(11)]],
        "order": 1,
        instructions: ['', Validators.required],
        // withdrawal: ['', Validators.required],
        date: ['', Validators.required],
        notificationMail:['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        referenceId: ['', Validators.required],
        addressAdditional: ['', Validators.required],
        //referenceId: ['', Validators.required],

      });
      this.DropLocationGroup = this._formBuilder.group({
        type: "DROP_OFF",
        city: ['', Validators.required],
        phone: ['', [Validators.required, Validators.maxLength(11)]],
        name: ['', Validators.required],
        instructions: ['', Validators.required],
        addressStreet: [this.location1, Validators.required],
        addressAdditional: ['', Validators.required],
        //drop_withdraw: ['', Validators.required],
       // drop_nickname: ['', Validators.required],
        "order": 2

      });
    }
    private setCurrentLocation() {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.zoom = 12;
          this.getAddress(this.latitude, this.longitude);
          this.getAddress1(this.latitude, this.longitude);
        });
      }
    }
    weight: any = 0;
    volume: any = 0;
    onFirstForm() {
      let data = this.pickUpLocation.value;
   
      if (this.items.length != 0) {
        for (var i = 0; i < this.items.length; i++) {
          this.weight += this.items[i].weight;
          this.volume += this.items[i].volume
        }
      }

    }
  distanceValue:any=''
    distance(lat1:any, lon1:any, lat2:any, lon2:any, unit:any) {
      if ((lat1 == lat2) && (lon1 == lon2)) {
          this.distanceValue= 0
      }
      else {
          var radlat1 = Math.PI * lat1/180;
          var radlat2 = Math.PI * lat2/180;
          var theta = lon1-lon2;
          var radtheta = Math.PI * theta/180;
          var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
          if (dist > 1) {
              dist = 1;
          }
          dist = Math.acos(dist);
          dist = dist * 180/Math.PI;
          dist = dist * 60 * 1.1515;
          if (unit=="K") { dist = dist * 1.609344 }
          if (unit=="N") { dist = dist * 0.8684 }
          this.distanceValue=dist;
          console.log('distanceValue',this.distanceValue)
      }
  }
test(stepper:MatStepper){
  // console.log(this.pickUpLocation)
  console.log(this.pickUpLocation.valid,this.items.length)
  if(this.items.length!=0 && this.pickUpLocation.valid){
    stepper.next()
  }
  else if(!this.pickUpLocation.valid){
    this.toastr.error('Please fill all form Fields')
  }
  else if(this.items.length==0){
   this.toastr.error('Please add some items')
  }
  else{
    this.toastr.error('Something went wrong')
  }
}
submit(){
  console.log(this.items)
}
    AddressChange(address: any) {
      this.latitude= address.geometry.location.lat();
      this.longitude= address.geometry.location.lng()
      this.lat = address.geometry.location.lat()
      this.log = address.geometry.location.lng()
      //setting address from API to local variable 
      this.formattedaddress = address.formatted_address
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
    public  centerChanged(coords: any) {
      this.latitude = coords.lat;
      this.longitude = coords.lng;
    }
    public  centerChanged1(coords: any) {
      this.lat1 = coords.lat;
      this.log1 = coords.lng;
    }
    AddressChange1(address: any) {
      this.lat1 = address.geometry.location.lat()
      this.log1 = address.geometry.location.lng()
      // console.log(address.geometry.location.lat())
      // console.log(address.geometry.location.lng())
      //setting address from API to local variable 
      this.formattedaddress = address.formatted_address
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
        "volume": this.volume,
        "weight": this.weight,
        "referenceId": this.pickUpLocation.value.referenceId,
        "user_id":this.userId[0].id,

      }
      delete this.pickUpLocation.value.date,
        delete this.pickUpLocation.value.notificationMail
      delete this.pickUpLocation.value.referenceId
      const finalData = {
        ...Data,
        "waypoints": [
          {
            ...this.pickUpLocation.value,
            latitude: this.lat,
            longitude: this.log,
          },
          {
            ...this.DropLocationGroup.value,
            latitude: this.lat1,
            longitude: this.log1
          }
        ]
      }
      this.distance(this.lat,this.log,this.lat1,this.log1,"K")
  this.lines=[{
    "latitude":this.lat,
    "longitude":this.log,
  },{
    "latitude":this.lat1,
    "longitude":this.log1,
  }]
  this.origin={
    "lat":this.lat,
    "lng":this.log,
  },
  this.destination={
    "lat":this.lat1,
    "lng":this.log1,
  }
  const pickupPoint = new google.maps.LatLng(this.lat,this.log);
  const dropPoint = new google.maps.LatLng(this.lat1, this.log1);
  // let response = google.maps.geometry.spherical.computeDistanceBetween(
  //   pickupPoint, //from object {lat, lng}
  //   dropPoint // to object {lat, lng}
  // );
  // console.log(response)

      this.finalData=finalData;
      this.eastimateShipping(finalData)

    }
    eastimateShipping(finalData: any,) {
      this.loading=true;  
      let header = new HttpHeaders().set(
        "token",
        this.userId[0].remember_token
      )
      this.commonService.createShipments(finalData, header).subscribe((res: any) => {
        console.log(res);
        if(res){
          this.getPrice=res.user.price.total
          this.parcel= res.parcel
          this.plateform = res.plateform
          this.loading=false
        }
      })
    }
    createShipments(){
      let header = new HttpHeaders().set(
        "token",
        this.userId[0].remember_token
      ) 
      let data={
        ...this.finalData,
        "plateform":this.plateform,
        'parcel':this.parcel
      }
    // return false;
      this.commonService.createFinalShipment(data, header).subscribe((res: any) => {
        if(res.Code==200){
          alert(res.message);
        }
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
      navigator.geolocation.getCurrentPosition(pos => {
        console.log(pos)
        this.longitude = pos.coords.longitude;
        this.latitude = pos.coords.latitude;
        this.getAddress(this.latitude, this.longitude);
      });
    }
    getAddress(latitude: any, longitude: any) {
      console.log("1", latitude, longitude)
      this.lat = latitude;
      this.log = longitude;
      this.location = ''
      this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results: any, status: any) => {
        if (status === 'OK') {
          console.log(results)
          if (results[0]) {
            // this.address = results[0].formatted_address;                
            this.location = results[0].formatted_address
            this.pickUpLocation.patchValue({
              addressStreet: this.location
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
      this.longitude = $event.latLng.lng();
      this.lat = $event.latLng.lat();
      this.log = $event.latLng.lng();
      this.getAddress(this.latitude, this.longitude);
    }
    markerDragEnd1($event: google.maps.MouseEvent) {
      console.log($event);
      this.latitude = $event.latLng.lat();
      this.longitude = $event.latLng.lng();
      this.lat1 = $event.latLng.lat();
      this.log1 = $event.latLng.lng();
      this.getAddress1(this.latitude, this.longitude);
    }
    getAddress1(latitude: any, longitude: any) {
      console.log(latitude, longitude)
      this.lat1 = latitude;
      this.log1 = longitude;
      this.location1 = ''
      this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results: any, status: any) => {
        if (status === 'OK') {
          console.log(results)
          if (results[0]) {
            // this.address = results[0].formatted_address;                
            this.location1 = results[0].formatted_address
            this.DropLocationGroup.patchValue({
              addressStreet: this.location1
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
