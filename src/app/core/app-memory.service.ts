import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pairwise';

import { NavigationEnd, Router } from '@angular/router';

import { ApplicationHttpClient } from './http-client';
import { AuthService } from './../auth/auth.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { User } from './classes/user';

@Injectable()
export class AppMemoryService {
  public userSubject = new BehaviorSubject(null);
  public allRolesSub = new BehaviorSubject(null);
  public roles: any = {};
  public allRoles: any[];
  public user: User | null;
  public urls = {
    previousUrl: {
      url: '',
      query: {}
    },
    currentUrl: ''
  };

  public defaultModules = {
    modules: {
      clipboard: {
        matchVisual: false
      },
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        // toggled buttons
        ['blockquote', 'code-block'],
        [{ header: 1 }, { header: 2 }],
        // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }],
        // superscript/subscript
        [{ indent: '-1' }, { indent: '+1' }],
        // outdent/indent
        [{ direction: 'rtl' }],
        // text direction
        [{ size: ['small', false, 'large', 'huge'] }],
        // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [].slice() }, { background: [].slice() }],
        // dropdown with defaults from theme
        [{ font: [].slice() }],
        [{ align: [].slice() }],
        ['clean'],
        // remove formatting button
        ['link', 'image'], // link and image, video
        ['sorce']
      ]
    },
    modules2: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        // toggled buttons
        ['blockquote', 'code-block'],
        [{ header: 1 }, { header: 2 }],
        // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }],
        // superscript/subscript
        [{ indent: '-1' }, { indent: '+1' }],
        // outdent/indent
        [{ direction: 'rtl' }],
        // text direction
        [{ size: ['small', false, 'large', 'huge'] }],
        // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [].slice() }, { background: [].slice() }],
        // dropdown with defaults from theme
        [{ font: [].slice() }],
        [{ align: [].slice() }],
        ['clean'],
        // remove formatting button
        ['link', 'image'], // link and image, video
        ['sorce-2']
      ]
    }
  };
  constructor(
    protected http: ApplicationHttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.getUser();
    authService.changeLoginSubject.subscribe((islogged: any) => {
      if (islogged === null) {
        return;
      }
      this.getUser();
    });

    this.router.events
      .filter(e => e instanceof NavigationEnd)
      .pairwise()
      .subscribe(e => {
        const arr = e[0]['urlAfterRedirects'].split('?');
        const url = arr[0];
        const query = {};

        if (arr.length > 1) {
          const q = arr[1].split('&');
          q.forEach(el => {
            const tmp = el.split('=');
            query[tmp[0]] = decodeURIComponent(tmp[1]);
          });
        }

        this.urls.previousUrl = {
          url: url,
          query: query
        };

        this.urls.currentUrl = e[1]['urlAfterRedirects'];
      });
  }
  getAllRoles(){
    this.http.Get<any>('admin/role').subscribe(res => {
      this.allRoles = res;
      this.allRolesSub.next(true);
    }, err => {
    });
  }
  openSimpleSnackbar(text = 'Готово', action = 'Закрыть', duration = 4000) {
    this.snackBar.open(text, action, {
      duration: duration
    });
  }
  getUser() {
    this.roles = {};
    if (this.authService.isLoggedIn) {
      this.http.Get('admin/user/self', {}).subscribe(
        (res: any) => {
          console.log(res);
          this.user = res;
          this.user.roles.forEach(el => {
            this.roles[el.name] = true;
          });
          this.userSubject.next(null);
        },
        (err: any) => {
          console.log(err);
          this.user = null;
          this.userSubject.next(null);
        }
      );
    } else {
      this.user = null;
      this.userSubject.next(null);
    }
  }
}
