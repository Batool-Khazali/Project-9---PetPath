import { Component } from '@angular/core';
import { BUrlServicesService } from '../../Batoul/burl-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  isDropdownOpen = false;

  toggleDropdown(event: MouseEvent): void {
    event.preventDefault();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  ngOnInit() { }

  constructor(private _ser: BUrlServicesService, private _route: Router) { }

  logout() {
    this._ser.logout();

    this._route.navigate(["/"])

  }





}
