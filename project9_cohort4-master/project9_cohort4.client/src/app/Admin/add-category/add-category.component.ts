import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { UrlServiceService } from '../../batool/services/url-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
  ngOnInit() { }
  constructor(private _ser: UrlServiceService, private _router: Router) {
  }


  image: any

  changeImage(event: any) {


    this.image = event.target.files[0]
  }
  addCategory(data: any) {
    debugger
    const form = new FormData();

    console.log('Data to submit:', data);

    for (const key in data) {
      if (data[key] !== undefined && data[key] !== null) {
        form.append(key, data[key]);
      } else {
        console.error(`Missing field: ${key}`);
      }
    }

    if (this.image) {
      form.append("Image", this.image);
    } else {
      console.error("No image selected");
    }

    // Use forEach instead of entries
    form.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    this._ser.addCategory(form).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'The category has been added successfully',
        confirmButtonText: 'OK'
      }).then(() => {
        this._router.navigate(['adminDashBoard/AllCategories']);
      });
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `There was an error updating the category: ${error.error.errors?.Species[0] || error.message}`,
        confirmButtonText: 'Try Again'
      });
      console.error("Error updating category", error);
    });
  }


}
