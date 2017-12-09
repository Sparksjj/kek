import { Roadmap } from './../../../core/classes/roadmap';
import { routeAnimation } from './../../../route.animation';
import { AppMemoryService } from './../../../core/app-memory.service';
import { RoadmapService } from './../roadmap.service';
import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  ViewChildren
} from '@angular/core';
import { ApplicationHttpClient } from './../../../core/http-client';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription, Subject } from 'rxjs';
declare var $: any;

@Component({
  selector: 'ms-show-roadmap',
  templateUrl: './show-roadmap.component.html',
  styleUrls: ['./show-roadmap.component.scss'],
  host: {
    '[@routeAnimation]': 'true'
  },
  animations: [routeAnimation]
})
export class ShowRoadmapComponent implements OnInit, OnDestroy {
  @ViewChild('image1') image1;
  @ViewChild('image2') image2;
  @ViewChild('image3') image3;

  private paramsSub: Subscription;
  public error: string;
  public errorObj: any;
  public item: Roadmap = new Roadmap();
  public id: string | number;
  public load = true;
  public imgErr = false;
  tabs = ['ru', 'en', 'cn', 'es', 'vn', 'kp'];

  constructor(
    private http: ApplicationHttpClient,
    private data: RoadmapService,
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
    this.http.Get<Roadmap>(this.data.urls.api + '/' + this.id).subscribe(
      res => {
        res.selectedStatus = '' + res.status;
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

    this.item.quarters.ru
      ? formData.append('quarters[ru]', this.item.quarters.ru)
      : console.log();
    this.item.quarters.en
      ? formData.append('quarters[en]', this.item.quarters.en)
      : console.log();
    this.item.quarters.cn
      ? formData.append('quarters[cn]', this.item.quarters.cn)
      : console.log();
    this.item.quarters.es
      ? formData.append('quarters[es]', this.item.quarters.es)
      : console.log();
    this.item.quarters.vn
      ? formData.append('quarters[vn]', this.item.quarters.vn)
      : console.log();
    this.item.quarters.kp
      ? formData.append('quarters[kp]', this.item.quarters.kp)
      : console.log();

    this.item.descriptions.ru
      ? formData.append('descriptions[ru]', this.item.descriptions.ru)
      : console.log();
    this.item.descriptions.en
      ? formData.append('descriptions[en]', this.item.descriptions.en)
      : console.log();
    this.item.descriptions.cn
      ? formData.append('descriptions[cn]', this.item.descriptions.cn)
      : console.log();
    this.item.descriptions.es
      ? formData.append('descriptions[es]', this.item.descriptions.es)
      : console.log();
    this.item.descriptions.vn
      ? formData.append('descriptions[vn]', this.item.descriptions.vn)
      : console.log();
    this.item.descriptions.kp
      ? formData.append('descriptions[kp]', this.item.descriptions.kp)
      : console.log();

    formData.append('year', this.item.year.toString());
    formData.append('status', this.item.selectedStatus);

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
