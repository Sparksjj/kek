import * as _ from 'lodash';

import { BehaviorSubject, Observable } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { Injectable } from '@angular/core';
import { SidenavItem } from './sidenav-item/sidenav-item.model';

@Injectable()
export class SidenavService {
  private _itemsSubject: BehaviorSubject<SidenavItem[]> = new BehaviorSubject<
    SidenavItem[]
  >([]);
  private _items: SidenavItem[] = [];
  items$: Observable<SidenavItem[]> = this._itemsSubject.asObservable();

  private _currentlyOpenSubject: BehaviorSubject<
    SidenavItem[]
  > = new BehaviorSubject<SidenavItem[]>([]);
  private _currentlyOpen: SidenavItem[] = [];
  currentlyOpen$: Observable<
    SidenavItem[]
  > = this._currentlyOpenSubject.asObservable();

  isIconSidenav: boolean;

  constructor(snackbar: MatSnackBar) {
    const menu = this;

    // menu.addItem('Dashboard', 'dashboard', '/', 1);
    const first = menu.addItem(
      'Главная страница',
      'layers',
      null,
      1,
      undefined,
      undefined,
      undefined,
      ['admin.team', 'admin.app', 'admin.roadmap']
    );
    menu.addSubItem(
      first,
      'Приложения',
      'contacts',
      '/app',
      1,
      undefined,
      undefined,
      undefined,
      ['admin.app']
    );
    menu.addSubItem(
      first,
      'Команда участников',
      'contacts',
      '/team',
      2,
      undefined,
      undefined,
      undefined,
      ['admin.team']
    );
    menu.addSubItem(
      first,
      'Команда советников',
      'contacts',
      '/team2',
      3,
      undefined,
      undefined,
      undefined,
      ['admin.team']
    );
    menu.addSubItem(
      first,
      'План',
      'contacts',
      '/roadmap',
      6,
      undefined,
      undefined,
      undefined,
      ['admin.roadmap']
    );
    menu.addSubItem(
      first,
      'Партнеры',
      'partners',
      '/partners',
      6,
      undefined,
      undefined,
      undefined,
      ['admin.partner']
    );
    menu.addSubItem(
      first,
      'Медиа',
      'media',
      '/media',
      6,
      undefined,
      undefined,
      undefined,
      ['admin.refnews']
    );
    menu.addSubItem(
      first,
      'Роуд-шоу',
      'timelapse',
      '/roadshow',
      7,
      undefined,
      undefined,
      undefined,
      ['admin.road-show']
    );
    menu.addSubItem(
      first,
      'Документы',
      'attach_file',
      '/documents',
      8,
      undefined,
      undefined,
      undefined,
      ['admin.documentation']
    );
    menu.addSubItem(
      first,
      'Видео',
      'ondemand_video',
      '/videos',
      9,
      undefined,
      undefined,
      undefined,
      ['admin.video']
    );
    menu.addSubItem(
      first,
      'Биржи',
      'shopping_cart',
      '/exchanges',
      10,
      undefined,
      undefined,
      undefined,
      ['admin.stock-exchange']
    );
    const second = menu.addItem(
      'Отчеты',
      'add_alert',
      null,
      2,
      undefined,
      undefined,
      undefined,
      ['admin.email-list', 'admin.user']
    );
    menu.addSubItem(
      second,
      'Подписки',
      'add_alert',
      '/email',
      5,
      undefined,
      undefined,
      undefined,
      ['admin.email-list']
    );
    menu.addSubItem(
      second,
      'Пользователи',
      'person',
      '/users',
      7,
      undefined,
      undefined,
      undefined,
      ['admin.user']
    );
    menu.addSubItem(
      second,
      'Транзакции',
      'details',
      '/transaction',
      8,
      undefined,
      undefined,
      undefined
      // ['admin.transaction']
    );
    menu.addSubItem(
      second,
      'Referral',
      'shuffle',
      '/referral',
      8,
      undefined,
      undefined,
      undefined
      // ['admin.transaction']
    );
    menu.addItem(
      'Новости',
      'local_activity',
      '/news',
      3,
      undefined,
      undefined,
      undefined,
      ['admin.news']
    );
    menu.addItem(
      'Faq',
      'local_library',
      '/faq',
      4,
      undefined,
      undefined,
      undefined,
      ['admin.faq']
    );
    menu.addItem(
      'Шаблоны',
      'assignment',
      '/template',
      5,
      undefined,
      undefined,
      undefined,
      ['admin.template']
    );
    menu.addItem(
      'Переводы',
      'list',
      '/dictionary',
      6,
      undefined,
      undefined,
      undefined,
      ['admin.dictionary']
    );
    menu.addItem(
      'Нотификации',
      'send',
      '/push',
      7,
      undefined,
      undefined,
      undefined,
      ['admin.common-push']
    );
    menu.addItem(
      'Администраторы',
      'assignment_ind',
      '/administrator',
      8,
      undefined,
      undefined,
      undefined,
      ['admin.role-manage']
    );
    /*
    menu.addItem('Inbox', 'mail', '/apps/inbox', 1, '22', '#7986CC');
    menu.addItem('Chat', 'chat', '/apps/chat', 2, '14', '#E15C74');
    menu.addItem('Calendar', 'date_range', '/apps/calendar', 3);

    let components = menu.addItem('Components', 'layers', null, 3);
    menu.addSubItem(components, 'Autocomplete', '/components/autocomplete', 1);
    menu.addSubItem(components, 'Buttons', '/components/buttons', 2);
    menu.addSubItem(components, 'Cards', '/components/cards', 3);
    menu.addSubItem(components, 'Dialogs', '/components/dialogs', 4);
    menu.addSubItem(components, 'Grid List', '/components/grid-list', 5);
    menu.addSubItem(components, 'Lists', '/components/lists', 6);
    menu.addSubItem(components, 'Menu', '/components/menu', 7);
    menu.addSubItem(components, 'Slider', '/components/slider', 8);
    menu.addSubItem(components, 'Snack-Bar', '/components/snack-bar', 9);
    menu.addSubItem(components, 'Tooltips', '/components/tooltips', 10);

    let forms = menu.addItem('Forms', 'insert_comment', null, 4);
    menu.addSubItem(forms, 'Form Elements', '/forms/form-elements', 1);
    menu.addSubItem(forms, 'Form Wizard', '/forms/form-wizard', 1);

    let tables = menu.addItem('Tables', 'format_line_spacing', null, 5);
    menu.addSubItem(tables, 'Simple Table', '/tables/simple-table', 1);
    menu.addSubItem(
      tables,
      'Fixed Header Table',
      '/tables/fixed-header-table',
      2
    );

    let maps = menu.addItem('Maps', 'map', null, 6, '3', '#4CAF50');
    menu.addSubItem(maps, 'Google Maps', '/maps/google-maps', 1);

    let icons = menu.addItem('Material Icons', 'grade', '/icons', 7);

    let customPages = menu.addItem('Custom Pages', 'web', null, 8);
    menu.addSubItem(customPages, 'Login Page', '/login', 1);
    menu.addSubItem(customPages, 'Register Page', '/register', 2);
    menu.addSubItem(customPages, 'Forgot Password', '/forgot-password', 3);
    menu.addSubItem(customPages, 'Dashboard v1', '/dashboard-v1', 4);

    let dragAndDrop = menu.addItem('Drag & Drop', 'mouse', '/drag-and-drop', 9);

    let editor = menu.addItem(
      'WYSIWYG Editor',
      'format_shapes',
      '/editor',
      10,
      'NEW',
      '#3F51B5'
    );

    let multiLevel = menu.addItem('Multi-Level Menu', 'menu', null, 11);
    let level1 = menu.addSubItem(multiLevel, 'Level 1', '/level1', 1);
    let level2 = menu.addSubItem(level1, 'Level 2', '/level1/level2', 2);
    let level3 = menu.addSubItem(level2, 'Level 3', '/level1/level2/level3', 3);
    let level4 = menu.addSubItem(
      level3,
      'Level 4',
      '/level1/level2/level3/level4',
      4
    );
    let level5 = menu.addSubItem(
      level4,
      'Level 5',
      '/level1/level2/level3/level4/level5',
      5
    );

    let dynamicMenuFunctionDemo = () => {
      let dynamicFunction = () => {
        let snackbarRef = snackbar.open(
          'This menu item got added dynamically!',
          'Remove item',
          <MatSnackBarConfig>{
            duration: 5000
          }
        );

        snackbarRef.onAction().subscribe(() => {
          menu.removeItem(dynamicMenu);
        });
      };

      let dynamicMenu = menu.addItem(
        'Dynamic Menu Item',
        'extension',
        dynamicFunction,
        12
      );
    };

    let addMenu = menu.addItem(
      'Add Menu Item',
      'add',
      dynamicMenuFunctionDemo,
      99,
      null,
      null,
      'add-dynamic-menu'
    ); */
  }

