import {Component, OnInit} from '@angular/core';
import {ProcessingActivitiesService} from '@services/processing-activities/processing-activities.service';
import {ProcessingActivity} from '@shared/models/processing-actvities/processing-activity';

@Component({
  selector: 'gms-processing-activities-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ProcessingActivitiesListComponent implements OnInit {

  activities: ProcessingActivity[];

  constructor(private service: ProcessingActivitiesService) {
  }

  ngOnInit(): void {
    this.service.getAll().subscribe(value => this.activities = value);
  }

}
