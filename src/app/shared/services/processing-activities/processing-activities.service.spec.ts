import {TestBed} from '@angular/core/testing';

import {ProcessingActivitiesService} from './processing-activities.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '@env/environment';
import {ProcessingActivity} from '@models/processing-actvities/processing-activity';
import * as TypeMoq from 'typemoq';


describe('ProcessingActivitiesService', () => {
  let service: ProcessingActivitiesService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ProcessingActivitiesService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all', async () => {
    service.getAll().subscribe();

    const request = http.expectOne(`${environment.apiUrl}/processing-activities`);
    http.verify();

    expect(request.request.method).toBe('GET');
  });

  it('should get one', async () => {
    service.getOne('123').subscribe();

    const request = http.expectOne(`${environment.apiUrl}/processing-activities/123`);
    http.verify();

    expect(request.request.method).toBe('GET');
  });

  it('should post a activity', async () => {
    service.add(null).subscribe();

    const request = http.expectOne(`${environment.apiUrl}/processing-activities`);
    http.verify();

    expect(request.request.method).toBe('POST');
  });

  it('should put a activity', async () => {
    const activity = TypeMoq.Mock.ofType<ProcessingActivity>();
    activity.setup(x => x.id).returns(() => '123');

    service.update(activity.object).subscribe();

    const request = http.expectOne(`${environment.apiUrl}/processing-activities/123`);
    http.verify();

    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toBe(activity.object);
  });

  it('should delete a activity', async () => {
    service.delete('123').subscribe();

    const request = http.expectOne(`${environment.apiUrl}/processing-activities/123`);
    http.verify();

    expect(request.request.method).toBe('DELETE');
  });

});
