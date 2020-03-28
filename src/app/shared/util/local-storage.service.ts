import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getItem(key: string, defaultValue?: string): string {
    const result: string | null = localStorage.getItem(key);
    if (result) {
      return result;
    }
    if (defaultValue) {
      return defaultValue;
    }
    return '';
  }

  deleteItem(key: string): void {
    localStorage.removeItem(key);
  }

}
