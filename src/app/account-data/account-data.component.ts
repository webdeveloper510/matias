import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-data',
  templateUrl: './account-data.component.html',
  styleUrls: ['./account-data.component.css']
})
export class AccountDataComponent implements OnInit {
  user:any=''
  userDetails:any
  constructor() { }

  ngOnInit(): void {
    let user=localStorage.getItem('user')
    this.user=user
    this.userDetails=JSON.parse(this.user)
    console.log(this.userDetails)
  }

}
