import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexRoadshowComponent } from './index-roadshow.component';

describe('IndexTeamComponent', () => {
  let component: IndexRoadshowComponent;
  let fixture: ComponentFixture<IndexRoadshowComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [IndexRoadshowComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexRoadshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
