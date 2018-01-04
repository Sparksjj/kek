import { Injectable } from '@angular/core';

@Injectable()
export class RoadshowService {
  names = {
    en: 'Road Show',
    ru1: 'роуд-шоу',
    ru2: 'роуд-шоу',
    ru3: 'роуд-шоу',
    ru4: 'роуд-шоу',
  };
  urls = {
    api: 'admin/road-show',
    // qyery: {
    //   adviser: 1
    // },
    show: '/roadshow',
    index: '/roadshow',
    create: '/newRoadshow',
    paggination: 'roadshow',
  };

  constructor() {}
}
