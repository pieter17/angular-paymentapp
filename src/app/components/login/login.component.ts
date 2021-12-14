import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  submit() {
    this.authService.login(this.registerForm.value).subscribe(
      (res) => {
        if (res) {
          this.authService.setAuthorizationToken(res.token, res.refreshToken);
          this.registerForm.reset();
          this.router.navigate(['/home']);
        }
      },
      (err) => {
        if (Array.isArray(err)) {
          let li = document.createElement('li');
          li.textContent = `${err[0]}`;
          let ref = document.getElementById('errorlog');
          ref!.innerHTML = '';
          ref?.appendChild(li);
        } else {
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
