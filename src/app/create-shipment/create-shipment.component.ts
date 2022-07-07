import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { CommonServiceService } from '../commonServices/common-service.service';
import {HttpHeaders  } from '@angular/common/http';
@Component({
  selector: 'app-create-shipment',
  templateUrl: './create-shipment.component.html',
  styleUrls: ['./create-shipment.component.css']
})
export class CreateShipmentComponent implements OnInit {
  pickUpLocation: FormGroup;
  DropLocationGroup: FormGroup;
  isEditable = true;
  constructor(private _formBuilder: FormBuilder,private commonService:CommonServiceService) { }
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
    let user=localStorage.getItem('user')
    this.user=user
    this.userId=JSON.parse(this.user)
    // console.log(this.userId[0])
    // this.onSecondForm(this.userId[0].id)
    this.pickUpLocation = this._formBuilder.group({
      type: "PICK_UP",
      addressStreet: ['', Validators.required],
      name: ['', Validators.required],
      latitude: -34.905988,
      longitude: -56.199592,
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
  onSecondForm() {
    let data = this.DropLocationGroup.value;
    //console.log('-----Team in JSON Format-----');
    const Data = {
      "isTest": false,
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
}
