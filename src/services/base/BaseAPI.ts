export interface Param {
  [key: string]: string | number;
}

export interface Endpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  resource: string;
  params?: Param;
  body?: Object;
}

export interface GenericResponse {
  success: boolean;
  data: any;
  message: Object | undefined;
  error: string | undefined;
}

export class BaseAPI {
  constructor(public hostname: string) {}

  protected headers: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  protected loadBody(endpoint: Endpoint, body: Object | undefined): Endpoint {
    if (body) {
      endpoint.body = body;
      return endpoint;
    }
    return endpoint;
  }
  protected loadParams(
    endpoint: Endpoint,
    params: Param | undefined
  ): Endpoint {
    if (params) {
      endpoint.params = { ...params };
      return endpoint;
    }
    return endpoint;
  }

  protected async fetchData(endpoint: Endpoint) {
    try {
      const url = new URL(this.hostname + endpoint.resource);
      if (endpoint.params) {
        for (let key in endpoint.params) {
          url.searchParams.append(key, String(endpoint.params[key]));
        }
      }

      const params: RequestInit = {
        method: endpoint.method,
        credentials: 'include',
        headers: this.headers,
      };

      if (endpoint.method !== 'GET' && endpoint.body) {
        params.body = JSON.stringify(endpoint.body);
      }

      const response = await fetch(url.href, params);
      const data: GenericResponse = await response.json();
      return data;
    } catch (e) {
      console.log('An error was found');
      console.log(e);
    }
  }
}
