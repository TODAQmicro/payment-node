import * as resources from './resources/index.js';
// import { MicroOptions, MicroInterface } from './types.js';
const API_BASE_URL = process.env.API_BASE_URL || 'https://pay.m.todaq.net';
// interfaceCall is a Symbol that represents what might be an interface in the
//  SDK.
const interfaceCall = Symbol('interface-call');
export class Micro {
    // private get credentials() { return btoa(`${this.clientId}:${this.clientSecret}`); };
    async authCredentials() {
        try {
            const response = await fetch(`${API_BASE_URL}/${String(this.version)}/account/oauth/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`,
                },
            });
            const { access_token, refresh_token } = (await response.json());
            console.log('ACCESS', access_token, 'REFRESH', refresh_token, API_BASE_URL);
            return access_token;
        }
        catch (error) {
            console.error('ERROR', error);
        }
    }
    get version() {
        return Micro.VERSIONS[this.v];
    }
    set version(value) {
        this.v = value;
    }
    constructor(clientId, clientSecret, { apiVersion = process.env.NODE_ENV !== 'prod' &&
        process.env.NODE_ENV !== 'produciton'
        ? 'main'
        : Symbol('latest'), }) {
        this.v = Symbol('latest');
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.version = apiVersion;
        const protectedKeys = Object.keys(this);
        for (const resourceKey of Object.keys(resources)) {
            if (!protectedKeys.includes(resourceKey)) {
                // NOTE(mihok): There is likely a better way to do this but isnt
                //  {Type|Java}Script fun!
                console.log('NODESDK', resources[resourceKey]);
                if (!this.hasOwnProperty(resourceKey)) {
                    this[resourceKey] = {};
                }
                for (const fnKey of Object.keys(resources[resourceKey])) {
                    this[resourceKey][fnKey] = resources[resourceKey][fnKey].bind(this);
                }
                // (this as any)[resourceKey] = (resources as any)[resourceKey];
            }
        }
    }
}
Micro.VERSIONS = {
    [Symbol('latest')]: 'v2',
    v2: 'v2',
};
//# sourceMappingURL=MicroPay.js.map