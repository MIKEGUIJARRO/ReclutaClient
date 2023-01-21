import { ENDPOINTS } from '../constants/ENDPOINTS';
import { GenericOptions, Param } from './GenericOptions';

interface User {
  firstName: string;
  middleName: string | null;
  lastName: string;
  email: string;
  password: string;
}

interface Endpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  resource: string;
  params: Param;
  body?: Object;
}

interface GenericResponse {
  success: boolean;
  data: any;
  message: Object | undefined;
  error: string | undefined;
}

export class ReclutaAPI {
  private HOSTNAME_URL: string = ENDPOINTS.reclutaHostNameURL;
  private endpoints = {
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
    company: {
      findOne: (options: GenericOptions): Endpoint => {
        return {
          method: 'GET',
          resource: `/api/v1/company/${options.id}`,
          params: {},
        };
      },
      findAll: (options: GenericOptions): Endpoint => {
        return {
          method: 'GET',
          resource: `/api/v1/company`,
          params: {},
        };
      },
      create: (options: GenericOptions): Endpoint => {
        return {
          method: 'POST',
          resource: `/api/v1/company`,
          params: {},
          body: options.body,
        };
      },
      update: (options: GenericOptions): Endpoint => {
        return {
          method: 'PUT',
          resource: `/api/v1/company/${options.id}`,
          params: {},
          body: options.body,
        };
      },
      delete: (options: GenericOptions): Endpoint => {
        return {
          method: 'DELETE',
          resource: `/api/v1/company/${options.id}`,
          params: {},
        };
      },
    },
    positions: {
      findOne: (options: GenericOptions): Endpoint => {
        return {
          method: 'GET',
          resource: `/api/v1/positions/${options.id}`,
          params: {},
        };
      },
      findAll: (options: GenericOptions): Endpoint => {
        return {
          method: 'GET',
          resource: `/api/v1/positions`,
          params: {},
        };
      },
      create: (options: GenericOptions): Endpoint => {
        return {
          method: 'POST',
          resource: `/api/v1/positions`,
          params: {},
          body: options.body,
        };
      },
      update: (options: GenericOptions): Endpoint => {
        return {
          method: 'PUT',
          resource: `/api/v1/positions/${options.id}`,
          params: {},
          body: options.body,
        };
      },
      delete: (options: GenericOptions): Endpoint => {
        return {
          method: 'DELETE',
          resource: `/api/v1/positions/${options.id}`,
          params: {},
        };
      },
    },
    candidates: {
      findOne: (options: GenericOptions): Endpoint => {
        return {
          method: 'GET',
          resource: `/api/v1/candidates/${options.id}`,
          params: {},
        };
      },
      findAll: (options: GenericOptions): Endpoint => {
        return {
          method: 'GET',
          resource: `/api/v1/candidates`,
          params: { ...options.params },
        };
      },
      create: (options: GenericOptions): Endpoint => {
        return {
          method: 'POST',
          resource: `/api/v1/candidates`,
          params: {},
          body: options.body,
        };
      },
      update: (options: GenericOptions): Endpoint => {
        return {
          method: 'PUT',
          resource: `/api/v1/candidates/${options.id}`,
          params: {},
          body: options.body,
        };
      },
      delete: (options: GenericOptions): Endpoint => {
        return {
          method: 'DELETE',
          resource: `/api/v1/candidates/${options.id}`,
          params: {},
        };
      },
    },
    candidatesStatus: {
      findOne: (options: GenericOptions): Endpoint => {
        const endpoint: Endpoint = {
          method: 'GET',
          resource: `/api/v1/candidates-status/${options.id}`,
          params: {},
        };
        if (options.params) {
          endpoint.params = { ...options.params };
        }
        return endpoint;
      },
      findAll: (options: GenericOptions): Endpoint => {
        const endpoint: Endpoint = {
          method: 'GET',
          resource: `/api/v1/candidates-status`,
          params: {},
        };
        if (options.params) {
          endpoint.params = { ...options.params };
        }
        return endpoint;
      },
      create: (options: GenericOptions): Endpoint => {
        const endpoint: Endpoint = {
          method: 'POST',
          resource: `/api/v1/candidates-status`,
          params: {},
          body: options.body,
        };
        if (options.params) {
          endpoint.params = { ...options.params };
        }

        return endpoint;
      },
      bulkCreate: (options: GenericOptions): Endpoint => {
        const endpoint: Endpoint = {
          method: 'POST',
          resource: `/api/v1/candidates-status/bulk`,
          params: {},
          body: options.body,
        };
        if (options.params) {
          endpoint.params = { ...options.params };
        }

        return endpoint;
      },
      update: (options: GenericOptions): Endpoint => {
        const endpoint: Endpoint = {
          method: 'PUT',
          resource: `/api/v1/candidates-status/${options.id}`,
          params: {},
          body: options.body,
        };
        if (options.params) {
          endpoint.params = { ...options.params };
        }
        return endpoint;
      },
      delete: (options: GenericOptions): Endpoint => {
        const endpoint: Endpoint = {
          method: 'DELETE',
          resource: `/api/v1/candidates-status/${options.id}`,
          params: {},
        };
        if (options.params) {
          endpoint.params = { ...options.params };
        }
        return endpoint;
      },
    },
    kanbanPosition: {
      findOne: (options: GenericOptions): Endpoint => {
        const endpoint: Endpoint = {
          method: 'GET',
          resource: `/api/v1/positions/${options.id}/kanban`,
          params: {},
        };
        if (options.params) {
          endpoint.params = { ...options.params };
        }

        return endpoint;
      },
    },
  };

  private headers: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  constructor() {
    console.log('Endpoints');
    console.log(this.HOSTNAME_URL);
  }

  private async fetchData(endpoint: Endpoint) {
    try {
      const url = new URL(this.HOSTNAME_URL + endpoint.resource);
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

  async auth(
    method: 'loginLocal' | 'signupLocal' | 'getProfile' | 'logout',
    options: Object = {}
  ) {
    const existingEndpoint = this.endpoints.auth[method];
    const endpoint = existingEndpoint(options);
    return await this.fetchData(endpoint);
  }

  async company(
    method: 'findOne' | 'findAll' | 'create' | 'update' | 'delete',
    options: GenericOptions
  ) {
    const existingEndpoint = this.endpoints.company[method];
    const endpoint = existingEndpoint(options);
    return await this.fetchData(endpoint);
  }

  async positions(
    method: 'findOne' | 'findAll' | 'create' | 'update' | 'delete',
    options: GenericOptions
  ) {
    const existingEndpoint = this.endpoints.positions[method];
    const endpoint = existingEndpoint(options);
    return await this.fetchData(endpoint);
  }

  async candidates(
    method: 'findOne' | 'findAll' | 'create' | 'update' | 'delete',
    options: GenericOptions
  ) {
    const existingEndpoint = this.endpoints.candidates[method];
    const endpoint = existingEndpoint(options);
    return await this.fetchData(endpoint);
  }

  async candidatesStatus(
    method:
      | 'findOne'
      | 'findAll'
      | 'create'
      | 'bulkCreate'
      | 'update'
      | 'delete',
    options: GenericOptions
  ) {
    const existingEndpoint = this.endpoints.candidatesStatus[method];
    const endpoint = existingEndpoint(options);
    return await this.fetchData(endpoint);
  }

  async kanbanPosition(method: 'findOne', options: GenericOptions) {
    const existingEndpoint = this.endpoints.kanbanPosition[method];
    const endpoint = existingEndpoint(options);
    return await this.fetchData(endpoint);
  }
}

const reclutaAPI = new ReclutaAPI();
