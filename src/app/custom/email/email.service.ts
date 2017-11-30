import { CrudService } from './../../core/classes/crud-service';
import { Injectable } from '@angular/core';

@Injectable()
export class EmailService extends CrudService {
  constructor() {
    super(
      {
        en: 'email',
        ru1: 'подписки',
        ru2: 'подписки',
        ru3: 'подписки',
        ru4: 'подписки'
      },
      {
        api: 'admin/email-list',
        show: '/email',
        index: '/email',
        create: '/email',
        paggination: 'email'
      }
    );
  }
}
