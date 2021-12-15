import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  submit() {
    this.spinner.show();
    this.authService.login(this.registerForm.value).subscribe(
      (res) => {
        if (res) {
          this.spinner.hide();
          this.authService.setAuthorizationToken(res.token, res.refreshToken);
          this.registerForm.reset();
          this.router.navigate(['/home']);
        }
      },
      (err) => {
        if (Array.isArray(err)) {
          this.spinner.hide();
          let li = document.createElement('li');
          li.textContent = `${err[0]}`;
          let ref = document.getElementById('errorlog');
          ref!.innerHTML = '';
          ref?.appendChild(li);
        } else {
          this.spinner.hide();
          console.log(err);
          for (const [key, value] of Object.entries(err)) {
            let li = document.createElement('li');
            li.textContent = `${key}: ${value}`;
            let ref = document.getElementById('errorlog');
            ref!.innerHTML = '';
            ref?.appendChild(li);
          }
        }
      }
    );
    // this.authService.testToken();
  }
}
