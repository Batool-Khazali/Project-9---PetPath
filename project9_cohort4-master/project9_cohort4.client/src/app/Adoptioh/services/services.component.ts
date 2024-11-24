import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// service.model.ts (or wherever your Service interface is defined)
export interface Service {
  serviceId: string;
  serviceName: string;
  description: string;
  image: string; // Make sure to include this property
}


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchServices();
  }


  fetchServices(): void {
 
    this.getServices().subscribe(
      data => {
        this.services = data;
      },
      error => {
        console.error('Error fetching services:', error); 
      }
    );
  }


  private getServices(): Observable<Service[]> {
    return this.http.get<Service[]>('https://localhost:7001/api/services');
  }
}
