import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShelterService {

  private apiUrl = 'https://localhost:7001/api/Shelters';

  constructor(private http: HttpClient) { }

  // Fetch all shelters
  getShelters(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Fetch a shelter by ID
  getShelterById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Add a new shelter
  addShelter(shelter: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, shelter);
  }

  // Update an existing shelter
  updateShelter(shelter: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${shelter.shelterId}`, shelter);
  }

  // Delete a shelter by ID
  deleteShelter(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
