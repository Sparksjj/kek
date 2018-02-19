import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { AppMemoryService } from './../../../core/app-memory.service';
import { ApplicationHttpClient } from './../../../core/http-client';
import { VideosService } from '../videos.service';
import { Partner } from './../../../core/classes/partner';
import { SortablejsOptions } from 'angular-sortablejs';
import { Subscription } from 'rxjs/Subscription';
import { routeAnimation } from './../../../route.animation';
import { Video } from '../../../core/classes/video';

@Component({
  selector: 'ms-index-videos',
  templateUrl: './index-videos.component.html',
  styleUrls: ['./index-videos.component.scss'],
  host: {
    '[@routeAnimation]': 'true',
  },
  animations: [routeAnimation],
})
export class IndexVideosComponent implements OnInit, OnDestroy {
  public items: Video[];
  public load = true;
  public error: string;
  public sub: Subscription;
  public simpleOptions: SortablejsOptions = {
    animation: 300,
    onUpdate: (event: any) => {
      this.changeOrder();
    },
  };

  constructor(
    private http: ApplicationHttpClient,
    public data: VideosService,
    private activatedRoute: ActivatedRoute,
    public appMemory: AppMemoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.sub = this.activatedRoute.queryParams.subscribe((params: any) => {
      this.load = true;
      this.getItems();
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  public changeOrder(): void {
    const data = [];
    const formData: FormData = new FormData();

    this.items.forEach((el, i) => {
      formData.append('data[' + el.id + ']', '' + (i + 1));
    });

    this.http.Post(this.data.urls.api + '-order', formData).subscribe(
      res => {
        /*
        this.appMemory.openSimpleSnackbar(); */
      },
      err => {
        this.error = 'Ошибка сервера, попробуйте перезагрузить страницу.';
      }
    );
  }

  public getItems(): void {
    this.error = '';
    this.http.Get<any>(this.data.urls.api).subscribe(
      res => {
        this.items = res;
        this.load = false;
      },
      err => {
        this.error = 'Ошибка сервера, попробуйте перезагрузить страницу.';
        this.load = false;
      }
    );
  }

  public deleteItem(item: any): void {
    this.error = '';
    this.load = true;
    this.http.Delete(this.data.urls.api + '/' + item.id).subscribe(
      res => {
        this.getItems();
        this.appMemory.openSimpleSnackbar();
      },
      err => {
        this.error = 'Ошибка сервера, попробуйте перезагрузить страницу.';
        this.load = false;
      }
    );
  }
}
