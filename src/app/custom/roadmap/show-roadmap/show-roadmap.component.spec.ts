import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRoadmapComponent } from './show-roadmap.component';

describe('ShowRoadmapComponent', () => {
  let component: ShowRoadmapComponent;
  let fixture: ComponentFixture<ShowRoadmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowRoadmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRoadmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
