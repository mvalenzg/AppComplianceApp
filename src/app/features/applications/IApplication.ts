import { AppOptions } from '../../core/enums/app.enums';
import { IOwner, ISite } from '../catalogs';

export interface IApplication {
  id: string;
  name: string;
  siteId: string;
  ownerId: string;
  hasRepo: boolean;
  repoUrl?: string;
  hasBrd: AppOptions;
  hasFsd: AppOptions;
  hasTsd: AppOptions;
  documentationUrl?: string;
  hasPipeLine: AppOptions;
  hasAutomaticDeploys: AppOptions;
  hasSonar: AppOptions;
  sonarUrl?: string;
  notes?: string;
  owner?: IOwner;
  site?: ISite;
}
