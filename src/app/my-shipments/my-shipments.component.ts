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
shipments:any=[]
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
    console.log(res.shipments)
    this.shipments=res.shipments
  })
}

}
