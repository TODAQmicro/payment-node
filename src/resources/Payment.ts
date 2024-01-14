export type ValidationNonce = {
  nonce: string;
};

export default {
  validatePayment: async function (
    accessToken: string,
    nonce: string,
    timestamp: number,
  ): Promise<boolean> {
    console.error('NotImplementedError', 'validatePayment is not implemented');

    return Promise.resolve(false);
  },
};
