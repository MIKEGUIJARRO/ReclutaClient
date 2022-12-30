import { ENDPOINTS } from '../constants/ENDPOINTS';

interface User {
  firstName: string;
  middleName: string | null;
  lastName: string;
  email: string;
  password: string;
}

type Params = {
  [key: string]: string | number;
};

interface Endpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  resource: string;
  params: Params;
  body: Object;
}

interface GenericResponse {
  success: boolean;
  data: Object | undefined;
  message: Object | undefined;
  error: string | undefined;
}

export class ReclutaAPI {
  HOSTNAME_URL: string = ENDPOINTS.reclutaHostNameURL;
  endpoints = {
    auth: {
      loginLocal: (options: User | Object): Endpoint => {
        return {
          method: 'POST',
          resource: '/api/v1/auth/login/local',
          params: {},
          body: {
            ...options,
          },
        };
      },
      signupLocal: (options: User | Object): Endpoint => {
        return {
          method: 'POST',
          resource: '/api/v1/auth/signup/local',
          params: {},
          body: {
            ...options,
          },
        };
      },
      getProfile: (options = {}): Endpoint => {
        return {
          method: 'GET',
          resource: '/api/v1/auth/profile',
          params: {},
          body: {
            ...options,
          },
        };
      },
      logout: (options = {}): Endpoint => {
        return {
          method: 'POST',
          resource: '/api/v1/auth/logout',
          params: {},
          body: {
            ...options,
          },
        };
      },
    },
  };
  headers: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  constructor() {}

  async fetchData(endpoint: Endpoint) {
    try {
      const url = new URL(this.HOSTNAME_URL + endpoint.resource);
      if (endpoint.params) {
        for (const key in endpoint.params) {
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

  async auth(
    method: 'loginLocal' | 'signupLocal' | 'getProfile' | 'logout',
    options: Object = {}
  ) {
    console.log(method);
    const existingEndpoint = this.endpoints.auth[method];
    const endpoint = existingEndpoint(options);
    return await this.fetchData(endpoint);
  }
}
