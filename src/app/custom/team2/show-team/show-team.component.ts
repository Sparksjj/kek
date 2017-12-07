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
import { DomSanitizer } from '@angular/platform-browser';
import { Team } from './../../../core/classes/team';
import { Team2Service } from './../team.service';
import { routeAnimation } from './../../../route.animation';

declare var $: any;

@Component({
  selector: 'ms-show-team2',
  templateUrl: './show-team.component.html',
  styleUrls: ['./show-team.component.scss'],
  host: {
    '[@routeAnimation]': 'true'
  },
  animations: [routeAnimation]
})
export class ShowTeam2Component implements OnInit, OnDestroy {
  @ViewChild('image1') image1;
  @ViewChild('image2') image2;
  @ViewChild('image3') image3;

  private paramsSub: Subscription;
  public error: string;
  public errorObj: any;
  public item: Team = new Team('adviser');
  public id: string | number;
  public load = true;
  public imgErr = false;

  tabs = ['ru', 'en'];
  tabActive = 0;

  constructor(
    private http: ApplicationHttpClient,
    private data: Team2Service,
    private activatedRoute: ActivatedRoute,
    public appMemory: AppMemoryService,
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
    this.http.Get<Team>(this.data.urls.api + '/' + this.id).subscribe(
      res => {
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

    formData.append('linkedin', this.item.linkedin);

    formData.append('descriptions[ru]', this.item.descriptions.ru);
    formData.append('descriptions[en]', this.item.descriptions.en);

    formData.append('posts[ru]', this.item.posts.ru);
    formData.append('posts[en]', this.item.posts.en);

    formData.append('names[ru]', this.item.names.ru);
    formData.append('names[en]', this.item.names.en);
    formData.append('type', this.item.type);

    // formData.append('active', this.item.active ? '1' : '0');

    this.load = true;
    this.http
      .Post(this.data.urls.api + '/' + this.item.id + '/image', formData)
      .subscribe(
        res => {
          this.tabActive = 0;
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
