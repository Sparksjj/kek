import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRoadshowComponent } from './create-roadshow.component';

describe('CreateRoadshowComponent', () => {
  let component: CreateRoadshowComponent;
  let fixture: ComponentFixture<CreateRoadshowComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [CreateRoadshowComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRoadshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
