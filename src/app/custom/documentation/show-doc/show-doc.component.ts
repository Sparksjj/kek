import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Doc, Names } from './../../../core/classes/doc';
import { Subject, Subscription } from 'rxjs';

import { AppMemoryService } from './../../../core/app-memory.service';
import { ApplicationHttpClient } from './../../../core/http-client';
import { DocService } from './../doc.service';
import { DomSanitizer } from '@angular/platform-browser';
import { routeAnimation } from './../../../route.animation';

declare var $: any;

@Component({
  selector: 'ms-show-doc',
  templateUrl: './show-doc.component.html',
  styleUrls: ['./show-doc.component.scss'],
  host: {
    '[@routeAnimation]': 'true',
  },
  animations: [routeAnimation],
})
export class ShowDocComponent implements OnInit, OnDestroy {
  @ViewChild('image1') image1;
  @ViewChildren('docInput') docInput: QueryList<ElementRef>;

  private paramsSub: Subscription;
  public error: string;
  public errorObj: any;
  public item: Doc = new Doc();
  public id: string | number;
  public load = true;
  public imgErr = false;
  public docErr = false;

  tabActive = 0;

  constructor(
    private http: ApplicationHttpClient,
    private data: DocService,
    private activatedRoute: ActivatedRoute,
    public appMemory: AppMemoryService,
    private router: Router
  ) { }

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
    this.http.Get<Doc>(this.data.urls.api + '/' + this.id).subscribe(
      res => {
        res.show = res.show ? true : false;
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
    this.imgErr = false;
    this.errorObj = undefined;
    if (form.invalid) {
      return;
    }

    const formData: FormData = new FormData();

    if (this.item.change_img) {
      if (!this.image1.nativeElement.files[0]) {
        this.imgErr = true;
        return;
      }
      formData.append(
        'image',
        this.image1.nativeElement.files[0],
        this.image1.nativeElement.files[0].name
      );
    }




    if (this.appMemory.languages) {
      this.docInput.forEach((e, i) => {
        if (this.docInput.toArray()[i].nativeElement.files.length) {
          formData.append(
            `docs[${this.appMemory[i]}]`,
            this.docInput.toArray()[i].nativeElement.files[0]
          );
        }
      });

      this.appMemory.languages.forEach(i => {
        this.item.names[i]
          ? formData.append('names[' + i + ']', this.item.names[i])
          : console.log();
      });
    }

    if (this.docErr || this.imgErr) {
      return;
    }

    this.item.onclick
      ? formData.append('onclick', this.item.onclick)
      : console.log();

    formData.append('show', this.item.show ? '1' : '0');

    this.load = true;
    this.http
      .Post(this.data.urls.api + '/' + this.item.id + '/image', formData)
      .subscribe(
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
  }

  changeListner2(event) {
    this.errorObj = undefined;
    this.docErr = false;
  }

  focusInput(cl: string) {
    setTimeout(() => {
      $(cl)
        .eq(0)
        .focus();
    }, 600);
  }
}
