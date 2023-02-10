import { BaseAPI, Endpoint, GenericResponse } from '../base/BaseAPI';
import { GenericOptions } from '../base/BaseAPIEndpoint';

export interface IKanbanPositionEndpoint {
  findOne(options: GenericOptions): Promise<GenericResponse | undefined>;
}

export class KanbanPositionEndpoint
  extends BaseAPI
  implements IKanbanPositionEndpoint
{
  constructor(public endpoint: string, public hostname: string) {
    super(hostname);
  }

  async findOne(options: GenericOptions): Promise<GenericResponse | undefined> {
    if (!options.id) {
      throw Error('id param required for this API method');
    }
    let endpoint: Endpoint = {
      method: 'GET',
      resource: this.endpoint + `/${options.id}/kanban`,
    };
    endpoint = this.loadBody(endpoint, options.body);
    endpoint = this.loadParams(endpoint, options.params);
    return await this.fetchData(endpoint);
  }
}
