import { Router, NavigationEnd } from '@angular/router';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pairwise';

@Injectable()
export class AppMemoryService {
  public urls = {
    previousUrl: {
      url: '',
      query: {}
    },
    currentUrl: ''
  };

  constructor(private snackBar: MatSnackBar, private router: Router) {
    console.log(this.router);
    this.router.events
      .filter(e => e instanceof NavigationEnd)
      .pairwise()
      .subscribe(e => {
        let arr = e[0]['urlAfterRedirects'].split('?');
        let url = arr[0];
        let query = {};

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

  openSimpleSnackbar(text = 'Готово', action = 'Закрыть', duration = 4000) {
    this.snackBar.open(text, action, {
      duration: duration
    });
  }
}
