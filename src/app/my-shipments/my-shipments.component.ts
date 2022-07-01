import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-my-shipments',
  templateUrl: './my-shipments.component.html',
  styleUrls: ['./my-shipments.component.css']
})
export class MyShipmentsComponent implements OnInit {
  constructor() { }
userId:any=''
  ngOnInit(): void {
    const user=localStorage.getItem('user')
    console.log('user',localStorage.getItem('user'))
    alert(localStorage.getItem('user'))
  }


}
