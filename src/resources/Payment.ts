import { API_BASE_URL } from "./consts";

export type ValidationNonce = {
  nonce: string;
};

export default {
  validPayment: async function (
    accessToken: string,
    hash: string,
    nonce: string,
    timestamp: number,
  ): Promise<boolean> {
    const request = fetch(`${API_BASE_URL}/v2/payment/${hash}/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        nonce,
        timestamp,
      }),
    });

    let response: Response | null = null;

    try {
      response = await request;
    } catch (err) {
      return Promise.reject({
        error: 'InternalServerError',
        message: err,
        status: undefined,
      });
    }

    if (response.ok) {
      return Promise.resolve(true);
    } else {
      return Promise.resolve(false);
    }
  },
};
