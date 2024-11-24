import { Component } from '@angular/core';
import { UrlService } from '../../Urlmustafa/url.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrl: './post-comments.component.css'
})
export class PostCommentsComponent {

  toggleForm(item: any) {
    item.showForm = !item.showForm;
  }

  replaysForm(item: any) {
    item.showreply = !item.showreply;
  }

  userId: any;
  parameter: any;
  postdetails: any;
  comments: any;
  replays: any;

  ngOnInit() {
    this.userId = localStorage.getItem("userId");
    this.parameter = this._route.snapshot.paramMap.get("id");
    this.getPostById(this.parameter);
    this.getcommentsByPostId(this.parameter);
  }

  constructor(private _ser: UrlService, private _route: ActivatedRoute) { }

  getPostById(postId: any) {
    this._ser.GetPostDetails(postId).subscribe((data) => {
      this.postdetails = data;
    });
  }

  getcommentsByPostId(postId: any) {
    this._ser.GetCommentByPostId(postId).subscribe((data) => {
      this.comments = data;
    });
  }

  Addcomment(formData: any) {
    if (this.userId != undefined || this.userId != null) {
      const form = new FormData();

      for (let key in formData) {
        form.append(key, formData[key]);
      }
      form.append("userId", this.userId);

      this._ser.AddnewComment(this.parameter, form).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'Comment added successfully',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          });
          console.log("Response:", form);
          this.getcommentsByPostId(this.parameter);
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Failed to add comment',
            text: 'An error occurred while adding your comment. Please try again.',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK'
          });
          console.error("Error:", error);
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'You must be logged in',
        text: 'Please log in to add a comment.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
    }
  }

  getreplaybycommentid(id: any) {
    this._ser.GetAllreplaybycommentid(id).subscribe((data) => {
      this.replays = data;
    });
  }

  addreplay(formdata: any, commentId: any) {
    if (this.userId != undefined || this.userId != null) {
      const form = new FormData();
      for (let key in formdata) {
        form.append(key, formdata[key]);
      }
      form.append("userId", this.userId);
      form.append("commentId", commentId);

      this._ser.AddreplayoneComment(form).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'Reply added successfully',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          });
          console.log("Response:", form);
          this.getcommentsByPostId(this.parameter);
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Failed to add reply',
            text: 'An error occurred while adding your reply. Please try again.',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK'
          });
          console.error("Error:", error);
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'You must be logged in',
        text: 'Please log in to add a reply.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
    }
  }
}
