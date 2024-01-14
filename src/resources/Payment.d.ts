export type ValidationNonce = {
    nonce: string;
};
declare const _default: {
    validatePayment: (accessToken: string, nonce: string, timestamp: number) => Promise<boolean>;
};
export default _default;
