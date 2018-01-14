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
import { Subject, Subscription } from 'rxjs';

import { AppMemoryService } from './../../../core/app-memory.service';
import { ApplicationHttpClient } from './../../../core/http-client';
import { Doc } from './../../../core/classes/doc';
import { DocService } from './../doc.service';
import { routeAnimation } from './../../../route.animation';

declare var $: any;

@Component({
  selector: 'ms-create-doc',
  templateUrl: './create-doc.component.html',
  styleUrls: ['./create-doc.component.scss'],
  animations: [routeAnimation],
})
export class CreateDocComponent implements OnInit {
  @ViewChild('image1') image1;
  @ViewChildren('docInput') docInput: QueryList<ElementRef>;

  private paramsSub: Subscription;
  public error: string;
  public errorObj: any;
  public item: Doc = new Doc();
  public id: string | number;
  public load = false;
  public imgErr = false;
  public docErr = false;

  tabs = ['ru', 'en', 'cn', 'es', 'vn', 'kp'];
  tabActive = 0;

  constructor(
    private http: ApplicationHttpClient,
    private data: DocService,
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

    if (!this.image1.nativeElement.files[0]) {
      this.imgErr = true;
    }

    let pass = false;

    this.docInput.forEach((e, i) => {
      if (this.docInput.toArray()[i].nativeElement.files.length) {
        formData.append(
          `docs[${this.tabs[i]}]`,
          this.docInput.toArray()[i].nativeElement.files[0],
          this.docInput.toArray()[i].nativeElement.files[0].name
        );
        pass = true;
        this.docErr = false;
      } else if (!pass) {
        this.docErr = true;
      }
    });

    if (this.docErr || this.imgErr) {
      return;
    }

    formData.append(
      'image',
      this.image1.nativeElement.files[0],
      this.image1.nativeElement.files[0].name
    );

    this.item.names.ru
      ? formData.append('names[ru]', this.item.names.ru)
      : console.log();
    this.item.names.en
      ? formData.append('names[en]', this.item.names.en)
      : console.log();
    this.item.names.cn
      ? formData.append('names[cn]', this.item.names.cn)
      : console.log();
    this.item.names.es
      ? formData.append('names[es]', this.item.names.es)
      : console.log();
    this.item.names.vn
      ? formData.append('names[vn]', this.item.names.vn)
      : console.log();
    this.item.names.kp
      ? formData.append('names[kp]', this.item.names.kp)
      : console.log();

    this.item.onclick
      ? formData.append('onclick', this.item.onclick)
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
