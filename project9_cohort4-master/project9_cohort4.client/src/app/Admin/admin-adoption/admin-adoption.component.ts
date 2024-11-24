import { Router } from '@angular/router';
import Swal from 'sweetalert2';  // Import SweetAlert
import { UrlServiceService } from '../../batool/services/url-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-adoption',
  templateUrl: './admin-adoption.component.html',
  styleUrls: ['./admin-adoption.component.css']  // Corrected styleUrls
})
export class AdminAdoptionComponent implements OnInit {  // <-- Implement OnInit interface
  allAnimalsArray: any[] = [];  // Array to hold all animals
  errorMessage: string = '';    // For error handling

  constructor(private animalService: UrlServiceService, private router: Router) { }

  ngOnInit() {
    this.GetAllAnimals();  // Fetch all animals on initialization
  }

  // Fetch all animals
  GetAllAnimals() {
    this.animalService.getAllAniamls().subscribe({
      next: (animals: any[]) => {
        this.allAnimalsArray = animals;
        console.log(this.allAnimalsArray);  // Log animals to check if the data is fetched
      },
      error: (error) => {
        console.error('Error fetching animals:', error);
        this.errorMessage = 'Could not load animals!';
      }
    });
  }



  // Delete animal
  deleteAnimal(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.animalService.deleteAnimal(id).subscribe({
          next: () => {
            this.GetAllAnimals();  // Refresh the animal list after deletion
            Swal.fire('Deleted!', 'The animal has been deleted.', 'success');
          },
          error: (error) => {
            console.error('Error deleting animal:', error);
            Swal.fire('Error', 'Failed to delete animal. Please try again.', 'error');
          }
        });
      }
    });
  }

  // Navigate to create new animal

  // Navigate to edit animal
  editAnimal(id: number): void {
    this.router.navigate(['/dashboard/EditAnimal', id]);  // Route to edit animal
  }

  // Navigate to create new animal
  createNewAnimal(): void {
    this.router.navigate(['/dashboard/AddAdminAdoption']);  // Navigate to add animal
  }
}
