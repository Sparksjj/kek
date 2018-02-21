import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { AppMemoryService } from './../../../core/app-memory.service';
import { ApplicationHttpClient } from './../../../core/http-client';
import { DomSanitizer } from '@angular/platform-browser';
import { Team } from './../../../core/classes/team';
import { TeamService } from './../team.service';
import { routeAnimation } from './../../../route.animation';

declare var $: any;

@Component({
  selector: 'ms-show-team',
  templateUrl: './show-team.component.html',
  styleUrls: ['./show-team.component.scss'],
  host: {
    '[@routeAnimation]': 'true',
  },
  animations: [routeAnimation],
})
export class ShowTeamComponent implements OnInit, OnDestroy {
  @ViewChild('image1') image1;
  @ViewChild('image2') image2;

  private paramsSub: Subscription;
  public error: string;
  public errorObj: any;
  public item: Team = new Team();
  public id: string | number;
  public load = true;
  public imgErr = false;
  public imgErr2 = false;

  tabActive = 0;

  constructor(
    private http: ApplicationHttpClient,
    public data: TeamService,
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

    if (this.item.change_flag) {
      if (!this.image2.nativeElement.files[0]) {
        this.imgErr2 = true;
        return;
      }
      formData.append(
        'flag',
        this.image2.nativeElement.files[0],
        this.image2.nativeElement.files[0].name
      );
    }

    formData.append('linkedin', this.item.linkedin);

    if (this.appMemory.languages) {
      this.appMemory.languages.forEach(i => {
        this.item.descriptions[i]
          ? formData.append(
              'descriptions[' + i + ']',
              this.item.descriptions[i]
            )
          : console.log();
        this.item.posts[i]
          ? formData.append('posts[' + i + ']', this.item.posts[i])
          : console.log();
        this.item.names[i]
          ? formData.append('names[' + i + ']', this.item.names[i])
          : console.log();
      });
    }

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
  }

  onChange2(event, img: string) {
    this.errorObj = undefined;
    this.imgErr2 = false;
  }

  changeListner(event) {
    this.errorObj = undefined;
    this.imgErr = false;
  }

  changeListner2(event) {
    this.errorObj = undefined;
    this.imgErr2 = false;
  }

  focusInput(cl: string) {
    setTimeout(() => {
      $(cl)
        .eq(0)
        .focus();
    }, 600);
  }
}
