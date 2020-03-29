import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DefaultComponent} from './default.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {HttpLoaderFactory} from '@app/app.module';
import {HttpClient} from '@angular/common/http';
import {MatSidenavModule} from '@angular/material/sidenav';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {SharedModule} from '@shared/shared.module';
import {Title} from '@angular/platform-browser';
import {LocalStorageService} from '@shared/util/local-storage.service';
import {of} from 'rxjs';

describe('DefaultComponent', () => {
  let component: DefaultComponent;
  let fixture: ComponentFixture<DefaultComponent>;
  let translate: TranslateService;
  let http: HttpTestingController;
  let title: Title;
  let localstorageService: LocalStorageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DefaultComponent
      ],
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        MatSidenavModule,
        SharedModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      providers: [
        Title,
        LocalStorageService
      ]
    })
      .compileComponents();
    translate = TestBed.inject(TranslateService);
    http = TestBed.inject(HttpTestingController);
    title = TestBed.inject(Title);
    localstorageService = TestBed.inject(LocalStorageService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    translate.setDefaultLang('en');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle sidebar from false to true', async () => {
    component.sidebarOpen = false;
    component.toggleSidebar();
    expect(component.sidebarOpen).toBeTrue();
  });

  it('should toggle sidebar from true to false', async () => {
    component.sidebarOpen = true;
    component.toggleSidebar();
    expect(component.sidebarOpen).toBeFalse();
  });

  it('should change language in service', async () => {
    spyOn(translate, 'use').and.callThrough();
    component.changeLanguage('de');
    expect(translate.use).toHaveBeenCalledWith('de');
  });

  it('should update title on language change', async () => {
    spyOn(translate, 'get').withArgs('general.title').and.returnValue(of('test'));
    spyOn(title, 'setTitle').and.callThrough();
    component.changeLanguage('de');
    expect(title.setTitle).toHaveBeenCalledWith('test');
  });

  it('should update language in localStorage', async () => {
    spyOn(localstorageService, 'setItem').and.callThrough();
    component.changeLanguage('de');
    expect(localstorageService.setItem).toHaveBeenCalledWith('lang', 'de')
  });

});
