import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderHeightComponent } from './slider-height.component';

describe('SliderHeightComponent', () => {
  let component: SliderHeightComponent;
  let fixture: ComponentFixture<SliderHeightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderHeightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderHeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
