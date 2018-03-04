import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { AppMemoryService } from './../../../core/app-memory.service';
import { ApplicationHttpClient } from './../../../core/http-client';
import { DomSanitizer } from '@angular/platform-browser';
import { ExchangesService } from './../exchanges.service';
import { routeAnimation } from './../../../route.animation';
import { Exchange } from '../../../core/classes/exchange';

declare var $: any;

@Component({
  selector: 'ms-show-exchanges',
  templateUrl: './show-exchanges.component.html',
  styleUrls: ['./show-exchanges.component.scss'],
  host: {
    '[@routeAnimation]': 'true',
  },
  animations: [routeAnimation],
})
export class ShowExchangesComponent implements OnInit, OnDestroy {
  @ViewChild('image1') image1;

  private paramsSub: Subscription;
  public error: string;
  public errorObj: any;
  public item: Exchange = new Exchange();
  public id: string | number;
  public load = true;
  public imgErr = false;

  constructor(
    private http: ApplicationHttpClient,
    private data: ExchangesService,
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
    this.http.Get<any>(this.data.urls.api + '/' + this.id).subscribe(
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

    formData.append('link', this.item.link);
    formData.append('type', this.item.type);

    this.load = true;
    this.http
      .Post(this.data.urls.api + '/' + this.item.id + '/image', formData)
      .subscribe(
        res => {
          this.load = false;
          this.router.navigate([this.data.urls.index]);
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
  }

  changeListner(event) {
    this.errorObj = undefined;
    this.imgErr = false;
  }
}
