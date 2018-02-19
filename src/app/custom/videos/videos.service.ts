import { Injectable } from '@angular/core';

@Injectable()
export class VideosService {
  names = {
    en: 'videos',
    ru1: 'видео',
    ru2: 'видео',
    ru3: 'видео',
    ru4: 'видео',
  };
  urls = {
    api: 'admin/video',
    // qyery: {
    //   adviser: 1
    // },
    show: '/videos',
    index: '/videos',
    create: '/newVideo',
    paggination: 'videos',
  };

  categories = ['INTERVIEW', 'STATEMENT', 'REVIEW'];

  constructor() {}
}
