import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexEmailComponent } from './index-email.component';

describe('IndexEmailComponent', () => {
  let component: IndexEmailComponent;
  let fixture: ComponentFixture<IndexEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
