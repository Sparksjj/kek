import { CrudService } from './../../core/classes/crud-service';
import { Injectable } from '@angular/core';

@Injectable()
export class TransactionService extends CrudService {
  constructor() {
    super(
      {
        en: 'transaction',
        ru1: 'транзакции',
        ru2: 'транзакции',
        ru3: 'транзакции',
        ru4: 'транзакции',
      },
      {
        api: 'admin/transaction',
        show: '/transaction',
        index: '/transaction',
        create: '/transaction',
        paggination: 'transaction',
      }
    );
  }
}
