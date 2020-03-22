import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingActivitiesListComponent } from './list.component';

describe('ProcessingActivitiesListComponent', () => {
  let component: ProcessingActivitiesListComponent;
  let fixture: ComponentFixture<ProcessingActivitiesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessingActivitiesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessingActivitiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
