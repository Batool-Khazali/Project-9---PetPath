import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BUrlServicesService {
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.checkLoggedIn());
  userId: BehaviorSubject<any> = new BehaviorSubject<any>('');
  isAdmin: BehaviorSubject<any> = new BehaviorSubject<any>('false');

  isLoggedInObs = this.isLoggedInSubject.asObservable();
  userIdObs = this.userId.asObservable();
  isAdminObs = this.isAdmin.asObservable();

  private BaseUrl = 'https://localhost:7001/api/';

  constructor(private http: HttpClient) { }

  private checkLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  public isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.BaseUrl}LoginAndRegister/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.BaseUrl}LoginAndRegister/login`, data).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('authToken', response.token);
          this.isLoggedInSubject.next(true);
          this.userId.next(response.userId);
        }
      })
    );
  }

  checkAdmin(userId: any): Observable<any> {
    return this.http.get<any>(`${this.BaseUrl}LoginAndRegister/isAdmin/${userId}`);
  }

  logout(): void {
    this.userId.next('');
    this.isAdmin.next('false');
    this.isLoggedInSubject.next(false);
    localStorage.clear();
    window.location.reload();
  }

  getUserDetails(): Observable<any> {
    return this.http.get(`${this.BaseUrl}details`);
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.BaseUrl}Profile/getAllUsers`);
  }

  getUserInfo(userId: number): Observable<any> {
    return this.http.get<any>(`${this.BaseUrl}Profile/getUserById/${userId}`);
  }

  editUserInfo(userId: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.BaseUrl}Profile/editProfileInfo/${userId}`, data);
  }

  editPassword(userId: number, data: any): Observable<any> {
    return this.http.post<any>(`${this.BaseUrl}Profile/editPassword/${userId}`, data);
  }


  searchUser(text: string): Observable<any> {
    return this.http.get<any>(`${this.BaseUrl}AdminUsers/searchUser/${text}`)
  }



  //////////////////////////////////////// contacts
  sendMessage(data: any): Observable<any> {
    return this.http.post<any>(`${this.BaseUrl}Contacts/sendContactMessage`, data);
  }

  replyToMessage(adminId: any, contactId: any, data: any): Observable<any> {
    return this.http.post<any>(`${this.BaseUrl}Contacts/replyToContacts/${adminId}/${contactId}`, data);
  }

  getAllMessages(): Observable<any> {
    return this.http.get<any>(`${this.BaseUrl}Contacts/getAllContactMessages`);
  }

  getMessageDetails(contactId: any): Observable<any> {
    return this.http.get<any>(`${this.BaseUrl}Contacts/getContactMessageById/${contactId}`);
  }


  searchContacts(text: string): Observable<any> {
    return this.http.get<any>(`${this.BaseUrl}Contacts/searchContacts/${text}`)
  }
  
  searchContactsByAdminReply(text: string): Observable<any> {
    return this.http.get<any>(`${this.BaseUrl}searchContactsByAdminReply/${text}`)
  }





  //////////////////////////////////// admin users
  //assignAdmin(userId: any): Observable<any> {
  //  return this.http.put<any>(`${this.BaseUrl}AdminUsers/assignUserAsAdmin/${userId}`, {})
  //}




  /////////////////////////////////// for the home page

  Latest3Posts(): Observable<any> {
    return this.http.get<any>(`${this.BaseUrl}HomePage/getLatest3PostsForHP`)
  }






}
