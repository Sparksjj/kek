import { Push } from './../../core/classes/push';
import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { AppMemoryService } from './../../core/app-memory.service';
import { ApplicationHttpClient } from './../../core/http-client';
import { routeAnimation } from './../../route.animation';

declare var $: any;

@Component({
  selector: 'ms-push',
  templateUrl: './push.component.html',
  styleUrls: ['./push.component.scss'],
  host: {
    '[@routeAnimation]': 'true',
  },
  animations: [routeAnimation],
})
export class PushComponent implements OnInit {
  public error: string;
  public errorObj: any;
  public item: Push = new Push();
  public load = false;

  constructor(
    private http: ApplicationHttpClient,
    public appMemory: AppMemoryService
  ) { }

  ngOnInit() { }

  saveItem(form: any) {
    this.errorObj = undefined;
    if (form.invalid) {
      return;
    }

    const formData: FormData = new FormData();

    formData.append('title', this.item.title);
    formData.append('url', this.item.url);
    formData.append('body', this.item.body);

    this.load = true;

    this.http.Post('admin/common-push', formData).subscribe(
      res => {
        this.load = false;
        form._submitted = false;
        this.item = new Push();
        this.appMemory.openSimpleSnackbar();
      },
      err => {
        if (err.status === 422) {
          this.errorObj = err.error.errors || { err: [err.error.error] };
        } else if (err.status === 413) {
          /*this.contentLarge = true;
          this.load = false;
          setTimeout(() => {
            $('.main-container').scrollTop(10000);
          }, 100); */
        } else {
          this.error = 'Ошибка сервера, попробуйте перезагрузить страницу.';
        }
        this.load = false;
      }
    );
  }
}
