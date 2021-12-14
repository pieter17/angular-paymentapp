import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let result: any = await this.auth.refreshToken().toPromise();
    if (result['success']) return true;

    window.alert('You are not authenticated. Please sign in first.');
    // this.showToaster();
    this.router.navigate(['/login']);

    return false;
  }

  showToaster() {
    this.toastr.success('You are not authenticated. Please sign in first.');
  }
}
