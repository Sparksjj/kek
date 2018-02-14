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
import { Media } from '../../../core/classes/media';
import { RoadshowService } from './../roadshow.service';
import { routeAnimation } from './../../../route.animation';
import { DatePipe } from '@angular/common';

declare var $: any;

@Component({
  selector: 'ms-create-media',
  templateUrl: './create-roadshow.component.html',
  styleUrls: ['./create-roadshow.component.scss'],
  host: {
    '[@routeAnimation]': 'true',
  },
  animations: [routeAnimation],
  providers: [RoadshowService, DatePipe],
})
export class CreateRoadshowComponent implements OnInit {
  @ViewChild('image1') image1;
  tabActive = 0;
  private paramsSub: Subscription;
  public error: string;
  public errorObj: any;
  public item: Media = new Media();
  public id: string | number;
  public load = false;
  public imgErr = false;

  constructor(
    private datePipe: DatePipe,
    private http: ApplicationHttpClient,
    public data: RoadshowService,
    public appMemory: AppMemoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.item.date = new Date();
  }

  saveItem(form: any) {
    this.imgErr = false;
    this.errorObj = undefined;
    if (form.invalid) {
      return;
    }

    const formData: FormData = new FormData();

    if (!this.image1.nativeElement.files[0]) {
      this.imgErr = true;
      return;
    }

    if (this.item.date.toString().length > 10) {
      this.item.date = this.datePipe.transform(this.item.date, 'yyyy-MM-dd');
    }
    formData.append('date', this.item.date);

    if (this.appMemory.languages) {
      this.appMemory.languages.forEach(i => {
        this.item.titles[i]
          ? formData.append('titles[' + i + ']', this.item.titles[i])
          : console.log();
        this.item.short_contents[i]
          ? formData.append(
              'short_contents[' + i + ']',
              this.item.short_contents[i]
            )
          : console.log();
        this.item.cities[i]
          ? formData.append('cities[' + i + ']', this.item.cities[i])
          : console.log();
      });
    }

    formData.append('link', this.item.link);
    formData.append('active', this.item.active ? '1' : '0');

    formData.append(
      'image',
      this.image1.nativeElement.files[0],
      this.image1.nativeElement.files[0].name
    );

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
