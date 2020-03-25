import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'gms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  @Output() sidebarToggle: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.sidebarToggle.emit();
  }

}
