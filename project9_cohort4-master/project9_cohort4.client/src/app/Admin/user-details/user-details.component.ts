import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BUrlServicesService } from '../../Batoul/burl-services.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {

  userId: any

  ngOnInit() {

    this.userId = this._route.snapshot.paramMap.get("id");

    this.getUserInfo(this.userId)

  }

  constructor(private _ser: BUrlServicesService, private _route: ActivatedRoute) { }


  UserInfo: any

  getUserInfo(id: any) {
    this._ser.getUserInfo(id).subscribe((data) => {
      this.UserInfo = data
    })
  }

  //assign(id: any) {
  //  this._ser.assignAdmin(id).subscribe(() => {

  //    this.getUserInfo(id)

  //  })
  //}



}
