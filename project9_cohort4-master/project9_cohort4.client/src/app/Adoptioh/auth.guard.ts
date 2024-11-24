import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BUrlServicesService } from '../Batoul/burl-services.service'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: BUrlServicesService, private router: Router) { }

  canActivate(): boolean {
    const isLoggedIn = this.authService.isLoggedIn(); // Use the new method here
    if (!isLoggedIn) {
      // If the user is not logged in, navigate to the login page
      this.router.navigate(['/login']);
    }
    return isLoggedIn;
  }
}
