import { Specie } from '@pages/species/interface/specie';

export interface Race {
  name: string;
  species?: Specie[];
  isActive?: boolean;
  _id?: string;
}