  addItem(
    name: string,
    icon: string,
    route: any,
    position: number,
    badge?: string,
    badgeColor?: string,
    customClass?: string,
    permission?: string[]
  ) {
    const item = new SidenavItem({
      name: name,
      icon: icon,
      permission: permission,
      route: route,
      subItems: [],
      position: position || 99,
      badge: badge || null,
      badgeColor: badgeColor || null,
      customClass: customClass || null,
    });

    this._items.push(item);
    this._itemsSubject.next(this._items);

    return item;
  }

  addSubItem(
    parent: SidenavItem,
    name: string,
    icon: string,
    route: any,
    position: number,
    badge?: string,
    badgeColor?: string,
    customClass?: string,
    permission?: string[]
  ) {
    const item = new SidenavItem({
      name: name,
      permission: permission,
      route: route,
      parent: parent,
      subItems: [],
      position: position || 99,
    });

    parent.subItems.push(item);
    this._itemsSubject.next(this._items);

    return item;
  }

  removeItem(item: SidenavItem) {
    const index = this._items.indexOf(item);
    if (index > -1) {
      this._items.splice(index, 1);
    }

    this._itemsSubject.next(this._items);
  }

  isOpen(item: SidenavItem) {
    return this._currentlyOpen.indexOf(item) !== -1;
  }

