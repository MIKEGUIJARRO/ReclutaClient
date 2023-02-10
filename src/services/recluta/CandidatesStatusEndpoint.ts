import { Endpoint, GenericResponse } from '../base/BaseAPI';
import {
  BaseAPIEndpoint,
  GenericOptions,
  IBaseEndpoint,
} from '../base/BaseAPIEndpoint';

export interface ICandidatesStatusEndpoint extends IBaseEndpoint {
  bulkCreate(options: GenericOptions): Promise<GenericResponse | undefined>;
}

export class CandidatesStatusEndpoint
  extends BaseAPIEndpoint
  implements ICandidatesStatusEndpoint
{
  async bulkCreate(
    options: GenericOptions
  ): Promise<GenericResponse | undefined> {
    let endpoint: Endpoint = {
      method: 'POST',
      resource: this.endpoint + '/bulk',
    };
    endpoint = this.loadBody(endpoint, options.body);
    endpoint = this.loadParams(endpoint, options.params);
    return await this.fetchData(endpoint);
  }
}
