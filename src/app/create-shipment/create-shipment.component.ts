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

  ngOnInit(): void {
    this.pickUpLocation = this._formBuilder.group({
      address: ['', Validators.required],
      name: ['', Validators.required],
      withdrawal: ['', Validators.required],
      telephone: ['', Validators.required],
      who_asking: ['', Validators.required],
      additional_info: ['', Validators.required],
      ordernumber: ['', Validators.required],
      date: ['', Validators.required],

    });
    this.DropLocationGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
      drop_address: ['', Validators.required],
      drop_additional_info: ['', Validators.required],
      drop_who_asking: ['', Validators.required],
      drop_telephone: ['', Validators.required],
      drop_withdraw: ['', Validators.required],
      drop_nickname: ['', Validators.required],

    });
  }
  onFirstForm() {
    let data = this.pickUpLocation.value;
		//console.log('-----Team in JSON Format-----');
		console.log(data);
}
onSecondForm(){
  let data = this.DropLocationGroup.value; 
		//console.log('-----Team in JSON Format-----');
		console.log(data);
}
}
