import { API_BASE_URL } from "./consts.js";

export interface Twin {
  id: number,
  hostname: string,
  key?: string,
};

export default {
  async createTwin(accessToken: string, dq: string): Promise<Twin | null> {
    const request = fetch(`${API_BASE_URL}/v2/twin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        dq,
      }),
    });

    let response: Response | null = null;
    let data: Twin | null = null;

    try {
      response = await request;
    } catch (err) {
      return Promise.reject({
        error: 'InternalServerError',
        message: err,
        status: undefined,
      });
    }

    try {
      const twin = (await response.json()) as Twin;

      data = twin;
    } catch (err) {
      return Promise.reject({
        error: 'Bad Response',
        message: err,
        status: response.status,
      });
    }

    return Promise.resolve(data);
  },

  async getTwins(accessToken: string): Promise<Array<Twin>> {
    const request = fetch(`${API_BASE_URL}/v2/twins`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    let response: Response | null = null;
    let data: Array<Twin> = [];

    try {
      response = await request;
    } catch (err) {
      return Promise.reject({
        error: 'InternalServerError',
        message: err,
        status: undefined,
      });
    }

    try {
      const { twins } = (await response.json()) as { twins: Array<Twin> };

      data = twins;
    } catch (err) {
      return Promise.reject({
        error: 'Bad Response',
        message: err,
        status: response.status,
      });
    }

    return Promise.resolve(data);
  },

  async getTwin(accessToken: string, twinId: number): Promise<Twin | null> {
    const request = fetch(`${API_BASE_URL}/v2/twin/${twinId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    let response: Response | null = null;
    let data: Twin | null = null;

    try {
      response = await request;
    } catch (err) {
      return Promise.reject({
        error: 'InternalServerError',
        message: err,
        status: undefined,
      });
    }

    try {
      data = (await response.json()) as Twin;
    } catch (err) {
      return Promise.reject({
        error: 'Bad Response',
        message: err,
        status: response.status,
      });
    }

    return Promise.resolve(data);
  },
};
