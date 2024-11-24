import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../../Adoptioh/animals.service';
import { ShelterService } from '../../Adoptioh/shelter.service';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent implements OnInit {

  animals: any[] = [];
  displayedAnimals: any[] = [];
  shelters: any[] = [];
  speciesList: string[] = ['Dog', 'Cat', 'Bird', 'Rabbit'];
  selectedShelter: number | null = null;
  selectedSpecies: string = '';
  searchTerm: string = '';
  selectedBreed: string = '';
  selectedAge: number = 0;
  selectedSort: string = 'default';
  currentPage: number = 1;
  pageSize: number = 12;
  totalItems: number = 0;
  totalPages: number = 0;
  Math = Math;
  activeSpecies: string | null = null;

 
  constructor(private animalService: AnimalService, private shelterService: ShelterService) { }

  ngOnInit(): void {
    this.fetchAnimals();
    this.fetchShelters();
  }

  fetchAnimals(): void {
    const filters = {
      shelterId: this.selectedShelter !== null ? this.selectedShelter : undefined,
      species: this.selectedSpecies || undefined,
      breed: this.selectedBreed || undefined,
      age: this.selectedAge > 0 ? this.selectedAge : undefined
    };

    this.animalService.getAnimals(filters).subscribe((data: any[]) => {
      this.animals = data;
      this.totalItems = this.animals.length;
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
      this.updateDisplayedAnimals();
    });
  }

  fetchShelters(): void {
    this.shelterService.getShelters().subscribe((data: any[]) => {
      this.shelters = data;
    });
  }

  updateDisplayedAnimals(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = this.currentPage * this.pageSize;

    let filteredAnimals = [...this.animals];

    if (this.selectedSpecies) {
      filteredAnimals = filteredAnimals.filter(animal => animal.species === this.selectedSpecies);
    }

    if (this.searchTerm.trim()) {
      filteredAnimals = filteredAnimals.filter(animal =>
        animal.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    this.totalItems = filteredAnimals.length;
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    this.displayedAnimals = filteredAnimals.slice(start, end);
  }

  setPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedAnimals();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedAnimals();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedAnimals();
    }
  }

  paginationRange(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  sortAnimals(): void {
    switch (this.selectedSort) {
      case 'newest':
        this.animals.sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime());
        break;
      case 'oldest':
        this.animals.sort((a, b) => new Date(a.createdAt || '').getTime() - new Date(b.createdAt || '').getTime());
        break;
      case 'high-low':
        this.animals.sort((a, b) => (b.age ?? 0) - (a.age ?? 0));
        break;
      case 'low-high':
        this.animals.sort((a, b) => (a.age ?? 0) - (b.age ?? 0));
        break;
      default:
        break;
    }
    this.updateDisplayedAnimals();
  }

  applyFilters(): void {
    this.currentPage = 1;
    this.fetchAnimals();
  }

  onSearchChange(searchTerm: string): void {
    this.searchTerm = searchTerm.trim();
    this.applyFilters();
  }

  onFilterChanged(species: string): void {
    this.selectedSpecies = species;
    this.activeSpecies = species;

    this.applyFilters();
  }

  onSearchSubmit(event: Event): void {
    event.preventDefault();
    this.applyFilters();
  }

  

}
