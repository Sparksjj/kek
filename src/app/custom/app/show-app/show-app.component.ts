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
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription, Subject } from 'rxjs';
declare var $: any;

@Component({
  selector: 'ms-show-app',
  templateUrl: './show-app.component.html',
  styleUrls: ['./show-app.component.scss']
})
export class ShowAppComponent implements OnInit {
  @ViewChild('image1') image1;
  @ViewChild('image2') image2;
  @ViewChild('image3') image3;

  private paramsSub: Subscription;
  private error: string;
  public item: App;
  public id: string | number;
  public load = true;
  public imgErr = false;

  constructor(
    private http: ApplicationHttpClient,
    private data: AppService,
    private activatedRoute: ActivatedRoute,
    private appMemory: AppMemoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.paramsSub = this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.getItem();
    });
  }

  getItem() {
    this.http.Get<App>(this.data.urls.api + '/' + this.id).subscribe(
      res => {
        this.load = false;
        this.item = res;
      },
      err => {
        console.log(err);
        this.router.navigate([this.data.urls.show]);
        this.load = false;
      }
    );
  }

  saveItem(form: any) {
    this.imgErr = false;
    if (form.invalid) {
      return;
    }

    const formData: FormData = new FormData();

    if (this.item.change_img) {
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
    }

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
    this.http
      .Post(this.data.urls.api + '/' + this.item.id + '/image', formData)
      .subscribe(
        res => {
          this.load = false;
          this.appMemory.openSimpleSnackbar();
        },
        err => {
          if (err.status === 413) {
            /*           this.contentLarge = true;
          this.load = false;
          setTimeout(() => {
            $('.main-container').scrollTop(10000);
          }, 100); */
          } else {
            this.error = 'Ошибка сервера, попробуйте перезагрузить страницу.';
            this.load = false;
          }
        }
      );
  }

  onChange(event, img: string) {
    this.imgErr = false;
    /*     var files = event.srcElement.files;
    this.news['image'] = files; */
  }

  changeListner(event) {
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
    console.log(cl);
    setTimeout(() => {
      $(cl)
        .eq(0)
        .focus();
    }, 600);
  }
}
