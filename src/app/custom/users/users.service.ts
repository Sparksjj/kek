import { CrudService } from './../../core/classes/crud-service';
import { Injectable } from '@angular/core';

@Injectable()
export class UsersService extends CrudService {
  constructor() {
    super(
      {
        en: 'users',
        ru1: 'Пользователь',
        ru2: 'пользователи',
        ru3: 'пользователей',
        ru4: 'пользователи',
      },
      {
        api: 'admin/user',
        show: '/users',
        index: '/users',
        create: '/users',
        paggination: 'users',
      }
    );
  }
}
