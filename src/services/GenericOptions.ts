export interface Param {
  [key: string]: string | number;
}

export interface GenericOptions {
  id?: string;
  body?: Object;
  params?: Param;
}
