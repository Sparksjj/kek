import { AppMemoryService } from './../../core/app-memory.service';
import { Injectable } from '@angular/core';
import { CrudService } from './../../core/classes/crud-service';

@Injectable()
export class DataService extends CrudService {
  constructor(private memory: AppMemoryService) {
    super(
      {
        en: 'administrator',
        ru1: 'администратора',
        ru2: 'администраторa',
        ru3: 'администратор',
        ru4: 'администратор'
      },
      {
        api: 'admin/administrator',
        show: '/administrator',
        index: '/administrator',
        create: '/newAdministrator',
        paggination: 'administrator'
      }
    );
    if (!this.memory.allRoles) {
      this.memory.getAllRoles();
    }
  }
}
