import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FooterComponent} from './footer.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {HttpLoaderFactory} from '@app/app.module';
import {HttpClient} from '@angular/common/http';
import {MatDividerModule} from '@angular/material/divider';

const TRANSLATION_EN = require('@i18n/en.json');
const TRANSLATION_DE = require('@i18n/de.json');

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let translate: TranslateService;
  let http: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent],
      imports: [
        MatDividerModule,
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
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    translate.setDefaultLang('en');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load translations', async () => {
    const compiled = fixture.debugElement.nativeElement;

    // the DOM should have the id for now since the translations haven't been rendered yet
    expect(compiled.querySelector('#legal').textContent).toEqual('general.rightsReserved');

    http.expectOne('/assets/i18n/en.json').flush(TRANSLATION_EN);
    http.expectNone('/assets/i18n/de.json');

    // Finally, assert that there are no outstanding requests.
    http.verify();

    fixture.detectChanges();
    // the content should be translated to english now
    expect(compiled.querySelector('#legal').textContent).toEqual(TRANSLATION_EN.general.rightsReserved);

    translate.use('de');
    http.expectOne('/assets/i18n/de.json').flush(TRANSLATION_DE);

    // Finally, assert that there are no outstanding requests.
    http.verify();

    // the content has not changed yet
    expect(compiled.querySelector('#legal').textContent).toEqual(TRANSLATION_EN.general.rightsReserved);

    fixture.detectChanges();
    // the content should be translated to german now
    expect(compiled.querySelector('#legal').textContent).toEqual(TRANSLATION_DE.general.rightsReserved);
  });

  it('get actual year', async () => {
    const compiled = fixture.debugElement.nativeElement;

    // should have right year in variable
    expect(component.year).toEqual(new Date().getFullYear());

    // should have right year in dom
    expect(compiled.querySelector('footer').textContent).toContain(new Date().getFullYear());
  });

});
