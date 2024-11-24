import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { BUrlServicesService } from '../../Batoul/burl-services.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'] // Corrected 'styleUrl' to 'styleUrls'
})
export class AboutComponent {
  teamMembers = [
    {
      name: 'Esraa Odat',
      position: 'Scrum Master',
      image: 'photo.jpg', 
      description: 'A dedicated Scrum Master with a passion for agile methodologies and team collaboration.'
    },
    {
      name: 'Batool Al-dalki',
      position: 'Coach and Guider',
      image: 'team-2.png', 
      "description": "An inspiring Coach and Guider who excels at empowering individuals to reach their potential and guiding teams toward achieving their goals with clarity and confidence."
    },
    {
      name: 'Batool Khazali',
      position: 'Product Owner',
      image: 'WhatsApp Image 2024-09-19 at 19.45.05_973ad229.jpg',
      description: 'An experienced Product Owner who excels at defining product vision and prioritizing tasks.'
    },
    {
      name: 'Rahaf AL-Shorman',
      position: 'Web Developer',
      image: 'WhatsApp Image 2024-10-26 at 21.35.36_bf07f33b.jpg',
      description: 'A skilled Web Developer with expertise in creating responsive and user-friendly applications.'
    },
    {
      name: 'Mostafa Al-Momani',
      position: 'Web Developer',
      image: 'WhatsApp Image 2024-10-26 at 23.48.34_6f9db3d9.jpg',
      description: 'A passionate Web Developer who specializes in front-end technologies and enjoys solving complex problems.'
    },
    {
      name: 'Malik Ibdah',
      position: 'Web Developer',
      image: 'WhatsApp Image 2024-10-26 at 23.03.01_62bc962b.jpg',
      description: 'A creative Web Developer focused on building innovative solutions and enhancing user experiences.'
    }
  ];


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
