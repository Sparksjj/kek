import { Injectable } from '@angular/core';

@Injectable()
export class PartnersService {
  names = {
    en: 'partner',
    ru1: 'партнера',
    ru2: 'партнеры',
    ru3: 'партнеров',
    ru4: 'партнер'
  };
  urls = {
    api: 'admin/partner',
    // qyery: {
    //   adviser: 1
    // },
    show: '/partners',
    index: '/partners',
    create: '/newPartner',
    paggination: 'partners'
  };

  constructor() {}
}
