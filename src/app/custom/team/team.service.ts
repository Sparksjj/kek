import { Injectable } from '@angular/core';

@Injectable()
export class TeamService {
  names = {
    en: 'team',
    ru1: 'участника',
    ru2: 'участники',
    ru3: 'участников',
    ru4: 'участник'
  };
  urls = {
    api: 'admin/team',
    show: '/team',
    index: '/team',
    create: '/newTeam',
    paggination: 'team'
  };

  constructor() {}
}
