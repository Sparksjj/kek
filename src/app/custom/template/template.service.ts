import { Injectable } from '@angular/core';

@Injectable()
export class TemplateService {
  names = {
    en: 'template',
    ru1: 'шаблон',
    ru2: 'шаблоны',
    ru3: 'шаблонов'
  };
  urls = {
    api: 'admin/template',
    show: '/template',
    index: '/template',
    create: '/newЕemplate',
    paggination: 'template'
  };

  constructor() {}
}
