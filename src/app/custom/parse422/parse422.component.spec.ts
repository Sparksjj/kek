import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Parse422Component } from './parse422.component';

describe('Parse422Component', () => {
  let component: Parse422Component;
  let fixture: ComponentFixture<Parse422Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Parse422Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Parse422Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
