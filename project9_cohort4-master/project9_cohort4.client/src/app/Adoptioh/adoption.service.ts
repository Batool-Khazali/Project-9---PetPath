import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdoptionService {
  private baseUrl = 'https://localhost:7001/api/AdoptionApplications';
  private animalUrl = 'https://localhost:7001/api/Animals'; // Base URL for animals API

  constructor(private http: HttpClient) { }

  submitAdoptionRequest(adoptionDetails: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, adoptionDetails);
  }

  sendAdoptionEmail(userEmail: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/send-email`, { userEmail });
  }

  // New method to fetch related animals
  getRelatedAnimals(shelterId: number, species: string): Observable<any[]> {
    const params = { shelterId: shelterId.toString(), species };
    return this.http.get<any[]>(`${this.animalUrl}/related`, { params });
  }

  ///////////////////////// for dashboard

  GetAllAdoptionApplications(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/allAdoptionRequestsForAdmin`)
  }


  acceptAdoption(animalId: any, requestId: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/acceptAdoption/${animalId}/${requestId}`, {})
  }








}
