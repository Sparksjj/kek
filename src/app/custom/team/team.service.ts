import { Injectable } from '@angular/core';

@Injectable()
export class TeamService {
  names = {
    en: 'team',
    ru1: 'команду',
    ru2: 'команды',
    ru3: 'команд',
    ru4: 'командa'
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
