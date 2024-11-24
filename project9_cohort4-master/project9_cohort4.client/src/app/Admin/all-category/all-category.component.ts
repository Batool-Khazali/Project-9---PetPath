import { Component } from '@angular/core';
import { UrlServiceService } from '../../batool/services/url-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-category',
  templateUrl: './all-category.component.html',
  styleUrl: './all-category.component.css'
})
export class AllCategoryComponent {
  ngOnInit() {

    this.GetCategoryAdmin();
  }
  constructor(private _ser: UrlServiceService, private router: Router) {


  }

  Array: any
  GetCategoryAdmin() {
    this._ser.getAllCategories().subscribe((data) => {
      this.Array = data
      console.log(this.Array, "this.categoryArray")
    })

  }
  deleteCategory(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this category?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._ser.deleteCategory(id).subscribe(
          () => {
            console.log('Category deleted');
            // Update the category list by filtering out the deleted item
            this.Array = this.Array.filter((item: any) => item.id !== id);

            // Refresh the category list after deletion
            this.GetCategoryAdmin();

            // Show success message
            Swal.fire(
              'Deleted!',
              'The category has been deleted.',
              'success'
            );
          },
          (error) => {
            console.error('Error deleting category:', error);

            // Show error message only if there's a confirmed issue
            Swal.fire(
              'Error!',
              'There was a problem deleting the category. Please try again later.',
              'error'
            );
          }
        );
      }
    });
  }

}
