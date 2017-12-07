import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { Contents, Faq } from './../../../core/classes/faq';
import { Subject, Subscription } from 'rxjs';

import { AppMemoryService } from './../../../core/app-memory.service';
import { ApplicationHttpClient } from './../../../core/http-client';
import { DomSanitizer } from '@angular/platform-browser';
import { FaqService } from './../faq.service';
import { routeAnimation } from './../../../route.animation';
declare var $: any;

@Component({
  selector: 'ms-show-faq',
  templateUrl: './show-faq.component.html',
  styleUrls: ['./show-faq.component.scss'],
  host: {
    '[@routeAnimation]': 'true'
  },
  animations: [routeAnimation]
})
export class ShowFaqComponent implements OnInit, OnDestroy {
  @ViewChild('image1') image1;
  @ViewChild('image2') image2;
  @ViewChild('image3') image3;

  private paramsSub: Subscription;
  public error: string;
  public errorObj: any;
  public item: Faq = new Faq();
  public id: string | number;
  public load = true;
  public imgErr = false;

  tabs = ['ru', 'en'];
  tabActive = 0;

  constructor(
    private http: ApplicationHttpClient,
    private data: FaqService,
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
    this.http.Get<Faq>(this.data.urls.api + '/' + this.id).subscribe(
      res => {
        res.contents2 = new Contents();

        if (res.contents) {
          res.contents.forEach(el => {
            res.contents2[el.language] = el.content;
          });
        }
        this.item = res;
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
    this.imgErr = false;
    if (form.invalid) {
      return;
    }

    const formData: FormData = new FormData();

    formData.append('questions[ru]', this.item.questions.ru);
    formData.append('questions[en]', this.item.questions.en);

    formData.append('answers[ru]', this.item.contents2.ru);
    formData.append('answers[en]', this.item.contents2.en);

    // formData.append('active', this.item.active ? '1' : '0');

    this.load = true;
    this.http.Post(this.data.urls.api + '/' + this.item.id, formData).subscribe(
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
