import { Administrator } from './../administrator';
import { DataService } from './../data.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Component, Injector, OnInit } from '@angular/core';

import { AppMemoryService } from './../../../core/app-memory.service';
import { ApplicationHttpClient } from './../../../core/http-client';
import { IndexWithPagComponent } from './../../../core/classes/indexWithPag';
import { Pagination } from './../../../core/classes/pagination';
import { Subscription } from 'rxjs/Subscription';;
import { UnloadingService } from './../../../core/unloading.service';

@Component({
  selector: 'ms-index-admin',
  templateUrl: './index-admin.component.html',
  styleUrls: ['./index-admin.component.scss'],
  providers: [DataService]
})
export class IndexAdminComponent extends IndexWithPagComponent<Administrator>  {

  constructor(
    protected http: ApplicationHttpClient,
    protected data: DataService,
    protected activatedRoute: ActivatedRoute,
    protected appMemory: AppMemoryService,
    protected router: Router,
    private unloadingService: UnloadingService) {

      super(http, data, activatedRoute, appMemory, router);
    }

}
