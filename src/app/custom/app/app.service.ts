import { Injectable } from '@angular/core';

@Injectable()
export class AppService {
  names = {
    en: 'app',
    ru1: 'приложение',
    ru2: 'приложения',
    ru3: 'приложений'
  };
  urls = {
    api: 'admin/app',
    show: '/app',
    create: '/newApp',
    paggination: 'app'
  };
  constructor() {}
}
