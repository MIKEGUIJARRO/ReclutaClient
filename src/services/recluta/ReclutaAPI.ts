import { IBaseEndpoint } from '../base/BaseAPIEndpoint';
import { AuthEndpoint, IAuthEndpoint } from './AuthEndpoint';
import { ENDPOINTS } from '../../constants/ENDPOINTS';
import { CompanyEndpoint } from './CompanyEndpoint';
import { PositionsEndpoint } from './PositionsEndpoint';
import { CandidatesEndpoint } from './CandidatesEndpoint';
import {
  CandidatesStatusEndpoint,
  ICandidatesStatusEndpoint,
} from './CandidatesStatusEndpoint';
import {
  IKanbanPositionEndpoint,
  KanbanPositionEndpoint,
} from './KanbanPositionEndpoint';

type Endpoints = {
  auth: IAuthEndpoint;
  company: IBaseEndpoint;
  positions: IBaseEndpoint;
  candidates: IBaseEndpoint;
  candidatesStatus: ICandidatesStatusEndpoint;
  kanbanPosition: IKanbanPositionEndpoint;
};

class ReclutaAPI {
  constructor(protected endpoints: Endpoints) {}

  public get auth() {
    return this.endpoints.auth;
  }
  public get company() {
    return this.endpoints.company;
  }
  public get positions() {
    return this.endpoints.positions;
  }
  public get candidates() {
    return this.endpoints.candidates;
  }
  public get candidatesStatus() {
    return this.endpoints.candidatesStatus;
  }
  public get kanbanPosition() {
    return this.endpoints.kanbanPosition;
  }
}

const authEndpoint = new AuthEndpoint(
  '/api/v1/auth',
  ENDPOINTS.reclutaHostNameURL
);
const companyEndpoint = new CompanyEndpoint(
  '/api/v1/company',
  ENDPOINTS.reclutaHostNameURL
);
const positionsEndpoint = new PositionsEndpoint(
  '/api/v1/positions',
  ENDPOINTS.reclutaHostNameURL
);
const candidatesEndpoint = new CandidatesEndpoint(
  '/api/v1/candidates',
  ENDPOINTS.reclutaHostNameURL
);
const candidatesStatusEndpoint = new CandidatesStatusEndpoint(
  '/api/v1/candidates-status',
  ENDPOINTS.reclutaHostNameURL
);
const kanbanPositionEndpoint = new KanbanPositionEndpoint(
  '/api/v1/positions',
  ENDPOINTS.reclutaHostNameURL
);

const endpoints = {
  auth: authEndpoint,
  company: companyEndpoint,
  positions: positionsEndpoint,
  candidates: candidatesEndpoint,
  candidatesStatus: candidatesStatusEndpoint,
  kanbanPosition: kanbanPositionEndpoint,
};

const reclutaAPI = new ReclutaAPI(endpoints);

export { reclutaAPI };
