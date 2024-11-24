import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private apiUrl = 'https://localhost:7001/api/Animals1';
  private shelterApiUrl = 'https://localhost:7001/api/Shelters'; 

  constructor(private http: HttpClient) { }

  getAnimals(filters?: { shelterId?: number; breed?: string; age?: number; species?: string }): Observable<any[]> {
    let params = new HttpParams();

    if (filters) {
      if (filters.shelterId !== undefined && filters.shelterId !== null) {
        params = params.append('shelterId', filters.shelterId.toString());
      }
      if (filters.breed) {
        params = params.append('breed', filters.breed);
      }
      if (filters.age !== undefined && filters.age > 0) {
        params = params.append('age', filters.age.toString());
      }
      if (filters.species) {
        params = params.append('species', filters.species);
      }
    }

    return this.http.get<any[]>(`${this.apiUrl}`, { params });
  }

  getAnimalById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getRandomAnimals(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/random`); // Adjust the endpoint as necessary
  }



  getRelatedAnimal(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/random-animals`);
  }

  // New method to get all shelters
  getAllShelters(): Observable<any[]> {
    return this.http.get<any[]>(this.shelterApiUrl);
  }


  deleteShelters(id: any): Observable<any> {
    return this.http.delete<any>(`${this.shelterApiUrl}/${id}`)
  }
}