  toggleCurrentlyOpen(item: SidenavItem) {
    let currentlyOpen = this._currentlyOpen;

    if (this.isOpen(item)) {
      if (currentlyOpen.length > 1) {
        currentlyOpen.length = this._currentlyOpen.indexOf(item);
      } else {
        currentlyOpen = [];
      }
    } else {
      currentlyOpen = this.getAllParents(item);
    }

    this._currentlyOpen = currentlyOpen;
    this._currentlyOpenSubject.next(currentlyOpen);
  }

  getAllParents(item: SidenavItem, currentlyOpen: SidenavItem[] = []) {
    currentlyOpen.unshift(item);

    if (item.hasParent()) {
      return this.getAllParents(item.parent, currentlyOpen);
    } else {
      return currentlyOpen;
    }
  }

  nextCurrentlyOpen(currentlyOpen: SidenavItem[]) {
    this._currentlyOpen = currentlyOpen;
    this._currentlyOpenSubject.next(currentlyOpen);
  }

  nextCurrentlyOpenByRoute(route: string) {
    let currentlyOpen = [];

    const item = this.findByRouteRecursive(route, this._items);

    if (item && item.hasParent()) {
      currentlyOpen = this.getAllParents(item);
    } else if (item) {
      currentlyOpen = [item];
    }

    this.nextCurrentlyOpen(currentlyOpen);
  }

  findByRouteRecursive(route: string, collection: SidenavItem[]): any {
    let result = _.find(collection, { route: route });

    if (!result) {
      _.each(collection, item => {
        if (item.hasSubItems()) {
          const found = this.findByRouteRecursive(route, item.subItems);

          if (found) {
            result = found;
            return false;
          }
        }
      });
    }

    return result;
  }

  get currentlyOpen() {
    return this._currentlyOpen;
  }

  getSidenavItemByRoute(route) {
    return this.findByRouteRecursive(route, this._items);
  }
}
