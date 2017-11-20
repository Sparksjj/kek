import { ApplicationHttpClient } from './../../core/http-client';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routeAnimation } from '../../route.animation';
import { AuthService } from '../auth.service';

@Component({
  selector: 'ms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {
    '[@routeAnimation]': 'true'
  },
  animations: [routeAnimation]
})
export class LoginComponent implements OnInit {
  public data = {
    email: '',
    password: ''
  };
  /* phone = ''; */
  public errorObj: any;
  /* password: string; */
  error: string;

  constructor(
    private router: Router,
    public authService: AuthService,
    private http: ApplicationHttpClient
  ) {}

  ngOnInit() {}

  login(form: any) {
    this.errorObj = undefined;
    this.error = '';
    if (form.invalid) {
      return;
    }
    this.http
      .Post<{ access_token: string }>('oauth/token', this.data)
      .subscribe(
        res => {
          console.log(res);
          this.authService.login(res.access_token, true);
          this.router.navigate([''], {});
        },
        err => {
          console.log(err);
          // tslint:disable-next-line:triple-equals
          if (err.status == 422) {
            this.errorObj = err.error.errors || { err: [err.error.error] };
          } else {
            this.error = err.message;
          }
        }
      );
  }
}
