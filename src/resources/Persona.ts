import { API_BASE_URL } from "./consts.js";

type ApiRequest = {
  accessToken: string,
}

type DelegetePersonaByHostname = {
  hash: string,
  hostname: string,
}

export default {
  delegatePersona: async function ({ accessToken, hash, hostname }: ApiRequest & DelegetePersonaByHostname) {
    const request = fetch(`${API_BASE_URL}/v3/persona/${hash}/delegate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        hostname,
      }),
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
      return Promise.resolve(await response.json());
    } else {
      return Promise.resolve(false);
    }
  },
};
