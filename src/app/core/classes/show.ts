import { CrudService } from './crud-service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AppMemoryService } from './../../core/app-memory.service';
import { ApplicationHttpClient } from './../../core/http-client';
import { DomSanitizer } from '@angular/platform-browser';
import { routeAnimation } from './../../route.animation';

declare var $: any;

export class Show<T> implements OnInit, OnDestroy {
  @ViewChild('image1') image1;
  @ViewChildren('docInput') docInput: QueryList<ElementRef>;

  private paramsSub: Subscription;
  public error: string;
  public errorObj: any;
  public item: T;
  public id: string | number;
  public load = true;
  public imgErr = false;
  public docErr = false;

  tabActive = 0;

  constructor(
    protected http: ApplicationHttpClient,
    public data: CrudService,
    protected activatedRoute: ActivatedRoute,
    protected appMemory: AppMemoryService,
    protected router: Router
  ) { }

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
    this.http.Get<T>(this.data.urls.api + '/' + this.id).subscribe(
      res => {
        this.onSucces(res);
      },
      err => {
        this.onErr(err);
      }
    );
  }
  onSucces(res) {
    this.item = res;
    this.load = false;
  }
  onErr(err) {
    console.log(err);
    this.router.navigate([this.data.urls.show]);
    this.load = false;
  }
  saveItem(form: any): any {
    this.imgErr = false;
    this.errorObj = undefined;
    if (form.invalid) {
      return true;
    }

    // add it in child class
    // const formData: FormData = new FormData();
    // this.sendSaveRequest(formData);
  }

  sendSaveRequest(data: any, post?: boolean) {
    this.load = true;
    this.http[post ? 'Post' : 'Put']<any>(this.data.urls.api + '/' + this.item['id'] + (post ? '/image' : ''), data)
      .subscribe(
      res => {
        this.tabActive = 0;
        this.load = false;
        //this.router.navigate([this.data.urls.index]);
        this.appMemory.openSimpleSnackbar();
      },
      err => {
        if (err.status === 422) {
          this.errorObj = err.error.errors || { err: [err.error.error] };
        } else if (err.status === 413) {
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

  changeListner2(event) {
    this.errorObj = undefined;
    this.docErr = false;
  }

  focusInput(cl: string) {
    setTimeout(() => {
      $(cl)
        .eq(0)
        .focus();
    }, 600);
  }
}
