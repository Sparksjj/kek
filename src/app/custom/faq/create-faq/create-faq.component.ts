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
import { Faq } from './../../../core/classes/faq';
import { FaqService } from './../faq.service';
import { routeAnimation } from './../../../route.animation';

declare var $: any;

@Component({
  selector: 'ms-create-faq',
  templateUrl: './create-faq.component.html',
  styleUrls: ['./create-faq.component.scss'],
  host: {
    '[@routeAnimation]': 'true'
  },
  animations: [routeAnimation]
})
export class CreateFaqComponent implements OnInit {
  @ViewChild('image1') image1;
  @ViewChild('image2') image2;
  @ViewChild('image3') image3;

  private paramsSub: Subscription;
  public error: string;
  public errorObj: any;
  public item: Faq = new Faq();
  public id: string | number;
  public load = false;
  public imgErr = false;

  tabs = ['ru', 'en', 'cn', 'es', 'vn', 'kp'];
  tabActive = 0;

  constructor(
    private http: ApplicationHttpClient,
    private data: FaqService,
    private appMemory: AppMemoryService,
    private router: Router
  ) {}

  ngOnInit() {}

  saveItem(form: any) {
    this.imgErr = false;
    this.errorObj = undefined;
    if (form.invalid) {
      return;
    }

    const formData: FormData = new FormData();

    this.item.questions.ru
      ? formData.append('questions[ru]', this.item.questions.ru)
      : console.log();
    this.item.questions.en
      ? formData.append('questions[en]', this.item.questions.en)
      : console.log();
    this.item.questions.cn
      ? formData.append('questions[cn]', this.item.questions.cn)
      : console.log();
    this.item.questions.es
      ? formData.append('questions[es]', this.item.questions.es)
      : console.log();
    this.item.questions.vn
      ? formData.append('questions[vn]', this.item.questions.vn)
      : console.log();
    this.item.questions.kp
      ? formData.append('questions[kp]', this.item.questions.kp)
      : console.log();

    this.item.contents2.ru
      ? formData.append('answers[ru]', this.item.contents2.ru)
      : console.log();
    this.item.contents2.en
      ? formData.append('answers[en]', this.item.contents2.en)
      : console.log();
    this.item.contents2.cn
      ? formData.append('answers[cn]', this.item.contents2.cn)
      : console.log();
    this.item.contents2.es
      ? formData.append('answers[es]', this.item.contents2.es)
      : console.log();
    this.item.contents2.vn
      ? formData.append('answers[vn]', this.item.contents2.vn)
      : console.log();
    this.item.contents2.kp
      ? formData.append('answers[kp]', this.item.contents2.kp)
      : console.log();

    this.load = true;
    this.http.Post(this.data.urls.api, formData).subscribe(
      res => {
        this.tabActive = 0;
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
    this.imgErr = false;
    /*     var files = event.srcElement.files;
    this.news['image'] = files; */
  }

  changeListner(event) {
    this.errorObj = undefined;
    this.imgErr = false;
    /*     if (this.image) {
      if (this.image.nativeElement.files.length > 0) {
        let size = Math.round(this.image.nativeElement.files[0].size / 1024);
        if (size > 1000) {
          this.image.nativeElement.value = '';
          return;
        }
      }
    } */
    /*     let reader = new FileReader();
    reader.onload = e => {
      let src = e.target['result'];
    };
 */
    /*    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    } */
  }

  focusInput(cl: string) {
    setTimeout(() => {
      $(cl)
        .eq(0)
        .focus();
    }, 600);
  }
}
