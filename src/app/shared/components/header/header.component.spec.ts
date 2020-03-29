import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HeaderComponent} from './header.component';
import {MatMenuModule} from '@angular/material/menu';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {HttpLoaderFactory} from '@app/app.module';
import {HttpClient} from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';

const TRANSLATION_EN = require('@i18n/en.json');
const TRANSLATION_DE = require('@i18n/de.json');

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let translate: TranslateService;
  let http: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        MatMenuModule,
        MatIconModule,
        MatToolbarModule,
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
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    translate.setDefaultLang('en');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load translations', async () => {
    let compiled = fixture.debugElement.nativeElement;

    // the DOM should have the id for now since the translations haven't been rendered yet
    expect(compiled.querySelector('mat-toolbar mat-toolbar-row span').textContent).toEqual('general.title');

    http.expectOne('/assets/i18n/en.json').flush(TRANSLATION_EN);
    http.expectNone('/assets/i18n/de.json');

    // Finally, assert that there are no outstanding requests.
    http.verify();

    fixture.detectChanges();
    // the content should be translated to english now
    expect(compiled.querySelector('mat-toolbar mat-toolbar-row span').textContent).toEqual(TRANSLATION_EN.general.title);

    translate.use('de');
    http.expectOne('/assets/i18n/de.json').flush(TRANSLATION_DE);

    // Finally, assert that there are no outstanding requests.
    http.verify();

    // the content has not changed yet
    expect(compiled.querySelector('mat-toolbar mat-toolbar-row span').textContent).toEqual(TRANSLATION_EN.general.title);

    fixture.detectChanges();
    // the content should be translated to german now
    expect(compiled.querySelector('mat-toolbar mat-toolbar-row span').textContent).toEqual(TRANSLATION_DE.general.title);
  });

});
