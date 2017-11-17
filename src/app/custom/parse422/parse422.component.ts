import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ms-parse422',
  templateUrl: './parse422.component.html',
  styleUrls: ['./parse422.component.scss']
})
export class Parse422Component implements OnInit {
  @Input('obj') obj: any;

  constructor() {}

  ngOnInit() {}
}
