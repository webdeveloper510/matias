import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonServiceService } from '../commonServices/common-service.service';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.css']
})
export class SigninFormComponent implements OnInit {
  showRegisterForm:boolean=false;
  registerForm:FormGroup;
    constructor( private commonService:CommonServiceService,private router:Router) { }
  
    ngOnInit(): void {
      this.registerForm = new FormGroup({
        name: new FormControl(''),
        email: new FormControl(''),
        password: new FormControl('')
      });
    }
    showRegisterPage(){
  this.showRegisterForm=true
  console.log(this.showRegisterForm)
    }
    register(){
  console.log(this.registerForm.value)
  this.commonService.register(this.registerForm.value).subscribe((res:any)=>{
    console.log(res)
    if(res.status=="success"){
      this.router.navigate(['login'])
    }
  })
    }
    back(){
      this.router.navigate([''])
    }
}
