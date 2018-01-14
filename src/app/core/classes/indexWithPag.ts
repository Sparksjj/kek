import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { AppMemoryService } from '../../core/app-memory.service';
import { ApplicationHttpClient } from '../../core/http-client';
import { CrudService } from './crud-service';
import { Pagination } from './pagination';
import { Subscription } from 'rxjs';

export class IndexWithPagComponent<T> implements OnInit, OnDestroy {
  public items: T[];
  public paginationInfo: Pagination;
  public load = true;
  public error: string;
  public sub: Subscription;
  public today = new Date();
  public end = new Date();
  public minDate = new Date();
  public currentQuery = {
    page: 1,
    sort: 'id-asc',
    count: 20,
    from: undefined,
    to: undefined,
    fromDate: undefined,
    toDate: undefined,
  };

  constructor(
    protected http: ApplicationHttpClient,
    protected data: CrudService,
    protected activatedRoute: ActivatedRoute,
    protected appMemory: AppMemoryService,
    protected router: Router
  ) {}

  ngOnInit() {
    this.sub = this.activatedRoute.queryParams.subscribe((params: any) => {
      this.currentQuery.page = params['page'] || 1;
      this.currentQuery.sort = params['sort'] || 'id-asc';

      if (params['from']) {
        this.currentQuery.from = params['from'];
        this.currentQuery.fromDate = params['from'];
      }

      if (params['from']) {
        this.currentQuery.to = params['to'];
        this.currentQuery.toDate = params['to'];
      }

      this.load = true;
      this.getItems();
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
  getItems() {
    Object.keys(this.currentQuery).forEach(
      key =>
        this.currentQuery[key] === undefined && delete this.currentQuery[key]
    );
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
