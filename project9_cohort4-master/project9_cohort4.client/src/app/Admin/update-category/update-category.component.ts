import { Component } from '@angular/core';
import { UrlServiceService } from '../../batool/services/url-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css'
})
export class UpdateCategoryComponent {

  param: any;
  imageFile: File | null = null;
  categoryData: any = {};

  constructor(private _ser: UrlServiceService, private _active: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.param = this._active.snapshot.paramMap.get('id');
    this.fetchCategoryData();
  }

  fetchCategoryData() {
    this._ser.getCategoryById(this.param).subscribe(
      (response: any) => {
        
        this.categoryData = response;

      },
      error => {
        console.error("Error fetching category data", error);
      }
    );
  }

  changeImage(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
      console.log('Selected image:', this.imageFile);
    }
  }

  UpdateCategory(data: any) {
    const form = new FormData();
    for (let key in data) {
      form.append(key, data[key]);
    }

    if (this.imageFile) {
      form.append('Image', this.imageFile);
    }

    this._ser.UpdateCategory(this.param, form).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'The category has been updated successfully!',
          confirmButtonText: 'OK'
        }).then(() => {
          this._router.navigate(['adminDashBoard/AllCategories']);
        });
      },
      error => {
        console.error("Error updating category", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error updating the category. Please try again.',
          confirmButtonText: 'OK'
        });
      }
    );
  }
}
