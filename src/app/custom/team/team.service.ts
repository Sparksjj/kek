import { Injectable } from '@angular/core';

@Injectable()
export class TeamService {
  names = {
    en: 'team',
    ru1: 'команда',
    ru2: 'команды',
    ru3: 'команд'
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
