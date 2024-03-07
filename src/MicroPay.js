import * as resources from './resources';
// import { MicroOptions, MicroInterface } from './types';
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8500';
// interfaceCall is a Symbol that represents what might be an interface in the
//  SDK.
const interfaceCall = Symbol('interface-call');
export class Micro {
    async authCredentials(clientId, clientSecret) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        const response = await fetch(`${API_BASE_URL}/${String(this.version)}/account/oauth/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`,
            },
        });
        const { access_token, refresh_token } = (await response.json());
        console.log('REQUEST', response);
        this.accessToken = access_token;
        this.refreshToken = refresh_token;
        console.log('ACCESS', this.accessToken, 'REFRESH', this.refreshToken);
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
        // private get credentials() { return btoa(`${this.clientId}:${this.clientSecret}`); };
        this.accessToken = "";
        this.refreshToken = "";
        this.v = Symbol('latest');
        this.version = apiVersion;
        /*this.authenticated = */ this.authCredentials(clientId, clientSecret);
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
    [Symbol('latest')]: 'v2',
    v2: 'v2',
};
//# sourceMappingURL=MicroPay.js.map