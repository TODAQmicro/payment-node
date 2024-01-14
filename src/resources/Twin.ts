export type Twin = {
  id: number;
  hostname: string;
  key?: string;
};

export default {
  getTwins(accessToken: string): Promise<Array<Twin>> {
    console.error('NotImplementedError:', 'getTwins is not implemented');

    return Promise.resolve([]);
  },

  getTwin(accessToken: string, twinId: number): Promise<Twin | null> {
    console.error('NotImplementedError:', 'getTwin is not implemented');

    return Promise.reject(null);
  },
};
