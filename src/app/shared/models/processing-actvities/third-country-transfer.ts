import {Recipients} from './recipients';

export interface ThirdCountryTransfer {
  transfer: boolean;
  information: string;
  recipients: Recipients[];
  safeguards: string[];
}
