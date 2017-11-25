import { Injectable } from '@angular/core';

@Injectable()
export class RoadmapService {
  names = {
    en: 'roadmap',
    ru1: 'План',
    ru2: 'Плана',
    ru3: 'Планов'
  };

  urls = {
    api: 'admin/roadmap',
    show: '/roadmap',
    index: '/roadmap',
    create: '/newRoadmap',
    paggination: 'roadmap'
  };

  roadStatus = [];

  constructor() {
    this.roadStatus[1] = 'past';
    this.roadStatus[2] = 'now';
    this.roadStatus[3] = 'future';
  }
  getStatus(text: string): number {
    return this.roadStatus.indexOf(text);
  }
}
