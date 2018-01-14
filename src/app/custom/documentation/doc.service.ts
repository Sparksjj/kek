import { Injectable } from '@angular/core';

@Injectable()
export class DocService {
  names = {
    en: 'documents',
    ru1: 'документ',
    ru2: 'документы',
    ru3: 'документов',
  };
  urls = {
    api: 'admin/documentation',
    show: '/documents',
    index: '/documents',
    create: '/newDocument',
    paggination: 'documentation',
  };

  constructor() {}
}
