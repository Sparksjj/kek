import { AppMemoryService } from './../../app-memory.service';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  HostBinding
} from '@angular/core';
import { Input } from '@angular/core';
import { SidenavItem } from './sidenav-item.model';
import { SidenavService } from '../sidenav.service';

@Component({
  selector: 'ms-sidenav-item',
  templateUrl: './sidenav-item.component.html',
  styleUrls: ['./sidenav-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidenavItemComponent implements OnInit {
  @Input('item') item: SidenavItem;

  @HostBinding('class.open')
  get isOpen() {
    return this.sidenavService.isOpen(this.item);
  }

  @HostBinding('class.sidenav-item') sidenavItemClass: boolean = true;

  constructor(
    public appMemory: AppMemoryService,
    private sidenavService: SidenavService
  ) {}

  canShow(item?: any) {
    if (item) {
      if (item.permission) {
        let cont: number = 0;
        item.permission.forEach(el => {
          if (this.appMemory.roles[el]) {
            cont++;
          }
        });

        return cont == item.permission.length;
      }
      return true;
    } else {
      if (this.item.permission) {
        let cont = 0;
        this.item.permission.forEach(el => {
          if (this.appMemory.roles[el]) {
            cont++;
          }
        });

        return cont > 0;
      }
      return true;
    }
  }
  ngOnInit() {}

  toggleDropdown(): void {
    if (this.item.hasSubItems()) {
      this.sidenavService.toggleCurrentlyOpen(this.item);
    }
  }

  // Receives the count of Sub Items and multiplies it with 48 (height of one SidenavItem) to set the height for animation.
  getSubItemsHeight(): string {
    return this.getOpenSubItemsCount(this.item) * 48 + 'px';
  }

  // Counts the amount of Sub Items there is and returns the count.
  getOpenSubItemsCount(item: SidenavItem): number {
    let count = 0;

    if (item.hasSubItems() && this.sidenavService.isOpen(item)) {
      //count += item.subItems.length;

      item.subItems.forEach(subItem => {
        if (this.canShow(subItem)) {
          count += 1;
        }
        //count += this.getOpenSubItemsCount(subItem);
      });
    }

    return count;
  }
}
