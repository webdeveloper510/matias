import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonServiceService } from '../commonServices/common-service.service';  
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.css']
})
export class SigninFormComponent implements OnInit {
  showRegisterForm: boolean = false;
  registerForm: FormGroup;
  constructor(private commonService: CommonServiceService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      surname: new FormControl(''),
      billingAddress: new FormControl(''),
      telephone: new FormControl(''),
      bussinessName: new FormControl(''),
      tradeName: new FormControl(''),
      ruc: new FormControl(''),
      turn: new FormControl('')
    });
  }
  showSuccess(type: any, message: any) {
    if (type == 'sucess') {
      this.toastr.success(message, '');
    }
    else {
      this.toastr.error(message, '');
    }
  }
  showRegisterPage() {
    this.showRegisterForm = true
    console.log(this.showRegisterForm)
  }
  register() {
    console.log(this.registerForm.value)
    this.commonService.register(this.registerForm.value).subscribe((res: any) => {
      console.log(res)
      this.showSuccess('sucess', 'User Register Successfully')
      if (res.status == "success") {
        this.router.navigate(['login'])
      }
    }, (error: HttpErrorResponse) => {
      this.showSuccess('error', error.error.message)
      console.log(error.error.message)
    })
  }
  back() {
    this.router.navigate([''])
  }
}
