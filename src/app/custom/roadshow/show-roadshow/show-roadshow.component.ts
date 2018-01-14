import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { AppMemoryService } from './../../../core/app-memory.service';
import { ApplicationHttpClient } from './../../../core/http-client';
import { DomSanitizer } from '@angular/platform-browser';
import { Media } from '../../../core/classes/media';
import { RoadshowService } from './../roadshow.service';
import { routeAnimation } from './../../../route.animation';
import { DatePipe } from '@angular/common';
declare var $: any;

@Component({
  selector: 'ms-show-roadshow',
  templateUrl: './show-roadshow.component.html',
  styleUrls: ['./show-roadshow.component.scss'],
  host: {
    '[@routeAnimation]': 'true',
  },
  animations: [routeAnimation],
  providers: [RoadshowService, DatePipe],
})
export class ShowRoadshowComponent implements OnInit, OnDestroy {
  @ViewChild('image1') image1;
  tabs = ['ru', 'en', 'cn', 'es', 'vn', 'kp'];
  tabActive = 0;

  private paramsSub: Subscription;
  public error: string;
  public errorObj: any;
  public item: Media = new Media();
  public id: string | number;
  public load = true;
  public imgErr = false;

  constructor(
    private datePipe: DatePipe,
    private http: ApplicationHttpClient,
    public data: RoadshowService,
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
    this.http.Get<Media>(this.data.urls.api + '/' + this.id).subscribe(
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

    if (this.item.date.toString().length > 10) {
      this.item.date = this.datePipe.transform(this.item.date, 'yyyy-MM-dd');
    }
    formData.append('date', this.item.date);

    this.item.titles.ru
      ? formData.append('titles[ru]', this.item.titles.ru)
      : console.log();
    this.item.titles.en
      ? formData.append('titles[en]', this.item.titles.en)
      : console.log();
    this.item.titles.cn
      ? formData.append('titles[cn]', this.item.titles.cn)
      : console.log();
    this.item.titles.es
      ? formData.append('titles[es]', this.item.titles.es)
      : console.log();
    this.item.titles.vn
      ? formData.append('titles[vn]', this.item.titles.vn)
      : console.log();
    this.item.titles.kp
      ? formData.append('titles[kp]', this.item.titles.kp)
      : console.log();

    this.item.short_contents.ru
      ? formData.append('short_contents[ru]', this.item.short_contents.ru)
      : console.log();
    this.item.short_contents.en
      ? formData.append('short_contents[en]', this.item.short_contents.en)
      : console.log();
    this.item.short_contents.cn
      ? formData.append('short_contents[cn]', this.item.short_contents.cn)
      : console.log();
    this.item.short_contents.es
      ? formData.append('short_contents[es]', this.item.short_contents.es)
      : console.log();
    this.item.short_contents.vn
      ? formData.append('short_contents[vn]', this.item.short_contents.vn)
      : console.log();
    this.item.short_contents.kp
      ? formData.append('short_contents[kp]', this.item.short_contents.kp)
      : console.log();

    formData.append('link', this.item.link);
    formData.append('active', this.item.active ? '1' : '0');

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