import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonServiceService } from '../commonServices/common-service.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
showLoginForm:boolean=false;
loginForm:FormGroup;
  constructor( private commonService:CommonServiceService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }
  showLoginPage(){
this.showLoginForm=true
console.log(this.showLoginForm)
  }
  loginFormSubmit(){
console.log(this.loginForm.value)
this.commonService.login(this.loginForm.value).subscribe((res:any)=>{
  console.log(res)
})
  }
}
