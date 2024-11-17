export type ValidationNonce = {
    nonce: string;
};
declare const _default: {
    validPayment: (_: string, hash: string, nonce: string, timestamp: number) => Promise<boolean>;
};
export default _default;
