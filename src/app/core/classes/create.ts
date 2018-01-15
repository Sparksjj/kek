import { CrudService } from './crud-service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AppMemoryService } from './../../core/app-memory.service';
import { ApplicationHttpClient } from './../../core/http-client';
import { Media } from '../../core/classes/media';
import { routeAnimation } from './../../route.animation';
import { DatePipe } from '@angular/common';
declare var $: any;

export class Create<T> implements OnInit {
  @ViewChild('image1') image1;
  tabs = ['ru', 'en', 'cn', 'es', 'vn', 'kp'];
  tabActive = 0;
  private paramsSub: Subscription;
  public error: string;
  public errorObj: any;
  public item: any;
  public id: string | number;
  public load = false;
  public imgErr = false;

  constructor(
    protected http: ApplicationHttpClient,
    public data: CrudService,
    protected appMemory: AppMemoryService,
    protected router: Router
  ) { }

  ngOnInit() {
  }

  saveItem(form: any) {
    this.imgErr = false;
    this.errorObj = undefined;
    if (form.invalid) {
      return true;
    }
  }

  sendSave(data: any) {
    this.load = true;
    this.http.Post(this.data.urls.api, data).subscribe(
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
  }

  focusInput(cl: string) {
    setTimeout(() => {
      $(cl)
        .eq(0)
        .focus();
    }, 600);
  }
}
