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
import { Team } from './../../../core/classes/team';
import { TeamService } from './../team.service';
import { routeAnimation } from './../../../route.animation';

declare var $: any;

@Component({
  selector: 'ms-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss'],
  host: {
    '[@routeAnimation]': 'true',
  },
  animations: [routeAnimation],
})
export class CreateTeamComponent implements OnInit {
  @ViewChild('image1') image1;
  @ViewChild('image2') image2;

  private paramsSub: Subscription;
  public error: string;
  public errorObj: any;
  public item: Team = new Team();
  public id: string | number;
  public load = false;
  public imgErr = false;
  public imgErr2 = false;

  tabActive = 0;

  constructor(
    private http: ApplicationHttpClient,
    public data: TeamService,
    public appMemory: AppMemoryService,
    private router: Router
  ) {}

  ngOnInit() {}

  saveItem(form: any) {
    this.imgErr = false;
    this.imgErr2 = false;

    this.errorObj = undefined;
    if (form.invalid) {
      return;
    }

    const formData: FormData = new FormData();

    if (!this.image1.nativeElement.files[0]) {
      this.imgErr = true;
      return;
    }

    formData.append(
      'image',
      this.image1.nativeElement.files[0],
      this.image1.nativeElement.files[0].name
    );

    if (this.image2.nativeElement.files[0]) {
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
