import { Injectable } from '@angular/core';

@Injectable()
export class MediaService {
  names = {
    en: 'media',
    ru1: 'медиа-партнера',
    ru2: 'медиа-партнеры',
    ru3: 'медиа-партнеров',
    ru4: 'медиа-партнер'
  };
  urls = {
    api: 'admin/ref-news',
    // qyery: {
    //   adviser: 1
    // },
    show: '/media',
    index: '/media',
    create: '/newMedia',
    paggination: 'media'
  };

  constructor() {}
}
