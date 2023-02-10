import { BaseAPI, Endpoint, GenericResponse } from '../base/BaseAPI';
import { GenericOptions } from '../GenericOptions';

export class AuthEndpoint extends BaseAPI {
  constructor(public endpoint: string, public hostname: string) {
    super(hostname);
  }

  async loginLocal(
    options: GenericOptions
  ): Promise<GenericResponse | undefined> {
    let endpoint: Endpoint = {
      method: 'POST',
      resource: this.endpoint + '/login/local',
    };
    endpoint = this.loadBody(endpoint, options.body);
    endpoint = this.loadParams(endpoint, options.params);
    return await this.fetchData(endpoint);
  }
  async signupLocal(
    options: GenericOptions
  ): Promise<GenericResponse | undefined> {
    let endpoint: Endpoint = {
      method: 'POST',
      resource: this.endpoint + '/signup/local',
    };
    endpoint = this.loadBody(endpoint, options.body);
    endpoint = this.loadParams(endpoint, options.params);
    return await this.fetchData(endpoint);
  }
  async getProfile(
    options: GenericOptions
  ): Promise<GenericResponse | undefined> {
    let endpoint: Endpoint = {
      method: 'GET',
      resource: this.endpoint + '/profile',
    };
    endpoint = this.loadBody(endpoint, options.body);
    endpoint = this.loadParams(endpoint, options.params);
    return await this.fetchData(endpoint);
  }
  async logout(options: GenericOptions): Promise<GenericResponse | undefined> {
    let endpoint: Endpoint = {
      method: 'POST',
      resource: this.endpoint + '/logout',
    };
    endpoint = this.loadBody(endpoint, options.body);
    endpoint = this.loadParams(endpoint, options.params);
    return await this.fetchData(endpoint);
  }
}
