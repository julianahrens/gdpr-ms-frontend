import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SidebarComponent} from './sidebar.component';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpLoaderFactory} from '@app/app.module';
import {HttpClient} from '@angular/common/http';
import {MatListModule} from '@angular/material/list';

const TRANSLATION_EN = require('@i18n/en.json');
const TRANSLATION_DE = require('@i18n/de.json');

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let translate: TranslateService;
  let http: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      imports: [
        MatListModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ]
    })
      .compileComponents();
    translate = TestBed.inject(TranslateService);
    http = TestBed.inject(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    translate.setDefaultLang('en')
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load translations for dashboard item', async () => {
    let compiled = fixture.debugElement.nativeElement;

    // the DOM should have the id for now since the translations haven't been rendered yet
    expect(compiled.querySelector('#dashboard').textContent).toEqual('navigation.dashboard');

    http.expectOne('/assets/i18n/en.json').flush(TRANSLATION_EN);
    http.expectNone('/assets/i18n/de.json');

    // Finally, assert that there are no outstanding requests.
    http.verify();

    fixture.detectChanges();
    // the content should be translated to english now
    expect(compiled.querySelector('#dashboard').textContent).toEqual(TRANSLATION_EN.navigation.dashboard);

    translate.use('de');
    http.expectOne('/assets/i18n/de.json').flush(TRANSLATION_DE);

    // Finally, assert that there are no outstanding requests.
    http.verify();

    // the content has not changed yet
    expect(compiled.querySelector('#dashboard').textContent).toEqual(TRANSLATION_EN.navigation.dashboard);

    fixture.detectChanges();
    // the content should be translated to german now
    expect(compiled.querySelector('#dashboard').textContent).toEqual(TRANSLATION_DE.navigation.dashboard);
  });

  it('should load translations for processing-activities item', async () => {
    let compiled = fixture.debugElement.nativeElement;

    // the DOM should have the id for now since the translations haven't been rendered yet
    expect(compiled.querySelector('#processing-activities').textContent).toEqual('navigation.processingActivities');

    http.expectOne('/assets/i18n/en.json').flush(TRANSLATION_EN);
    http.expectNone('/assets/i18n/de.json');

    // Finally, assert that there are no outstanding requests.
    http.verify();

    fixture.detectChanges();
    // the content should be translated to english now
    expect(compiled.querySelector('#processing-activities').textContent).toEqual(TRANSLATION_EN.navigation.processingActivities);

    translate.use('de');
    http.expectOne('/assets/i18n/de.json').flush(TRANSLATION_DE);

    // Finally, assert that there are no outstanding requests.
    http.verify();

    // the content has not changed yet
    expect(compiled.querySelector('#processing-activities').textContent).toEqual(TRANSLATION_EN.navigation.processingActivities);

    fixture.detectChanges();
    // the content should be translated to german now
    expect(compiled.querySelector('#processing-activities').textContent).toEqual(TRANSLATION_DE.navigation.processingActivities);
  });

});
