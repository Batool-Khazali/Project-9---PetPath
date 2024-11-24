import { Component } from '@angular/core';
import { UrlServiceService } from '../../batool/services/url-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-shelters',
  templateUrl: './add-shelters.component.html',
  styleUrl: './add-shelters.component.css'
})
export class AddSheltersComponent {
  ngOnInit() { }
  constructor(private _ser: UrlServiceService, private _router: Router) {
  }


  addShelter(data: any) {
    const form = new FormData();
    for (let key in data) {
      form.append(key, data[key]);
    }

    this._ser.AddShelter(form).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Shelter Added',
          text: 'The shelter has been added successfully!',
          confirmButtonText: 'OK'
        }).then(() => {
          this._router.navigate(['adminDashBoard/AllShelters']);
        });
      },
      error => {
        console.error("Error Adding Shelter", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error adding the shelter. Please try again.',
          confirmButtonText: 'OK'
        });
      }
    );
  }
}
