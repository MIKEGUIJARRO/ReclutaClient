import { BaseAPI, Endpoint, GenericResponse } from './BaseAPI';

export interface Param {
  [key: string]: string | number;
}

export interface GenericOptions {
  id?: string;
  body?: Object;
  params?: Param;
}

export interface IBaseEndpoint {
  findOne(options: GenericOptions): Promise<GenericResponse | undefined>;
  findAll(options: GenericOptions): Promise<GenericResponse | undefined>;
  create(options: GenericOptions): Promise<GenericResponse | undefined>;
  update(options: GenericOptions): Promise<GenericResponse | undefined>;
  delete(options: GenericOptions): Promise<GenericResponse | undefined>;
}

export abstract class BaseAPIEndpoint extends BaseAPI implements IBaseEndpoint {
  constructor(public endpoint: string, public hostname: string) {
    super(hostname);
  }
  async findOne(options: GenericOptions): Promise<GenericResponse | undefined> {
    if (!options.id) {
      throw Error('id param required for this API method');
    }
    let endpoint: Endpoint = {
      method: 'GET',
      resource: this.endpoint + `/${options.id}`,
    };
    endpoint = this.loadBody(endpoint, options.body);
    endpoint = this.loadParams(endpoint, options.params);
    return await this.fetchData(endpoint);
  }
  async findAll(options: GenericOptions): Promise<GenericResponse | undefined> {
    let endpoint: Endpoint = {
      method: 'GET',
      resource: this.endpoint,
    };
    endpoint = this.loadBody(endpoint, options.body);
    endpoint = this.loadParams(endpoint, options.params);
    return await this.fetchData(endpoint);
  }
  async create(options: GenericOptions): Promise<GenericResponse | undefined> {
    let endpoint: Endpoint = {
      method: 'POST',
      resource: this.endpoint,
    };
    endpoint = this.loadBody(endpoint, options.body);
    endpoint = this.loadParams(endpoint, options.params);
    return await this.fetchData(endpoint);
  }
  async update(options: GenericOptions): Promise<GenericResponse | undefined> {
    if (!options.id) {
      throw Error('id param required for this API method');
    }
    let endpoint: Endpoint = {
      method: 'PUT',
      resource: this.endpoint + `/${options.id}`,
    };
    endpoint = this.loadBody(endpoint, options.body);
    endpoint = this.loadParams(endpoint, options.params);
    return await this.fetchData(endpoint);
  }
  async delete(options: GenericOptions): Promise<GenericResponse | undefined> {
    if (!options.id) {
      throw Error('id param required for this API method');
    }
    let endpoint: Endpoint = {
      method: 'DELETE',
      resource: this.endpoint + `/${options.id}`,
    };
    endpoint = this.loadBody(endpoint, options.body);
    endpoint = this.loadParams(endpoint, options.params);
    return await this.fetchData(endpoint);
  }
}
