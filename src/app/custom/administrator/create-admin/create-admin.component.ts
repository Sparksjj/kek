import { Router } from '@angular/router';
import { AppMemoryService } from './../../../core/app-memory.service';
import { DataService } from './../data.service';
import { ApplicationHttpClient } from './../../../core/http-client';
import { Create } from './../../../core/classes/create';
import { Administrator } from './../administrator';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms/src/model';

@Component({
  selector: 'ms-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.scss'],
  providers: [DataService]
})
export class CreateAdminComponent extends Create<Administrator> {
  public item = new Administrator();
  public selectedRoles = [];
  constructor(
    protected http: ApplicationHttpClient,
    public data: DataService,
    protected appMemory: AppMemoryService,
    protected router: Router) {
    super(http, data, appMemory, router);
  }
  saveItem(form) {
    if (super.saveItem(form)) {
      return
    };

    const formData: FormData = new FormData();
    formData.append('password', this.item.password);
    formData.append('password_confirmation', this.item.rePassword);
    formData.append('email', this.item.email);
    formData.append('name', this.item.name);

    this.selectedRoles.forEach(el => {
      formData.append('ids[]', el.id);
    })

    this.sendSave(formData);
  }
}
