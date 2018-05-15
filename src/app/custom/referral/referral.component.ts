import { Component, OnInit } from '@angular/core';
import { UnloadingService } from '../../core/unloading.service';

@Component({
  selector: 'ms-referral',
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.scss'],
})
export class ReferralComponent implements OnInit {
  load = false;
  constructor(private unloadingService: UnloadingService) {}

  ngOnInit() {}
  uploading() {
    this.load = true;
    this.unloadingService.exportAsFilePost('admin/referral', '').then(
      () => {
        this.load = false;
      },
      () => {
        this.load = false;
      }
    );
  }
}
