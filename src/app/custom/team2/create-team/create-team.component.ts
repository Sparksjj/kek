import { Team } from './../../../core/classes/team';
import { routeAnimation } from './../../../route.animation';
import { AppMemoryService } from './../../../core/app-memory.service';
import { Team2Service } from './../team.service';

import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  ViewChildren
} from '@angular/core';
import { ApplicationHttpClient } from './../../../core/http-client';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
declare var $: any;

@Component({
  selector: 'ms-create-team2',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss'],
  host: {
    '[@routeAnimation]': 'true'
  },
  animations: [routeAnimation]
})
export class CreateTeam2Component implements OnInit {
  @ViewChild('image1') image1;
  @ViewChild('image2') image2;
  @ViewChild('image3') image3;

  private paramsSub: Subscription;
  public error: string;
  public errorObj: any;
  public item: Team = new Team('adviser');
  public id: string | number;
  public load = false;
  public imgErr = false;

  constructor(
    private http: ApplicationHttpClient,
    private data: Team2Service,
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
      return;
    }
    formData.append(
      'image',
      this.image1.nativeElement.files[0],
      this.image1.nativeElement.files[0].name
    );

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
