import { Transaction } from './../../core/classes/transaction';
import { routeAnimation } from './../../route.animation';
import { TransactionService } from './transaction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Injector, OnInit } from '@angular/core';

import { AppMemoryService } from '../../core/app-memory.service';
import { ApplicationHttpClient } from '../../core/http-client';
import { IndexWithPagComponent } from '../../core/classes/indexWithPag';
import { Pagination } from '../../core/classes/pagination';
import { Subscription } from 'rxjs';
import { UnloadingService } from '../../core/unloading.service';

@Component({
  selector: 'ms-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
  host: {
    '[@routeAnimation]': 'true',
  },
  animations: [routeAnimation],
  providers: [TransactionService],
})
export class TransactionComponent extends IndexWithPagComponent<Transaction> {
  public loadUploading = false;
  constructor(
    protected http: ApplicationHttpClient,
    protected data: TransactionService,
    protected activatedRoute: ActivatedRoute,
    protected appMemory: AppMemoryService,
    protected router: Router,
    private unloadingService: UnloadingService
  ) {
    super(http, data, activatedRoute, appMemory, router);
  }
  sort(type: string) {
    this.currentQuery.page = 1;
    if (this.currentQuery.sort.indexOf(type) !== 0) {
      this.currentQuery.sort = type + '-asc';
    } else {
      this.currentQuery.sort = this.currentQuery.sort.replace(
        /(-asc)|(-desc)/,
        (str, a, b, offset, s) => {
          if (b) {
            return '-asc';
          }
          return '-desc';
        }
      );
    }
    this.refresh();
  }
  refresh() {
    console.log(this.currentQuery.from);
    if (this.currentQuery.fromDate) {
      this.currentQuery.from = this.currentQuery.fromDate.toString();
    } else {
      this.currentQuery.from = undefined;
    }

    if (this.currentQuery.toDate) {
      this.currentQuery.to = this.currentQuery.toDate.toString();
    } else {
      this.currentQuery.to = undefined;
    }

    this.router.navigate([this.data.urls.index], {
      queryParams: this.currentQuery,
    });
  }
  uploading(qyery: any) {
    this.loadUploading = true;
    this.unloadingService.exportAsFile(this.data.urls.api, qyery).then(
      () => {
        this.loadUploading = false;
      },
      () => {
        this.loadUploading = false;
      }
    );
  }
}
