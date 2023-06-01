import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {
    if(localStorage.getItem('userwuewwoeV1') != 'null' && localStorage.getItem('userwuewwoeV1') != undefined) {
      this.router.navigate(['/']);
    }
  }


  ngOnInit(): void {
    this.intializeForm();
  }

  intializeForm() {
    this.loginForm = this.fb.group({
       email: ['', Validators.compose([Validators.required])],
       password: ['',  Validators.compose([Validators.required])]
    })
  }

  onSubmit() {
    if(this.loginForm.invalid) {
      return;
    }
    let token = this.randomToken();
    localStorage.setItem('userwuewwoeV1', token);
    this.router.navigate(['/']);
  }


  randomToken() {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ' ';

    const charactersLength = characters.length;
    for ( let i = 0; i < 24; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  public controlError = (controlName: string, errorName: string) =>{
    return this.loginForm.controls[controlName].hasError(errorName);
  }
}
