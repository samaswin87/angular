import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../core/api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidLogin: boolean = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const loginPayload = {
      userName: this.loginForm.controls.userName.value,
      password: this.loginForm.controls.password.value
    }
    this.apiService.login(loginPayload).subscribe(data => {
      if(data.status === 200) {
        window.localStorage.setItem('token', data.result.token);
        this.router.navigate(['list-user']);
      }else {
        this.invalidLogin = true;
        alert(data.message);
      }
    });
  }

  ngOnInit() {
    window.localStorage.removeItem('token');
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }

}