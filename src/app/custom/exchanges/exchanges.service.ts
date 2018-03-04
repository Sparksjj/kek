import { Injectable } from '@angular/core';

@Injectable()
export class ExchangesService {
  names = {
    en: 'exchange',
    ru1: 'биржу',
    ru2: 'биржи',
    ru3: 'бирж',
  };
  urls = {
    api: 'admin/stock-exchange',
    // qyery: {
    //   adviser: 1
    // },
    show: '/exchanges',
    index: '/exchanges',
    create: '/newExchange',
    paggination: 'exchanges',
  };

  categories = ['confirmed', 'negotiation'];

  constructor() {}
}
