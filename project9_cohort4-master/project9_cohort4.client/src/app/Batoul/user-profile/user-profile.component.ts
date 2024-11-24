import { Component } from '@angular/core';
import { BUrlServicesService } from '../burl-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  userId: any
  userIdLS: any

  ngOnInit() {
    this._ser.userIdObs.subscribe((userId) => {
      this.userId = userId
    })
    this.userIdLS = localStorage.getItem("userId")

    this.getUserInfo(this.userIdLS)
  }

  constructor(private _ser: BUrlServicesService, private _route: Router) { }

  userInfo: any

  getUserInfo(userId: any) {
    this._ser.getUserInfo(userId).subscribe((data) => {
      this.userInfo = data

    })
  }


  imageFile: any
  changeImage(event: any) {

    this.imageFile = event.target.files[0]

  }


  editUserInfo(data: any) {
    debugger

    var form = new FormData();


    form.append('Name', data.Name);
    form.append('Phone', data.Phone);
    form.append('Address', data.Address);

    if (this.imageFile) {
      form.append('Image', this.imageFile);
    }

    this._ser.editUserInfo(this.userId, form).subscribe(() => {
      //this.getUserInfo(this.userId);
    })
  }




}
