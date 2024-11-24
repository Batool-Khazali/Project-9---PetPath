import { Component } from '@angular/core';
import { AnimalService } from '../../Adoptioh/animals.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-shelters',
  templateUrl: './all-shelters.component.html',
  styleUrl: './all-shelters.component.css'
})
export class AllSheltersComponent {

  ngOnInit() {

    this.GetShelterAdmin();
  }
  constructor(private _ser: AnimalService) {


  }

  Array: any
  GetShelterAdmin() {
    this._ser.getAllShelters().subscribe((data) => {
      this.Array = data
      console.log(this.Array, "this.shelterArray")
    })

  }

  deleteShelter(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this shelter? All animals inside it will also be deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._ser.deleteShelters(id).subscribe(
          () => {
            console.log('Shelter deleted');
            // Update the Array to remove the deleted shelter
            this.Array = this.Array.filter((item: any) => item.id !== id);
            Swal.fire(
              'Deleted!',
              'The shelter has been deleted successfully.',
              'success'
            );
          },
          error => {
            console.error('Error deleting shelter:', error);
            Swal.fire(
              'Error!',
              'There was a problem deleting the shelter. Please try again later.',
              'error'
            );
          }
        );
      }
    });
  }
}
