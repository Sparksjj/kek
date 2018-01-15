import { Subscription } from 'rxjs/Subscription';
import { ApplicationHttpClient } from './../../../core/http-client';
import { AppMemoryService } from './../../../core/app-memory.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Administrator } from './../administrator';
import { Show } from './../../../core/classes/show';
import { routeAnimation } from './../../../route.animation';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'ms-show-admin',
  templateUrl: './show-admin.component.html',
  styleUrls: ['./show-admin.component.scss'],
  host: {
    '[@routeAnimation]': 'true',
  },
  animations: [routeAnimation],
  providers: [DataService]
})
export class ShowAdminComponent extends Show<Administrator> {
  public item = new Administrator();
  public selectedRoles = [];
  private sub: Subscription;
  constructor(
    protected http: ApplicationHttpClient,
    public data: DataService,
    protected activatedRoute: ActivatedRoute,
    protected appMemory: AppMemoryService,
    protected router: Router) {
    super(
      http,
      data,
      activatedRoute,
      appMemory,
      router
    );
  }

  resetPassword() {
    this.item.change_password = !this.item.change_password;
    this.item.rePassword = '';
    this.item.password = '';
  }

  addSelectedRoles() {
    if (this.appMemory.allRoles) {
      this.updateRoles();
    } else {
      this.sub = this.appMemory.allRolesSub.subscribe(res => {
        if (res) {
          this.updateRoles();
        }
      })
    }
  }

  updateRoles() {
    if (this.selectedRoles.length == 0) {
      this.appMemory.allRoles.forEach(el => {
        this.item.roles.forEach(element => {
          if (element.id === el.id) {
            this.selectedRoles.push(el);
          }
        });
      })
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  saveItem(form: any) {
    if (super.saveItem(form)) {
      return
    }
    const formData: FormData = new FormData();
    if (this.item.change_password) {
      formData.append('password', this.item.password);
      formData.append('password_confirmation', this.item.rePassword);
    }
    formData.append('email', this.item.email);
    formData.append('name', this.item.name);

    this.selectedRoles.forEach(el => {
      formData.append('ids[]', el.id);
    })

    this.sendSaveRequest(formData, true);
    this.resetPassword();
  }

  onSucces(res) {
    super.onSucces(res);
    this.addSelectedRoles();
  }
}
