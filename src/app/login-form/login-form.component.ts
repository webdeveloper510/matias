import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonServiceService } from '../commonServices/common-service.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  showLoginForm: boolean = false;
  loginForm: FormGroup;
  constructor(private commonService: CommonServiceService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
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
  showLoginPage() {
    this.showLoginForm = true
  }
  loginFormSubmit() {
    console.log(this.loginForm.value)
    this.commonService.login(this.loginForm.value).subscribe((res: any) => {

      console.log(res)
      localStorage.setItem('user', JSON.stringify(res.user))
      this.showSuccess('sucess', 'User Login Successfully')
      if (res.status == "success") {
        this.router.navigate(['/createShipment'])
      }
    }, (error: HttpErrorResponse) => {
      this.showSuccess('error', error.error.message)
      console.log(error.error.message)
    }
    )
  }
  back() {
    this.router.navigate([''])
  }
}
