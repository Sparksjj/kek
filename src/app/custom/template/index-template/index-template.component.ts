import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { App } from './../../../core/classes/app';
import { AppMemoryService } from './../../../core/app-memory.service';
import { ApplicationHttpClient } from './../../../core/http-client';
import { Pagination } from './../../../core/classes/pagination';
import { Subscription } from 'rxjs';
import { TemplateService } from '../template.service';
import { routeAnimation } from './../../../route.animation';

@Component({
  selector: 'ms-index-template',
  templateUrl: './index-template.component.html',
  styleUrls: ['./index-template.component.scss'],
  host: {
    '[@routeAnimation]': 'true'
  },
  animations: [routeAnimation]
})
export class IndexTemplateComponent implements OnInit, OnDestroy {
  public items: App[];
  public load = true;
  public error: string;
  public sub: Subscription;

  constructor(
    private http: ApplicationHttpClient,
    private data: TemplateService,
    private activatedRoute: ActivatedRoute,
    private appMemory: AppMemoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.sub = this.activatedRoute.queryParams.subscribe((params: any) => {
      this.load = true;
      this.getItems();
    });
  }
  getItems() {
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

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  deleteItem(item: any) {
    this.error = '';
    this.load = true;
    this.http.Delete(this.data.urls.api + '/' + item.key).subscribe(
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
