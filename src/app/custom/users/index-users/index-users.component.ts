import { ActivatedRoute, Router } from '@angular/router';
import { Component, Injector, OnInit } from '@angular/core';

import { AppMemoryService } from './../../../core/app-memory.service';
import { ApplicationHttpClient } from './../../../core/http-client';
import { Email } from './../../../core/classes/email';
import { IndexWithPagComponent } from './../../../core/classes/indexWithPag';
import { Pagination } from './../../../core/classes/pagination';
import { Subscription } from 'rxjs/Subscription';;
import { UnloadingService } from './../../../core/unloading.service';
import { UsersService } from './../users.service';

@Component({
  selector: 'ms-index-users',
  templateUrl: './index-users.component.html',
  styleUrls: ['./index-users.component.scss'],
})
export class IndexUsersComponent extends IndexWithPagComponent<Email> {
  public loadUploading = false;
  constructor(
    protected http: ApplicationHttpClient,
    protected data: UsersService,
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
    this.unloadingService.exportAsFilePost(this.data.urls.api, qyery).then(
      () => {
        this.loadUploading = false;
      },
      () => {
        this.loadUploading = false;
      }
    );
  }
}
