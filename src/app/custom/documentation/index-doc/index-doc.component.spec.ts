import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexDocComponent } from './index-doc.component';

describe('IndexDocComponent', () => {
  let component: IndexDocComponent;
  let fixture: ComponentFixture<IndexDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
