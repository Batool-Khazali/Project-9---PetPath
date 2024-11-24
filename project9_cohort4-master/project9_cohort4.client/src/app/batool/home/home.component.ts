import { Component } from '@angular/core';
import { BUrlServicesService } from '../../Batoul/burl-services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  ngOnInit() {
    this.getLeatest()
  }

  constructor(private _ser: BUrlServicesService) { }

  leatestArray: any

  getLeatest() {
    this._ser.Latest3Posts().subscribe((data) => {
      this.leatestArray = data
    })
  }




}
