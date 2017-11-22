import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexFaqComponent } from './index-faq.component';

describe('IndexFaqComponent', () => {
  let component: IndexFaqComponent;
  let fixture: ComponentFixture<IndexFaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexFaqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
