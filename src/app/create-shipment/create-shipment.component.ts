import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-create-shipment',
  templateUrl: './create-shipment.component.html',
  styleUrls: ['./create-shipment.component.css']
})
export class CreateShipmentComponent implements OnInit {
  pickUpLocation: FormGroup;
  DropLocationGroup: FormGroup;
  isEditable = true;
  constructor(private _formBuilder: FormBuilder) { }
  items:{ 
  "categoryId": string,
  "description": string,
  "value": string,
  "volume": string,
  "quantity": string,
  "weight": string
}[]=[]
  ngOnInit(): void {
    this.pickUpLocation = this._formBuilder.group({
      type: "PICK_UP",
      addressStreet: ['', Validators.required],
      name: ['', Validators.required],
      latitude: -34.905988,
      longitude: -56.199592,
      city: ['', Validators.required],
      phone: ['', Validators.required],
      withdrawal: ['', Validators.required],
      date: ['', Validators.required],
      notificationMail: ['', Validators.required],
      "order": 1,
      addressAdditional: ['', Validators.required],
      referenceId: ['', Validators.required],
      instructions: ['', Validators.required],
    });
    this.DropLocationGroup = this._formBuilder.group({
      type: "DROP_OFF",
      latitude: -34.9138414,
      longitude: -56.1837661,
      city: ['', Validators.required],
      phone: ['', Validators.required],
      name: ['', Validators.required],
      instructions: ['', Validators.required],
      addressStreet: ['', Validators.required],
      addressAdditional: ['', Validators.required],   
      drop_withdraw: ['', Validators.required],
      drop_nickname: ['', Validators.required],
      "order": 2

    });
  }
  onFirstForm() {
    let data = this.pickUpLocation.value;
		//console.log('-----Team in JSON Format-----');
		console.log(data);
    console.log(this.items)
}
onSecondForm(){
  let data = this.DropLocationGroup.value; 
		//console.log('-----Team in JSON Format-----');
    const finalData={
      "isTest": false,
      "deliveryTime":  this.pickUpLocation.value.date,
      "notificationMail": this.pickUpLocation.value.notificationMail, 
      "items":this.items,
      "volume": 20.02,
      "weight": 0.8,
      "waypoints": [
        {...this.pickUpLocation.value},
        {...this.DropLocationGroup.value}
      ]
    }
		console.log(finalData);
}
addSection(){
  this.items.push({
    "categoryId": "",
  "description":"",
  "value": "",
  "volume": "",
  "quantity":"",
  "weight": "  "
  })
}
deleteSection(i:any){
  console.log(i)
  this.items.splice(i,1)
}
}
