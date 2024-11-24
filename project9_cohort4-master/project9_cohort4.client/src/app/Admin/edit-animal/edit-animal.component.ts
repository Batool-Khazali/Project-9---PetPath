import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { UrlServiceService } from '../../batool/services/url-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-animal',
  templateUrl: './edit-animal.component.html',
  styleUrl: './edit-animal.component.css'
})
export class EditAnimalComponent {

  param: any
  imageFile: File | null = null;
  animal: any = {};
  categories: any[] = [];
  shelters: any[] = [];
  image: File[] = []; // Initialize image as an empty array

  ngOnInit() {
    this.param = this._active.snapshot.paramMap.get('id')

    this._ser.geytAnumalById(this.param).subscribe(response => {
      this.animal = response;
    }


      , error => {
        console.error("Error fetching animal data", error);
      });

    this._ser.getAllShelters().subscribe(sheltersResponse => {
      this.shelters = sheltersResponse;
    }, error => {
      console.error("Error fetching shelters", error);
    });

    this._ser.getAllCategories().subscribe(categoriesResponse => {
      this.categories = categoriesResponse; // Store categories for dropdown
    }, error => {
      console.error("Error fetching categories", error);
    });
  }
  constructor(private _ser: UrlServiceService, private _active: ActivatedRoute, private _router: Router) {


  }




  // Change image handler for multiple inputs
  changeImage(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      this.image[index] = file;
    }
  }

  Array: any
  Updateanimal(data: any) {
    const form = new FormData();
    for (let key in data) {
      form.append(key, data[key]);
    }


    // Append images to FormData
    this.image.forEach((imageFile: File | undefined, index: number) => {
      if (imageFile) {
        form.append(`Image${index + 1}`, imageFile);
      }
    });

    this._ser.updateAnimal(this.param, form).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'The animal has been updated successfully!',
          confirmButtonText: 'OK'
        }).then(() => {
          this._router.navigate(['adminDashBoard/AllAnimal']);
        });
      },
      error => {
        console.error("Error updating Animals", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error updating the animal. Please try again.',
          confirmButtonText: 'OK'
        });
      }
    );
  }
}
