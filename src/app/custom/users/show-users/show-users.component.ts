import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { AppMemoryService } from './../../../core/app-memory.service';
import { ApplicationHttpClient } from './../../../core/http-client';
import { DomSanitizer } from '@angular/platform-browser';
import { UsersService } from './../users.service';
import { routeAnimation } from './../../../route.animation';

declare var $: any;

@Component({
  selector: 'ms-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.scss'],
  host: {
    '[@routeAnimation]': 'true',
  },
  animations: [routeAnimation],
})
export class ShowUsersComponent implements OnInit, OnDestroy {
  @ViewChild('image1') image1;
  @ViewChild('image2') image2;
  @ViewChild('image3') image3;

  private paramsSub: Subscription;
  public error: string;
  public errorObj: any;
  public item: any;
  public id: string | number;
  public load = true;
  public initialEmail: string;

  constructor(
    private http: ApplicationHttpClient,
    private data: UsersService,
    private activatedRoute: ActivatedRoute,
    private appMemory: AppMemoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.paramsSub = this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.getItem();
    });
  }

  ngOnDestroy() {
    if (this.paramsSub) {
      this.paramsSub.unsubscribe();
    }
  }

  getItem() {
    this.http.Get<any>('admin/user/' + this.id).subscribe(
      res => {
        this.item = res;
        this.initialEmail = this.item.email;
        this.load = false;
      },
      err => {
        console.log(err);
        this.router.navigate([this.data.urls.show]);
        this.load = false;
      }
    );
  }

  saveItem(form: any) {
    this.errorObj = undefined;

    if (form.invalid) {
      return;
    }

    const body = {
      email: undefined as string,
      password: undefined as string,
      password_confirmation: undefined as string,
    };

    if (this.item.email !== this.initialEmail) {
      body.email = this.item.email;
    }

    if (this.item.password) {
      body.password = this.item.password;
      body.password_confirmation = this.item.password;
    }

    this.load = true;
    this.http.Post(`user/${this.item.id}/update`, body).subscribe(
      res => {
        this.load = false;
        this.appMemory.openSimpleSnackbar();
      },
      err => {
        if (err.status === 422) {
          this.errorObj = err.error.errors || { err: [err.error.error] };
        } else if (err.status === 413) {
          /*           this.contentLarge = true;
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

  focusInput(cl: string) {
    setTimeout(() => {
      $(cl)
        .eq(0)
        .focus();
    }, 600);
  }
}
