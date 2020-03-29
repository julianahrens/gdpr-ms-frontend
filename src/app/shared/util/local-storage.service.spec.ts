import {TestBed} from '@angular/core/testing';

import {LocalStorageService} from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  let store: {};

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);

    store = {};
    spyOn(localStorage, 'getItem').and.callFake((key) => {
      return store[key];
    });
    spyOn(localStorage, 'setItem').and.callFake((key, value) => {
      store[key] = value;
    });
    spyOn(localStorage, 'removeItem').and.callFake((key) => {
      delete store[key];
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set item to localStorage', async () => {
    const keyValue = 'key';
    service.setItem(keyValue, 'value');
    expect(store[keyValue]).toEqual('value');
  });

  it('should get item if present in localStorage without default value', async () => {
    const keyValue = 'key';
    store[keyValue] = 'value';
    expect(service.getItem(keyValue)).toEqual('value');
  });

  it('should get item if present in localStorage with default value', async () => {
    const keyValue = 'key';
    store[keyValue] = 'value';
    expect(service.getItem(keyValue, 'test')).toEqual('value');
  });

  it('should get default value if key not present in localStorage', async () => {
    const keyValue = 'key';
    expect(service.getItem(keyValue, 'test')).toEqual('test');
  });

  it('should get empty string if key not present in localStorage and no defaultValue is set', async () => {
    const keyValue = 'key';
    expect(service.getItem(keyValue)).toEqual('');
  });

  it('should delete item from localStorage', async () => {
    const keyValue = 'key';
    store[keyValue] = 'value';
    expect(store[keyValue]).toEqual('value');

    service.deleteItem(keyValue);
    expect(store[keyValue]).toBeUndefined();
  })

});
