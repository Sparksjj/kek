import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexTeamComponent } from './index-team.component';

describe('IndexTeamComponent', () => {
  let component: IndexTeamComponent;
  let fixture: ComponentFixture<IndexTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
