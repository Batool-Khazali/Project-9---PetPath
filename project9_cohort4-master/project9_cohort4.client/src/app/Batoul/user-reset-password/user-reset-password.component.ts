import { Component } from '@angular/core';
import { BUrlServicesService } from '../burl-services.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-reset-password',
  templateUrl: './user-reset-password.component.html',
  styleUrl: './user-reset-password.component.css'
})
export class UserResetPasswordComponent {

  userId: any
  userIdLS: any

  ngOnInit() {

    this._ser.userIdObs.subscribe((userId) => {
      this.userId = userId
    })
    this.userIdLS = localStorage.getItem("userId")

  }

  constructor(private _ser: BUrlServicesService, private _route: Router) { }


  editPWD(data: any) {

    debugger

    if (data.ConNewPassword !== data.NewPassword) {
      //alert("password do not mathch");

      Swal.fire({
        icon: "error",
        title: "Passwords do not match",
        text: "Please retype your password",
      });

      return
    }

    var form = new FormData()

    form.append('OldPassword', data.OldPassword)
    form.append('NewPassword', data.NewPassword)

    this._ser.editPassword(this.userId, form).subscribe(() => {
    })

      this._route.navigate(["/userprofile"])

  }












}
