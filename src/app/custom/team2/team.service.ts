import { Injectable } from '@angular/core';

@Injectable()
export class Team2Service {
  names = {
    en: 'team',
    ru1: 'советника',
    ru2: 'советники',
    ru3: 'советников',
    ru4: 'советник'
  };
  urls = {
    api: 'admin/team',
    qyery: {
      adviser: 1
    },
    show: '/team2',
    index: '/team2',
    create: '/newTeam2',
    paggination: 'team2'
  };

  constructor() {}
}
