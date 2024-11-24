import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdoptionService } from '../../Adoptioh/adoption.service';
import { BUrlServicesService } from '../../Batoul/burl-services.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  styleUrls: ['./animal-form.component.css']
})
export class AnimalFormComponent implements OnInit {
  adoptionDetails = {
    userId: null as number | null,
    AnimalId: null as number | null,
    userMedicalStatus: '',
    housingType: 'Apartment',
    UserFinaincalStatus: '',
    userFlatType: '',
    userLivingStatus: '',
    userMoreDetails: '',
    userName: '', // Add userName property
    userEmail: ''  // Add userEmail property
  };

  constructor(private adoptionService: AdoptionService, private authService: BUrlServicesService, private _active: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.adoptionDetails.userId = this.authService.userId.value;
    this.getUserDetails(); // Fetch user details on initialization
  }

  getUserDetails(): void {
    this.authService.getUserDetails().subscribe((userData: any) => {
      this.adoptionDetails.userName = userData.name; // Assuming userData has a 'name' field
      this.adoptionDetails.userEmail = userData.email; // Assuming userData has an 'email' field
    });
  }

  submitAdoptionForm(form: NgForm): void {
    if (form.valid) {
      debugger

      this.adoptionDetails.AnimalId = Number(this._active.snapshot.paramMap.get('animalId'))
      this.adoptionDetails.userId = Number(localStorage.getItem("userId"))
      console.log(this.adoptionDetails, "adoptionDetails")
      this.adoptionService.submitAdoptionRequest(this.adoptionDetails).subscribe(
        response => {
          console.log('Adoption request submitted successfully:', response);
          Swal.fire({
            title: 'Thank You for Choosing Me!',
            text: 'Your adoption request has been submitted successfully!',
            icon: 'success',
            confirmButtonText: 'Okay'
          });
          form.reset();
          this.adoptionDetails.AnimalId = null;
        },
        error => {
          console.error('Error submitting adoption request:', error);
          Swal.fire({
            title: 'Error!',
            text: 'There was an error submitting your request. Please try again.',
            icon: 'error',
            confirmButtonText: 'Okay'
          });
        }
      );
    }
  }
}
