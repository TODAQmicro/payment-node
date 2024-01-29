export type Token = {
  token: string;
  expires_at: number;
  refresh_token: string;
  refresh_expires_at: number;
};

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8500';

export default {
  async getAccessToken(clientId: string, clientSecret: string): Promise<Token> {
    const request = fetch(`${API_BASE_URL}/v2/account/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Basic ${Buffer.from(
          `${clientId}:${clientSecret}`,
        ).toString('base64')}`,
      },
    });

    let response: Response | null = null;
    let data: Token | null = null;

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
      data = (await response.json()) as Token;
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
