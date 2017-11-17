import { Injectable } from '@angular/core';
import {
  Request,
  XHRBackend,
  RequestOptions,
  Response,
  Http,
  RequestOptionsArgs,
  Headers
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthenticatedHttpService extends Http {
  public count = 0;
  constructor(
    backend: XHRBackend,
    defaultOptions: RequestOptions,
    private authService: AuthService,
    private router: Router
  ) {
    super(backend, defaultOptions);
  }

  request(
    url: string | Request,
    options?: RequestOptionsArgs
  ): Observable<Response> {
    /*    super.request(url, options).toPromise().then((res: any) => {
      if(res.json().errorCode == 2201){
        this.authService.logout();
        this.router.navigateByUrl('/login');
      }
    })*/

    return super.request(url, options).catch((error: Response) => {
      if (
        (error.status === 401 || error.status === 403) &&
        (window.location.href.match(/\?/g) || []).length < 2
      ) {
        if (
          url['url'].indexOf('self') === -1 &&
          url['url'].indexOf('oauth') === -1
        ) {
          this.authService.tryNoPermUrl();
          if (this.count > 5) {
            this.count = 0;
            this.authService.logout();
            this.router.navigateByUrl('/login');
          } else {
            this.router.navigateByUrl('/home');
            this.count++;
          }
        } else if (url['url'].indexOf('oauth') === -1) {
          this.count = 0;
          this.authService.logout();
          this.router.navigateByUrl('/login');
        }
      }
      return Observable.throw(error);
    });
  }
}
