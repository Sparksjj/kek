import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { AppMemoryService } from './../../../core/app-memory.service';
import { ApplicationHttpClient } from './../../../core/http-client';
import { DomSanitizer } from '@angular/platform-browser';
import { Partner } from './../../../core/classes/partner';
import { PartnersService } from './../partners.service';
import { routeAnimation } from './../../../route.animation';

declare var $: any;

@Component({
  selector: 'ms-show-partners',
  templateUrl: './show-partners.component.html',
  styleUrls: ['./show-partners.component.scss'],
  host: {
    '[@routeAnimation]': 'true'
  },
  animations: [routeAnimation]
})
export class ShowPartnersComponent implements OnInit, OnDestroy {
  @ViewChild('image1') image1;

  private paramsSub: Subscription;
  public error: string;
  public errorObj: any;
  public item: Partner = new Partner();
  public id: string | number;
  public load = true;
  public imgErr = false;

  constructor(
    private http: ApplicationHttpClient,
    private data: PartnersService,
    private activatedRoute: ActivatedRoute,
    public appMemory: AppMemoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.paramsSub = this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.getItem();
    });
  }

  ngOnDestroy() {
    if (this.paramsSub) {
      this.paramsSub.unsubscribe();
    }
  }

  getItem() {
    this.http.Get<Partner>(this.data.urls.api + '/' + this.id).subscribe(
      res => {
        this.item = res;
        this.load = false;
      },
      err => {
        console.log(err);
        this.router.navigate([this.data.urls.show]);
        this.load = false;
      }
    );
  }

  saveItem(form: any) {
    this.errorObj = undefined;
    this.imgErr = false;
    if (form.invalid) {
      return;
    }

    const formData: FormData = new FormData();

    if (this.item.change_img) {
      if (!this.image1.nativeElement.files[0]) {
        this.imgErr = true;
        return;
      }

      formData.append(
        'image',
        this.image1.nativeElement.files[0],
        this.image1.nativeElement.files[0].name
      );
    }

    formData.append('name', this.item.name);
    formData.append('link', this.item.link);

    this.load = true;
    this.http
      .Post(this.data.urls.api + '/' + this.item.id + '/image', formData)
      .subscribe(
        res => {
          this.load = false;
          this.appMemory.openSimpleSnackbar();
        },
        err => {
          if (err.status === 422) {
            this.errorObj = err.error.errors || { err: [err.error.error] };
          } else if (err.status === 413) {
            /*           this.contentLarge = true;
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
