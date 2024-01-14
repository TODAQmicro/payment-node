import * as resources from './resources';
// import { MicroOptions, MicroInterface } from './types';
// interfaceCall is a Symbol that represents what might be an interface in the
//  SDK.
const interfaceCall = Symbol('interface-call');
export class Micro {
    // private clientId?: string;
    // private clientSecret?: string;
    // private get credentials() { return btoa(`${this.clientId}:${this.clientSecret}`);  };
    // public setCredentials(clientId: string, clientSecret: string) {
    //   this.clientId = clientId;
    //   this.clientSecret = clientSecret;
    // }
    // private version: symbol | string;
    constructor(
    // clientId: string,
    // clientSecret: string,
    // {
    //   apiVersion = process.env.NODE_ENV !== 'prod' &&
    //   process.env.NODE_ENV !== 'produciton'
    //     ? 'main'
    //     : Symbol('latest'),
    // }: MicroOptions,
    ) {
        // this.version = apiVersion;
        // this.setCredentials(clientId, clientSecret);
        const protectedKeys = Object.keys(this);
        for (const resourceKey of Object.keys(resources)) {
            if (!protectedKeys.includes(resourceKey)) {
                // NOTE(mihok): There is likely a better way to do this but isnt 
                //  {Type|Java}Script fun!
                this[resourceKey] = resources[resourceKey];
            }
        }
    }
}
Micro.VERSIONS = {
    [Symbol('latest')]: 'main',
    'main': 'main',
};
//# sourceMappingURL=MicroPay.js.map