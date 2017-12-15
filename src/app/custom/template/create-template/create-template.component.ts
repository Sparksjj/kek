import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { AppMemoryService } from './../../../core/app-memory.service';
import { ApplicationHttpClient } from './../../../core/http-client';
import { News } from './../../../core/classes/news';
import { Template } from '../../../core/classes/template';
import { TemplateService } from './../template.service';
import { routeAnimation } from './../../../route.animation';

declare var $: any;

@Component({
  selector: 'ms-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.scss'],
  host: {
    '[@routeAnimation]': 'true'
  },
  animations: [routeAnimation]
})
export class CreateTemplateComponent implements OnInit {
  @ViewChild('image1') image1;
  @ViewChild('image2') image2;
  @ViewChild('image3') image3;

  private paramsSub: Subscription;
  public error: string;
  public errorObj: any;
  public item: Template = new Template();
  public id: string | number;
  public load = false;

  tabs = ['ru', 'en', 'cn', 'es', 'vn', 'kp'];
  tabActive = 0;

  constructor(
    private http: ApplicationHttpClient,
    private data: TemplateService,
    private appMemory: AppMemoryService,
    private router: Router
  ) {}

  ngOnInit() {}

  saveItem(form: any) {
    this.errorObj = undefined;
    if (form.invalid) {
      return;
    }

    const formData: FormData = new FormData();

    this.item.key ? formData.append('key', this.item.key) : console.log();

    this.item.description
      ? formData.append('description', this.item.description)
      : console.log();

    this.item.contents2.ru
      ? formData.append('contents[ru]', this.item.contents2.ru)
      : console.log();
    this.item.contents2.en
      ? formData.append('contents[en]', this.item.contents2.en)
      : console.log();
    this.item.contents2.cn
      ? formData.append('contents[cn]', this.item.contents2.cn)
      : console.log();
    this.item.contents2.es
      ? formData.append('contents[es]', this.item.contents2.es)
      : console.log();
    this.item.contents2.vn
      ? formData.append('contents[vn]', this.item.contents2.vn)
      : console.log();
    this.item.contents2.kp
      ? formData.append('contents[kp]', this.item.contents2.kp)
      : console.log();

    this.load = true;
    this.http.Post(this.data.urls.api, formData).subscribe(
      res => {
        this.load = false;
        this.router.navigate([this.data.urls.index]);
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

  onChange(event, img: string) {
    this.errorObj = undefined;
  }

  changeListner(event) {
    this.errorObj = undefined;
  }

  focusInput(cl: string) {
    setTimeout(() => {
      $(cl)
        .eq(0)
        .focus();
    }, 600);
  }
}
