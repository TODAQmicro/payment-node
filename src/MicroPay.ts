import { MicroOptions } from './types';
import * as resources from './resources';
// import { MicroOptions, MicroInterface } from './types';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8500';

// interfaceCall is a Symbol that represents what might be an interface in the
//  SDK.
const interfaceCall = Symbol('interface-call');
// export { interfaceCall };

// MicroInterfaceFunction is a function that exists on an interface in the SDK
export type MicroInterfaceFunction = (...args: any) => Promise<void> | null;

export type MicroInterfaceObject = {
  [interfaceCall]: MicroInterfaceFunction;
};

export class Micro {
  static VERSIONS: { [type: symbol | string]: string } = {
    [Symbol('latest')]: 'v2',
    'v2': 'v2',
  };

  // private authenticated: Promise<void> | null = null;

  private clientId?: string;
  private clientSecret?: string;
  // private get credentials() { return btoa(`${this.clientId}:${this.clientSecret}`); };
  private accessToken: string = "";
  private refreshToken: string = "";

  public async authCredentials(clientId: string, clientSecret: string): Promise<void> {
    this.clientId = clientId;
    this.clientSecret = clientSecret;

    const response = await fetch(
      `${API_BASE_URL}/${String(this.version)}/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`,
        },
      },
    );

    const { access_token, refresh_token } = (await response.json() as any);

    this.accessToken = access_token;
    this.refreshToken = refresh_token;

    console.log('ACCESS', this.accessToken, 'REFRESH', this.refreshToken);
  }

  private v: symbol | string = Symbol('latest');
  private get version() {
    return Micro.VERSIONS[this.v];
  }
  private set version(value: symbol | string) {
    this.v = value;
  }

  constructor(
    clientId: string,
    clientSecret: string,
    {
      apiVersion = process.env.NODE_ENV !== 'prod' &&
      process.env.NODE_ENV !== 'produciton'
        ? 'main'
        : Symbol('latest'),
    }: MicroOptions,
  ) {
    this.version = apiVersion;

    /*this.authenticated = */this.authCredentials(clientId, clientSecret);

    const protectedKeys = Object.keys(this);
    for (const resourceKey of Object.keys(resources)) {
      if (!protectedKeys.includes(resourceKey)) {
        // NOTE(mihok): There is likely a better way to do this but isnt 
        //  {Type|Java}Script fun!
        (this as any)[resourceKey] = (resources as any)[resourceKey];
      }
    }
  }

  // TODO(mihok): Wrap resource interface functions in a Request like object
  //  that takes care of authentication bits.
}
