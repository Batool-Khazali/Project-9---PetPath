import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UrlServiceService } from '../../batool/services/url-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-admin-adoption',
  templateUrl: './add-admin-adoption.component.html',
  styleUrls: ['./add-admin-adoption.component.css']
})
export class AddAdminAdoptionComponent implements OnInit {
  shelters: any[] = [];
  categories: any[] = [];
  image: File[] = []; // Initialize image as an empty array

  // Form properties

  constructor(private _ser: UrlServiceService, private _router: Router, private fb: FormBuilder) {
    // Initialize form without any validators
   
  }

  ngOnInit() {
    // Fetch shelters and categories on initialization
    this._ser.getAllShelters().subscribe(
      (sheltersResponse) => {
        this.shelters = sheltersResponse;
      },
      (error) => {
        console.error('Error fetching shelters', error);
      }
    );

    this._ser.getAllCategories().subscribe(
      (categoriesResponse) => {
        this.categories = categoriesResponse;
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  // Change image handler for multiple inputs
  changeImage(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      this.image[index] = file; // Assign the selected file to the correct index
    }
  }

  // Method to add animal
  // Method to add animal
  addAnimal(data: any) {
    const form = new FormData();
    for (let key in data) {
      form.append(key, data[key]);
    }
    // Append images to FormData
    // Append images to FormData
    this.image.forEach((imageFile: File | undefined, index: number) => {
      if (imageFile) {
        form.append(`Image${index + 1}`, imageFile); // Append each image to the FormData
      }
    });


    this._ser.addAnimal(form).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'The animal has been added successfully!',
          confirmButtonText: 'OK'
        }).then(() => {
          this._router.navigate(['adminDashBoard/AllAnimal']);
        });
      },
      (error) => {
        console.error('Error updating Animal', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error adding the animal. Please try again.',
          confirmButtonText: 'OK'
        });
      }
    );
  }
}
