export interface MicroInterface {
  setCredentials: (id: string, secret: string) => void;
}

export interface MicroOptions {
  apiVersion: symbol | string;
}
