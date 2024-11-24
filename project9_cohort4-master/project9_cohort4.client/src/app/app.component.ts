import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BUrlServicesService } from './Batoul/burl-services.service';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  check: any 
  checkLS: any

  constructor(private http: HttpClient, private _ser: BUrlServicesService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {

    this._ser.isAdminObs.subscribe((data) => {
      this.check = data
      console.log("bs: ", this.check)
      console.log("data: ", data)
      this.cdr.detectChanges();
    })

    this.checkLS = localStorage.getItem("isAdmin")
    console.log("ls: ", this.checkLS)

  
  }

  title = 'project9_cohort4.client';
}
