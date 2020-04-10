import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProcessingActivitiesListComponent} from './list.component';
import {ProcessingActivitiesService} from '@services/processing-activities/processing-activities.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpLoaderFactory} from '@app/app.module';
import {HttpClient} from '@angular/common/http';
import {MatListModule} from '@angular/material/list';
import {ProcessingActivity} from '@models/processing-actvities/processing-activity';
import {of} from 'rxjs';
import * as TypeMoq from 'typemoq';
import {MatIconModule} from '@angular/material/icon';

describe('ProcessingActivitiesListComponent', () => {
  let component: ProcessingActivitiesListComponent;
  let fixture: ComponentFixture<ProcessingActivitiesListComponent>;
  let service: ProcessingActivitiesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProcessingActivitiesListComponent],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
        MatListModule,
        MatIconModule
      ],
      providers: [ProcessingActivitiesService]
    })
      .compileComponents();
    service = TestBed.inject(ProcessingActivitiesService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessingActivitiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load processing activities on init empty list', async () => {
    spyOn(service, 'getAll').and.returnValue(of(new Array<ProcessingActivity>()));
    component.ngOnInit();
    expect(component.activities.length).toBe(0);
  });

  it('should load processing activities to html', async () => {
    const compiled = fixture.debugElement.nativeElement;

    const activity = TypeMoq.Mock.ofType<ProcessingActivity>();
    activity.setup(x => x.name).returns(() => '');
    activity.setup(x => x.createdAt).returns(() => new Date());
    activity.setup(x => x.updatedAt).returns(() => new Date());
    spyOn(service, 'getAll').and.returnValue(of(new Array<ProcessingActivity>(activity.object)));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.activities.length).toBe(1);
    expect(compiled.querySelectorAll('mat-list-item')).not.toBeNull();
  });

});
