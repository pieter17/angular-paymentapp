import { AuthService } from '../../shared/auth.service';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  errorStr: string[] = [];
  formRegister = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: any) {
    console.log(changes);
    console.log(this.errorStr);
  }

  addUser() {
    this.spinner.show();
    this.authService.register(this.formRegister.value).subscribe(
      (res) => {
        this.spinner.hide();
        this.router.navigate(['/login']);
      },
      (err) => {
        this.spinner.hide();
        if (Array.isArray(err)) {
          let li = document.createElement('li');
          li.textContent = `${err[0]}`;
          let ref = document.getElementById('error');
          ref!.innerHTML = '';
          ref?.appendChild(li);
        } else {
          for (const [key, value] of Object.entries(err)) {
            let li = document.createElement('li');
            li.textContent = `${key}: ${value}`;
            let ref = document.getElementById('error');
            ref!.innerHTML = '';
            ref?.appendChild(li);
          }
        }
      }
    );
  }
}
