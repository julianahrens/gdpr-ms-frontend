import {Person} from './person';
import {PersonalData} from './personal-data';
import {Recipients} from './recipients';
import {ThirdCountryTransfer} from './third-country-transfer';

export interface ProcessingActivity {
  id: string;
  name: string;
  responsible: Person[];
  dataProtectionOfficer: Person;
  responsibleDepartment: string;
  purposeOfProcessing: string[];
  nameOfUsedMethod: string;
  descriptionOfCategories: string;
  categoriesOfPersonalData: PersonalData[];
  recipients: Recipients;
  thirdCountryTransfer: ThirdCountryTransfer;
  limitsForErasure: string;
  technicalAndOrganisationalSecurity: string[];
  updatedAt: Date;
  createdAt: Date;
}
