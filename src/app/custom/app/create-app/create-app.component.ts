import { AppMemoryService } from './../../../core/app-memory.service';
import { App } from './../../../core/classes/app';
import { AppService } from './../app.service';

import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  ViewChildren
} from '@angular/core';
import { ApplicationHttpClient } from './../../../core/http-client';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
declare var $: any;

@Component({
  selector: 'ms-create-app',
  templateUrl: './create-app.component.html',
  styleUrls: ['./create-app.component.scss']
})
export class CreateAppComponent implements OnInit {
  @ViewChild('image1') image1;
  @ViewChild('image2') image2;
  @ViewChild('image3') image3;

  private paramsSub: Subscription;
  public error: string;
  public errorObj: any;
  public item: App = new App();
  public id: string | number;
  public load = false;
  public imgErr = false;

  constructor(
    private http: ApplicationHttpClient,
    private data: AppService,
    public appMemory: AppMemoryService,
    private router: Router
  ) { }

  ngOnInit() { }

  saveItem(form: any) {
    this.errorObj = undefined;
    this.imgErr = false;
    if (form.invalid) {
      return;
    }

    const formData: FormData = new FormData();

    if (
      !this.image1.nativeElement.files[0] ||
      !this.image1.nativeElement.files[0] ||
      !this.image1.nativeElement.files[0]
    ) {
      this.imgErr = true;
      return;
    }
    formData.append(
      'icon_first',
      this.image1.nativeElement.files[0],
      this.image1.nativeElement.files[0].name
    );
    formData.append(
      'icon_second',
      this.image2.nativeElement.files[0],
      this.image2.nativeElement.files[0].name
    );
    formData.append(
      'icon_third',
      this.image3.nativeElement.files[0],
      this.image3.nativeElement.files[0].name
    );

    if (this.item.google) {
      formData.append('google', this.item.google);
    }
    if (this.item.apple) {
      formData.append('apple', this.item.apple);
    }
    formData.append('installations', this.item.installations);
    formData.append('active_users', this.item.active_users.toString());
    formData.append('partner', this.item.partner);
    formData.append('active', this.item.active ? '1' : '0');
    formData.append('name', this.item.name);

    this.load = true;
    this.http.Post(this.data.urls.api, formData).subscribe(
      res => {
        this.load = false;
        this.router.navigate([this.data.urls.index]);
        this.appMemory.openSimpleSnackbar();
      },
      err => {
        if (err.status === 422) {
          this.errorObj = err.error.errors || { err: [err.error.error] };
        } else if (err.status === 413) {
          /*this.contentLarge = true;
          this.load = false;
          setTimeout(() => {
            $('.main-container').scrollTop(10000);
          }, 100); */
        } else {
          this.error = 'Ошибка сервера, попробуйте перезагрузить страницу.';
        }
        this.load = false;
      }
    );
  }

  onChange(event, img: string) {
    this.errorObj = undefined;
    this.imgErr = false;
    /*     var files = event.srcElement.files;
    this.news['image'] = files; */
  }

  changeListner(event) {
    this.errorObj = undefined;
    this.imgErr = false;
    /*     if (this.image) {
      if (this.image.nativeElement.files.length > 0) {
        let size = Math.round(this.image.nativeElement.files[0].size / 1024);
        if (size > 1000) {
          this.image.nativeElement.value = '';
          return;
        }
      }
    } */
    /*     let reader = new FileReader();
    reader.onload = e => {
      let src = e.target['result'];
    };
 */
    /*    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    } */
  }

  focusInput(cl: string) {
    setTimeout(() => {
      $(cl)
        .eq(0)
        .focus();
    }, 600);
  }
}
