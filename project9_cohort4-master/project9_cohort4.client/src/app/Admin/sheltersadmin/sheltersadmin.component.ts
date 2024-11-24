import { Component, OnInit } from '@angular/core';
import { ShelterService } from '../shelter.service'; // Adjust the path as necessary
import Swal from 'sweetalert2';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-sheltersadmin',
  templateUrl: './sheltersadmin.component.html',
  styleUrls: ['./sheltersadmin.component.css'] // Corrected from styleUrl to styleUrls
})
export class SheltersadminComponent implements OnInit {
  shelters: any[] = [];
  selectedShelter: any; // To hold the selected shelter for editing
  showModal: boolean = false; // Control modal visibility
  errorMessage: string | null = null; // For error message display

  constructor(private shelterService: ShelterService) { }

  ngOnInit(): void {
    this.fetchShelters();
  }

  fetchShelters(): void {
    this.shelterService.getShelters().subscribe( // Changed to getShelters based on your service
      (data: any[]) => {
        this.shelters = data;
        this.errorMessage = null; // Clear error if any
      },
      (error) => {
        this.errorMessage = 'Could not load shelters!';
        console.error('Error fetching shelters:', error);
      }
    );
  }

  editShelter(shelter: any): void {
    this.selectedShelter = { ...shelter }; // Clone the selected shelter
    this.showModal = true; // Show the modal for editing
  }

  closeModal(): void {
    this.showModal = false; // Hide the modal
    this.selectedShelter = null; // Clear selected shelter on close
  }

  updateShelter(): void {
    if (!this.selectedShelter) return; // Guard clause

    this.shelterService.updateShelter(this.selectedShelter).subscribe(
      response => {
        Swal.fire({
          title: 'Updated!',
          text: 'Shelter details updated successfully!',
          icon: 'success',
          confirmButtonText: 'Okay'
        });
        this.fetchShelters(); // Refresh the shelters list
        this.closeModal(); // Hide the modal
      },
      error => {
        console.error('Error updating shelter:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Could not update the shelter. Please try again.',
          icon: 'error',
          confirmButtonText: 'Okay'
        });
      }
    );
  }

  confirmDelete(shelterId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteShelter(shelterId);
      }
    });
  }
  deleteShelter(shelterId: number): void {
    this.shelterService.deleteShelter(shelterId).subscribe(
      response => {
        // Refresh the shelters list from the server
        this.fetchShelters();

        // Show a success alert using SweetAlert
        Swal.fire({
          title: 'Deleted!',
          text: 'Shelter has been deleted.',
          icon: 'success',
          confirmButtonText: 'Okay'
        });
      },
      error => {
        // Handle errors by logging and showing an alert to the user
        console.error('Error deleting shelter:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Could not delete the shelter. Please try again.',
          icon: 'error',
          confirmButtonText: 'Okay'
        });
      }
    );
  }

}
