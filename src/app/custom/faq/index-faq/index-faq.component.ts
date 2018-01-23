import { SortablejsOptions } from 'angular-sortablejs';
import { Faq } from './../../../core/classes/faq';
import { AppMemoryService } from './../../../core/app-memory.service';
import { routeAnimation } from './../../../route.animation';
import { Pagination } from './../../../core/classes/pagination';
import { ApplicationHttpClient } from './../../../core/http-client';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FaqService } from '../faq.service';

@Component({
  selector: 'ms-index-faq',
  templateUrl: './index-faq.component.html',
  styleUrls: ['./index-faq.component.scss'],
  host: {
    '[@routeAnimation]': 'true'
  },
  animations: [routeAnimation]
})
export class IndexFaqComponent implements OnInit, OnDestroy {
  public items: Faq[];
  public paginationInfo: Pagination;
  public load = true;
  public error: string;
  public sub: Subscription;
  public currentQuery = {
    page: 1,
    sort: 'createdAt:asc',
    count: 20
  };

  simpleOptions: SortablejsOptions = {
    animation: 300,
    onUpdate: (event: any) => {
      this.changeOrder();
    }
  };

  constructor(
    private http: ApplicationHttpClient,
    public data: FaqService,
    private activatedRoute: ActivatedRoute,
    public appMemory: AppMemoryService,
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
          this.items = res;
          /*delete res.data;
          this.paginationInfo = res; */
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
