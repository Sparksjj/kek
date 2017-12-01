import { UnloadingService } from './../../../core/unloading.service';
import { Email } from './../../../core/classes/email';
import { AppMemoryService } from './../../../core/app-memory.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationHttpClient } from './../../../core/http-client';
import { EmailService } from './../email.service';
import { Pagination } from './../../../core/classes/pagination';
import { Subscription } from 'rxjs';
import { IndexWithPagComponent } from './../../../core/classes/indexWithPag';
import { Component, OnInit, Injector } from '@angular/core';

@Component({
  selector: 'ms-index-email',
  templateUrl: './index-email.component.html',
  styleUrls: ['./index-email.component.scss']
})
export class IndexEmailComponent extends IndexWithPagComponent<Email> {
  public loadUploading = false;
  constructor(
    protected http: ApplicationHttpClient,
    protected data: EmailService,
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
    this.router.navigate([this.data.urls.index], {
      queryParams: this.currentQuery
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
