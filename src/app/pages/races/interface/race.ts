import { Specie } from 'app/pages/species/interface/specie';

export interface Race {
  name: string;
  species?: Specie[];
  isActive?: boolean;
  _id?: string;
}
