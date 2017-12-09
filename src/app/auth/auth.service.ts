import { Injectable, Output } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {
  isLoggedIn = false;
  isGuest = false;
  private token: string;

  changeLoginSubject = new BehaviorSubject(null);
  badPermitions = new BehaviorSubject(null);
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor() {
    this.token = localStorage.getItem('iq_clash_auth_token2');
    this.isLoggedIn =
      localStorage.getItem('iq_clash_auth_token2') !== null ? true : false;
  }

  login(token: string, remember?: boolean): void {
    this.token = token;
    localStorage.setItem('iq_clash_auth_token2', token);
    this.isLoggedIn = true;
    this.sendEvent();
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('iq_clash_auth_token2');
    localStorage.removeItem('mybtk_favorit');
    this.isLoggedIn = false;
    this.isGuest = false;
    this.sendEvent();
  }

  sendEvent() {
    this.changeLoginSubject.next(this.isLoggedIn);
  }

  getToken() {
    return this.token;
  }

  tryNoPermUrl() {
    this.badPermitions.next(true);
  }
}
