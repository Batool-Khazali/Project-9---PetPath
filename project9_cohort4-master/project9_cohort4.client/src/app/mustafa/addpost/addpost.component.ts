import { Component } from '@angular/core';
import { UrlService } from '../../Urlmustafa/url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent {
  userId: any;
  image: any;

  constructor(private _src: UrlService, private _router: Router) { }

  ngOnInit() {
    // الحصول على userId من localStorage
    this.userId = localStorage.getItem("userId");
  }

  // التعامل مع اختيار الصورة
  changeImage(event: any) {
    this.image = event.target.files[0]; // احصل على الصورة المرفوعة
  }

  // إرسال النموذج
  Addpost(formData: any) {
    debugger;
    const form = new FormData();

    // إضافة الحقول من النموذج إلى formData
    for (let key in formData) {
      form.append(key, formData[key]);
    }

    // إضافة userId إلى formData
    form.append("userId", this.userId);

    // إضافة الصورة إلى formData
    if (this.image) {
      form.append("StoryPhoto", this.image);
    }

    // استدعاء الخدمة لإرسال البيانات إلى API
    this._src.Addnewpost(this.userId, form).subscribe(
      () => {
        alert("Post added successfully");
        console.log("Response:", form);
        this._router.navigate(['/allposts']);

      },
      (error) => {
        alert("Failed to add post");
        console.error("Error:", error);
      }
    );
  }
}
