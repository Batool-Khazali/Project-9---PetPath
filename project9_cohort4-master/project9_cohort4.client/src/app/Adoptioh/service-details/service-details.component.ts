import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../services.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2'; // Fixed import statement for SweetAlert

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit {
  service: any;
  modalRef!: NgbModalRef;
  userName: string = '';
  userEmail: string = '';

  
  constructor(
    private route: ActivatedRoute,
    private serviceService: ServicesService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    const serviceId = this.route.snapshot.paramMap.get('id');
    this.fetchServiceDetails(serviceId);
  }

  fetchServiceDetails(serviceId: string | null): void {
    if (serviceId) {
      this.serviceService.getServiceById(serviceId).subscribe(
        (data: any) => {
          this.service = data;
        },
        (error) => {
          console.error('Error fetching service details:', error);
          Swal.fire({
            title: 'Error!',
            text: 'Could not fetch service details. Please try again later.',
            icon: 'error',
            confirmButtonText: 'Okay'
          });
        }
      );
    }
  }

  openAdoptModal(content: any): void {
    this.modalRef = this.modalService.open(content);
  }

  submitAdoptionForm(form: any, modal: NgbModalRef): void {
    if (form.valid) {
      console.log(`Adopting service: ${this.service.name}`);
      // Here you can handle the adoption logic, e.g., sending data to your API

      Swal.fire({
        title: 'Success!',
        text: `You have adopted the service: ${this.service.name}`,
        icon: 'success',
        confirmButtonText: 'Okay'
      });

      modal.close(); // Close the modal after submission
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all required fields.',
        icon: 'error',
        confirmButtonText: 'Okay'
      });
    }
  }
}
