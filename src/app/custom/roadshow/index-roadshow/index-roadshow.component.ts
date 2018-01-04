import { RoadshowService } from './../roadshow.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { AppMemoryService } from './../../../core/app-memory.service';
import { ApplicationHttpClient } from './../../../core/http-client';
import { Pagination } from './../../../core/classes/pagination';
import { Partner } from './../../../core/classes/partner';
import { SortablejsOptions } from 'angular-sortablejs';
import { Subscription } from 'rxjs';
import { routeAnimation } from './../../../route.animation';

@Component({
  selector: 'ms-index-roadshow',
  templateUrl: './index-roadshow.component.html',
  styleUrls: ['./index-roadshow.component.scss'],
  host: {
    '[@routeAnimation]': 'true',
  },
  animations: [routeAnimation],
  providers: [RoadshowService],
})
export class IndexRoadshowComponent implements OnInit, OnDestroy {
  public items: Partner[];
  public paginationInfo: Pagination;
  public load = true;
  public error: string;
  public sub: Subscription;
  public currentQuery = {
    page: 1,
    sort: 'createdAt:asc',
    count: 20,
  };

  simpleOptions: SortablejsOptions = {
    animation: 300,
    onUpdate: (event: any) => {
      this.changeOrder();
    },
  };
  constructor(
    private http: ApplicationHttpClient,
    public data: RoadshowService,
    private activatedRoute: ActivatedRoute,
    private appMemory: AppMemoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.sub = this.activatedRoute.queryParams.subscribe((params: any) => {
      this.currentQuery.page = params['page'] || 1;
      this.currentQuery.sort = params['page'] || 'createdAt:asc';
      this.load = true;
      this.getItems();
    });
  }
  changeOrder() {
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
  getItems() {
    this.error = '';
    this.http
      .Get<any>(this.data.urls.api, { params: this.currentQuery })
      .subscribe(
        res => {
          this.items = res.data;
          delete res.data;
          this.paginationInfo = res;
          this.load = false;
        },
        err => {
          this.error = 'Ошибка сервера, попробуйте перезагрузить страницу.';
          this.load = false;
        }
      );
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
  deleteItem(item: any) {
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
