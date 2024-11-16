import { API_BASE_URL } from "./consts.js";

export type Commodity = {
  cost: number;
  descriptor: string;
  dq: string;
  hash: string;
  hostname: string;
  embed?: string;
};

export default {
  createCommodity: async function (
    accessToken: string,
    twinId: number,
    { cost, descriptor, dq }: Pick<Commodity, 'cost' | 'descriptor' | 'dq'>,
  ): Promise<Commodity> {
    const request = fetch(`${API_BASE_URL}/v2/commodity`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        cost,
        descriptor,
        dq,
        twin_id: twinId,
      }),
    });

    let response: Response | null = null;
    let data: Commodity | null = null;

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
      data = (await response.json()) as Commodity;
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
