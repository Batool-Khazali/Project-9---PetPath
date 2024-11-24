import { Component } from '@angular/core';
import { AdoptionService } from '../../Adoptioh/adoption.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-adoption-requests',
  templateUrl: './all-adoption-requests.component.html',
  styleUrl: './all-adoption-requests.component.css'
})
export class AllAdoptionRequestsComponent {

  ngOnInit() {

    this.getAll()

  }

  constructor(private _ser: AdoptionService) { }

  allRequests: any

  getAll() {
    this._ser.GetAllAdoptionApplications().subscribe((data) => {
      this.allRequests = data
    })
  }


  toggleMessage(message: any) {
    message.expanded = !message.expanded;
  }

  // Method to truncate messages
  truncateMessage(message: string, limit: number): string {
    if (message.length > limit) {
      return message.substring(0, limit); // Return truncated message without ellipsis
    }
    return message; // Return the original message if it doesn't exceed the limit
  }



  acceptAdoption(animalId: any, requestId: any) {
    this._ser.acceptAdoption(animalId, requestId).subscribe(() => {

      this.getAll()

      Swal.fire({
        title: "The request has been accepted",
        text: "An email well be sent to all requesters.",
        icon: "success",
        showClass: {
          popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `
        },
        hideClass: {
          popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `
        }
      });


      this.getAll()

    })
  }





}
