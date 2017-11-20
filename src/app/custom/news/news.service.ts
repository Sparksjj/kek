import { Injectable } from '@angular/core';

@Injectable()
export class NewsService {
  names = {
    en: 'news',
    ru1: 'новость',
    ru2: 'новости',
    ru3: 'новостей'
  };
  urls = {
    api: 'admin/news',
    show: '/news',
    index: '/news',
    create: '/newNews',
    paggination: 'news'
  };

  constructor() {}
}
