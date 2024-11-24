import { Component } from '@angular/core';
import { BUrlServicesService } from '../../Batoul/burl-services.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-contact-details',
  templateUrl: './admin-contact-details.component.html',
  styleUrl: './admin-contact-details.component.css'
})
export class AdminContactDetailsComponent {

  contactId: any
  adminId: any

  ngOnInit() {

    this.contactId = this._route.snapshot.paramMap.get("id");

    this._ser.userIdObs.subscribe((userId) => {
      this.adminId = userId
    })

    this.getMessageDetails(this.contactId)

  }

  constructor(private _ser: BUrlServicesService, private _route: ActivatedRoute) { }


  messageDetails: any

  getMessageDetails(id: any) {
    this._ser.getMessageDetails(id).subscribe((data) => {
      this.messageDetails = data
    })
  }

  isContentVisible: boolean = false;

  toggleContent() {
    this.isContentVisible = !this.isContentVisible;
  }


  reply(data: any) {
    debugger

    var form = new FormData()

    form.append("Message", data.Message)
    form.append("Subject", `Repy to your message: ${this.messageDetails.subject}`)



    this._ser.replyToMessage(this.adminId, this.contactId, form).subscribe(() => {
      Swal.fire({
        title: "The reply was sent successfully",
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
          text: "There was a problem sending the reply.",
          icon: "error",
        });
      })


  }





}
