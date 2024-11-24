import { Component } from '@angular/core';
import { BUrlServicesService } from '../burl-services.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {

  ngOnInit() {

  }

  constructor(private _ser: BUrlServicesService) { }

  sendEmail(data: any) {
    var form = new FormData();

    for (let key in data) {
      form.append(key, data[key])
    }

    this._ser.sendMessage(form).subscribe(
      () => {
        Swal.fire({
          title: "Your message was sent successfully",
          text: "We'll replay to you soon",
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
      },
      error => {
        Swal.fire({
          title: "Error!",
          text: "There was a problem sending your message.",
          icon: "error",
        });
      }
    );

  }


  onSubmit(form: NgForm) {
    if (form.invalid) {
      console.log('Form is invalid:', form);
      return;
    }
    console.log('Form is valid:', form);
  }





}
