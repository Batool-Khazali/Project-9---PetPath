import { Component } from '@angular/core';
import { BUrlServicesService } from '../burl-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  ngOnInit() { }

  check: any

  constructor(private _ser: BUrlServicesService, private _route: Router) { }

  login(data: any) {
    //debugger
    const form = new FormData

    for (let key in data) {
      form.append(key, data[key])
    }


    this._ser.login(form).subscribe((outputData) => {

      //debugger
      this._ser['userId'].next(outputData.user.userId);
      localStorage.setItem("userId", outputData.user.userId)


      //debugger
      this._ser.checkAdmin(this._ser.userId.value).subscribe((checkData) => {

        this._ser["isAdmin"].next(checkData)
        localStorage.setItem("isAdmin", checkData)

        this.check = checkData
        console.log(this.check)

        if (this.check === true || this.check === 'true' || this.check === 1 || this.check === '1') {

          console.log("yes")

          this._route.navigate(["/dashboard/AdminAdoption"])

        }
        else {

          console.log("no")

          this._route.navigate(['/'])

        }
      })

    })

  }









}
