import { AppMemoryService } from './../../core/app-memory.service';
import { ApplicationHttpClient } from './../../core/http-client';
import { Component, OnInit } from '@angular/core';
export class Statistic {
  registrations: number;
  transactions: number;
  investors: number;
  tokens: number;
  eth: string;
  btc: string;
}
@Component({
  selector: 'ms-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public items: Statistic;

  constructor(
    private http: ApplicationHttpClient,
    private appMemory: AppMemoryService
  ) {}

  ngOnInit() {
    this.http.Get<Statistic>('admin/statistics').subscribe(
      res => {
        this.items = res;
      },
      err => {
        console.log(err);
      }
    );
  }
}
