\import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ShowRoadshowComponent } from './show-roadshow.component';

describe('ShowTeamComponent', () => {
  let component: ShowRoadshowComponent;
  let fixture: ComponentFixture<ShowRoadshowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowRoadshowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRoadshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
