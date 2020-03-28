import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'gms-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.sass']
})
export class DefaultComponent implements OnInit {

  sidebarOpen = true;

  constructor(private titleService: Title, private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.translate.setDefaultLang('en');
    this.updateTitle();
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    this.updateTitle();
  }

  private updateTitle() {
    this.translate.get('general.title').subscribe(
      (value: string) => this.titleService.setTitle(value)
    );
  }

}
