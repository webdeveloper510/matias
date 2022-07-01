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
    });
    this.DropLocationGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }
  onFirstForm(form: NgForm) {
    let data = this.pickUpLocation.value;
		console.log('-----Team in JSON Format-----');
		console.log(data);
}
onSecondfsForm(form: NgForm){
  let data = this.DropLocationGroup.value; 
		console.log('-----Team in JSON Format-----');
		console.log(data);
}
}
