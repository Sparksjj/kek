import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexNewsComponent } from './index-news.component';

describe('IndexNewsComponent', () => {
  let component: IndexNewsComponent;
  let fixture: ComponentFixture<IndexNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
