import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShelterService {

  private apiUrl = 'https://localhost:7001/api/Shelters';
  constructor(private http: HttpClient) { }


  getShelters(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getAllShelters(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  updateShelter(shelter: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${shelter.shelterId}`, shelter);
  }

  deleteShelter(shelterId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${shelterId}`);
  }



  getShelterById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
