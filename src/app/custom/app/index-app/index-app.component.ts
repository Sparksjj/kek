import { AppMemoryService } from './../../../core/app-memory.service';
import { App } from './../../../core/classes/app';
import { routeAnimation } from './../../../route.animation';
import { Pagination } from './../../../core/classes/pagination';
import { ApplicationHttpClient } from './../../../core/http-client';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: 'ms-index-app',
  templateUrl: './index-app.component.html',
  styleUrls: ['./index-app.component.scss'],
  host: {
    '[@routeAnimation]': 'true'
  },
  animations: [routeAnimation]
})
export class IndexAppComponent implements OnInit, OnDestroy {
  public items: App[];
  public paginationInfo: Pagination;
  public load = true;
  public error: string;
  public sub: Subscription;
  public currentQuery = {
    page: 1,
    sort: 'createdAt:asc',
    count: 20
  };

  constructor(
    private http: ApplicationHttpClient,
    private data: AppService,
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
  deleteItem(news: any) {
    this.error = '';
    this.load = true;
    this.http.Delete(this.data.urls.api + '/' + news.id).subscribe(
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
