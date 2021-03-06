import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'gms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  @Output() sidebarToggle: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectedLanguage: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebar(): void {
    this.sidebarToggle.emit();
  }

  useLanguage(lang: string): void {
    this.selectedLanguage.emit(lang);
  }

}
