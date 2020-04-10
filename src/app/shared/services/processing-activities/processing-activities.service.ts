import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ProcessingActivity} from '@models/processing-actvities/processing-activity';
import {environment} from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ProcessingActivitiesService {

  private readonly BASE_URL;

  constructor(private http: HttpClient) {
    this.BASE_URL = environment.apiUrl + '/processing-activities';
  }

  public getAll(): Observable<ProcessingActivity[]> {
    return this.http.get<ProcessingActivity[]>(`${this.BASE_URL}`);
  }

  public getOne(uuid: string): Observable<ProcessingActivity> {
    return this.http.get<ProcessingActivity>(`${this.BASE_URL}/${uuid}`);
  }

  public add(processingActivity: ProcessingActivity): Observable<ProcessingActivity> {
    return this.http.post<ProcessingActivity>(`${this.BASE_URL}`, processingActivity);
  }

  public update(processingActivity: ProcessingActivity): Observable<ProcessingActivity> {
    return this.http.put<ProcessingActivity>(`${this.BASE_URL}/${processingActivity.id}`, processingActivity);
  }

  public delete(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${uuid}`);
  }

}
