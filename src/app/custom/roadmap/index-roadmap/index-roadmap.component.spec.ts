import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexRoadmapComponent } from './index-roadmap.component';

describe('IndexRoadmapComponent', () => {
  let component: IndexRoadmapComponent;
  let fixture: ComponentFixture<IndexRoadmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexRoadmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexRoadmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
