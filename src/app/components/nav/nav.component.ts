import { AuthService } from './../../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  logout() {
    if (confirm('are you sure want to logout ? ')) {
      this.authService.removeStorage();
      this.router.navigate(['/login']);
    }
  }
}
