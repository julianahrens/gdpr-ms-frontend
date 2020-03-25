import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'gms-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.sass']
})
export class DefaultComponent implements OnInit {

  sidebarOpen = true;

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('GDPR Management System');
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

}
