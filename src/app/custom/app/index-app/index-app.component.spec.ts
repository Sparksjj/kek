import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexAppComponent } from './index-app.component';

describe('IndexComponent', () => {
  let component: IndexAppComponent;
  let fixture: ComponentFixture<IndexAppComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [IndexAppComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
