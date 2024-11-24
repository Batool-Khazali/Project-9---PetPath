import { Component } from '@angular/core';
import { BUrlServicesService } from '../../Batoul/burl-services.service';

@Component({
  selector: 'app-admin-all-contacts',
  templateUrl: './admin-all-contacts.component.html',
  styleUrl: './admin-all-contacts.component.css'
})
export class AdminAllContactsComponent {

  ngOnInit() {

    this.getAllMessages()

  }


  constructor(private _ser: BUrlServicesService) { }


  contactsArray: any

  getAllMessages() {
    this._ser.getAllMessages().subscribe((data) => {
      this.contactsArray = data
    })
  }


  searchContacts(event: any) {
    const searchText = event.target.value.trim();
    if (searchText === '') {
      this.getAllMessages();
    } else {
      this._ser.searchContacts(searchText).subscribe((data) => {
        this.contactsArray = data;
      });
    }
  }


  searchReply(event: any) {
    const searchText = event.target.value;

    if (searchText === 'all') {
      this.getAllMessages();
    } else {
      this._ser.searchContactsByAdminReply(searchText).subscribe((data) => {
        this.contactsArray = data;
      });
    }
  }


  

  toggleMessage(message: any) {
    message.expanded = !message.expanded;
  }

  toggleAdminReply(message: any) {
    message.adminReplyExpanded = !message.adminReplyExpanded;
  }


  // Method to truncate messages
  truncateMessage(message: string, limit: number): string {
    if (message.length > limit) {
      return message.substring(0, limit); // Return truncated message without ellipsis
    }
    return message; // Return the original message if it doesn't exceed the limit
  }



}
