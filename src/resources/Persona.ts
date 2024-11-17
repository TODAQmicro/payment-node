import { API_BASE_URL } from "./consts.js";

type ApiRequest = {
  accessToken: string,
}

type DelegetePersonaByHostname = {
  email: string,
  hash: string,
  hostname: string,
  name: string,
}

export default {
  delegatePersona: async function ({ email, hash, hostname, name }: ApiRequest & DelegetePersonaByHostname) {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      // @ts-ignore
      Authorization: `Bearer ${this.authCredentials && await this.authCredentials()}`,
    };
    const body = JSON.stringify({
      hostname,
      name,
      email,
    });
    console.log('DELEGATE PERSONA', headers, body);
    const request = fetch(`${API_BASE_URL}/v3/persona/${hash}/delegate`, {
      method: 'POST',
      headers,
      body,
    });

    let response: Response | null = null;

    try {
      response = await request;
    } catch (err) {
      return Promise.reject({
        error: 'InternalServerError',
        message: err,
        status: response?.status,
      });
    }

    if (response?.ok) {
      return Promise.resolve(true);
    } else {
      return Promise.resolve(false);
    }
  },
};
