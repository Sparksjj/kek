import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { Content, Contents, News } from './../../../core/classes/news';
import { Subject, Subscription } from 'rxjs';

import { AppMemoryService } from './../../../core/app-memory.service';
import { ApplicationHttpClient } from './../../../core/http-client';
import { DomSanitizer } from '@angular/platform-browser';
import { Template } from '../../../core/classes/template';
import { TemplateService } from './../template.service';
import { routeAnimation } from './../../../route.animation';

declare var $: any;

@Component({
  selector: 'ms-show-template',
  templateUrl: './show-template.component.html',
  styleUrls: ['./show-template.component.scss'],
  host: {
    '[@routeAnimation]': 'true'
  },
  animations: [routeAnimation]
})
export class ShowTemplateComponent implements OnInit {
  @ViewChild('image1') image1;
  @ViewChild('image2') image2;
  @ViewChild('image3') image3;

  private paramsSub: Subscription;
  public error: string;
  public errorObj: any;
  public item = new Template();
  public id: string | number;
  public load = false;

  tabs = ['ru', 'en', 'cn', 'es', 'vn', 'kp'];
  tabActive = 0;

  constructor(
    private http: ApplicationHttpClient,
    private data: TemplateService,
    private appMemory: AppMemoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.paramsSub = this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.getItem();
    });
  }

  getItem() {
    this.http.Get<any>(this.data.urls.api + '/' + this.id).subscribe(
      res => {
        res.contents2 = new Contents();

        // if (res.contents) {
        //   res.contents.forEach(el => {
        //     res.contents2[el.language] = el.content;
        //   });
        // }
        this.item = res;
        this.item.key = this.item[0].key;
        this.item.description = this.item[0].description;

        this.tabs.forEach((e, i) => {
          const lang = e;
          const targetObj = res.find(x => x.language === lang);

          if (targetObj) {
            this.item.contents2[lang] = targetObj.content;
          }
        });

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

    const formData: FormData = new FormData();

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
    this.http
      .Post(this.data.urls.api + '/' + this.id + '/array', formData)
      .subscribe(
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
