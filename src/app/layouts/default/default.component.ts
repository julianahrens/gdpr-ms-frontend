import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorageService} from '../../util/local-storage.service';

@Component({
  selector: 'gms-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.sass']
})
export class DefaultComponent implements OnInit {

  sidebarOpen = true;

  constructor(
    private titleService: Title,
    private translate: TranslateService,
    private storage: LocalStorageService
  ) {
  }

  ngOnInit(): void {
    this.translate.setDefaultLang(this.storage.getItem('lang', 'en'));
    this.updateTitle();
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    this.updateTitle();
    this.storage.setItem('lang', lang);
  }

  private updateTitle() {
    this.translate.get('general.title').subscribe(
      (value: string) => this.titleService.setTitle(value)
    );
  }

}
