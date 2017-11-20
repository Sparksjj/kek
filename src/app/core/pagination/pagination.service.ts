import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
export class Ppage {
  href: any;
  number: any;
  current: any;
}
@Injectable()
export class PaginationService {
  getPaginationPages(
    curentPage: any,
    lastPage: any,
    maxBut: any,
    speshal?: boolean
  ) {
    var pages = [{ number: curentPage, current: true }];
    var leftShift =
      lastPage - curentPage >= 2
        ? 0
        : Math.floor(maxBut / 2) - (lastPage - curentPage) - 1;
    var but = maxBut - 1;
    var counter = curentPage;
    var p: Ppage;

    if (counter != 1) {
      while (counter != 1 && Math.floor(but / 2) + leftShift != pages.length) {
        counter--;
        p = { href: '', number: counter, current: false };
        pages.unshift(p);
      }
    }

    if (curentPage == 1) {
      p = { href: curentPage, number: '<', current: false };
      pages.unshift(p);
    } else {
      p = { href: curentPage - 1, number: '<', current: false };
      pages.unshift(p);
    }

    counter = curentPage;
    if (counter != lastPage) {
      while (counter != lastPage && but != pages.length) {
        counter++;
        p = { href: '', number: counter, current: false };
        pages.push(p);
      }
    }
    if (curentPage == lastPage) {
      p = { href: curentPage, number: '>', current: false };
      pages.push(p);
    } else {
      p = { href: +curentPage + 1, number: '>', current: false };
      pages.push(p);
    }
    if (speshal) {
      p = { href: '', number: 1, current: false };
      pages.unshift(p);
      p = { href: '', number: lastPage, current: false };
      pages.push(p);
    }
    return pages;
  }

  getSortTipe(sort: string) {
    var sortCat: any;
    switch (sort) {
      case 'id-asc':
      case 'id-desc':
      case 'fullName-asc':
      case 'fullName-desc':
      case 'email-asc':
      case 'email-desc':
      case 'reports-asc':
      case 'reports-desc':
      case 'cancellations-asc':
      case 'cancellations-desc':
      case 'date-asc':
      case 'date-desc':
      case 'categoryId-asc':
      case 'categoryId-desc':
      case 'status-asc':
      case 'status-desc':
      case 'timer-asc':
      case 'timer-desc':
      case 'fromuser-asc':
      case 'fromuser-desc':
      case 'touser-asc':
      case 'touser-desc':
      case 'type-asc':
      case 'type-desc':
      case 'mission-asc':
      case 'mission-desc':
      case 'reports_count-asc':
      case 'reports_count-desc':
      case 'cancelled_count-asc':
      case 'cancelled_count-desc':
      case 'registrationDate-asc':
      case 'registrationDate-desc':
      case 'createdAt-asc':
      case 'createdAt-desc':
      case 'name-asc':
      case 'name-desc':
      case 'byName-asc':
      case 'byName-desc':
      case 'dateCreated-asc':
      case 'dateCreated-desc':
      case 'missionGuid-asc':
      case 'missionGuid-desc':
      case 'userId-asc':
      case 'userId-desc':
      case 'category-asc':
      case 'category-desc':
      case 'payInAmount-asc':
      case 'payInAmount-desc':
      case 'payInStatus-asc':
      case 'payInStatus-desc':
      case 'missionType-asc':
      case 'missionType-desc':
      case 'timerName-asc':
      case 'timerName-desc':
      case 'sellerName-asc':
      case 'sellerName-desc':
      case 'userName-asc':
      case 'userName-desc':
      case 'payerName-asc':
      case 'payerName-desc':
        sortCat = sort;
        break;

      default:
        sortCat = 'id-asc';
        break;
    }
    return sortCat;
  }
  getSortTipeUrl(sort: string) {
    var sortCat: any;
    switch (sort) {
      case 'title:desc':
        sortCat = 'title_desc';
        break;

      case 'price:asc':
        sortCat = 'price_asc';
        break;

      case 'price:desc':
        sortCat = 'price_desc';
        break;

      default:
        sortCat = 'title_asc';
        break;
    }
    return sortCat;
  }
}
