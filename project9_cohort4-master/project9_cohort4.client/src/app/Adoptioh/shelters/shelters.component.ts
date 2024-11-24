import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../../Adoptioh/animals.service'; 

@Component({
  selector: 'app-shelters',
  templateUrl: './shelters.component.html',
  styleUrls: ['./shelters.component.css']
})
export class SheltersComponent implements OnInit {
  shelters: Shelter[] = [];

  constructor(private animalService: AnimalService) { }

  ngOnInit(): void {
    this.fetchShelters();
  }

  fetchShelters(): void {
    this.animalService.getAllShelters().subscribe(
      (data: Shelter[]) => {
        this.shelters = data;
      },
      (error) => {
        console.error('Error fetching shelters:', error);
      }
    );
  }
}

// Interface for Shelter inside the same file
export interface Shelter {
  shelterId: number;
  shelterName: string;
  description?: string;
  contactEmail?: string;
  contactPhone?: string;
  openTime?: string;
  closeTime?: string;
  openDay?: string;
  address?: string;
}
