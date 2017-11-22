import { Injectable } from '@angular/core';

@Injectable()
export class FaqService {
  names = {
    en: 'faq',
    ru1: 'faq',
    ru2: 'faq',
    ru3: 'faq'
  };
  urls = {
    api: 'admin/faq',
    show: '/faq',
    index: '/faq',
    create: '/newFaq',
    paggination: 'faq'
  };

  constructor() {}
}
