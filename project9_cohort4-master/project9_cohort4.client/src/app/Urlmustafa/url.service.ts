import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(private http: HttpClient) { }

  staticData = "https://localhost:7001/api";

  Addnewpost(id: any, data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Posts/AddPosts/${id}`, data);
  }

  GetAllPosts(): Observable<any> {

    return this.http.get<any>(`${this.staticData}/Posts/GetAllPosts`);
  }
  GetPostDetails(postId: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Posts/PostDetailsById/${postId}`);
  }
  GetCommentByPostId(postId: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Comments/GetAllComment/${postId}`);
  }
  AddnewComment(postid :any ,data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Comments/AddComment/${postid}`, data);
  }
  AddreplayoneComment(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Comments/ReplayOnComment`, data);
  }
  GetAllreplaybycommentid(commentid: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Comments/GetAllReplyByCommentId/${commentid}`);
  }

  addLike(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Comments/addLike`,data);
  }
  /////////////////admin mustafa//////////
  UpdateTestimonial(id: any): Observable<any> {
    return this.http.put(`${this.staticData}/Posts/AcceptPostById/${id}`, {})
  }

  deleteTestimonial(id: any): Observable<any> {

    return this.http.delete<any>(`${this.staticData}/Posts/DeletePost/${id}`)
  }

  GetAllTestimonialToAccept(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Posts/postnotaccepted`);

  }

  GetTestimonial(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Posts/GetAllAcceptedPost`);

  }


  ////////////////end admin ///////////
}
