export type Commodity = {
    cost: number;
    descriptor: string;
    dq: string;
    hash: string;
    hostname: string;
    embed?: string;
};
declare const _default: {
    createCommodity: (accessToken: string, twinId: number, { cost, descriptor, dq }: Pick<Commodity, 'cost' | 'descriptor' | 'dq'>) => Promise<Commodity>;
};
export default _default;
