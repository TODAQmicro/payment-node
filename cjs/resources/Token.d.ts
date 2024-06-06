export type Token = {
    token: string;
    expires_at: number;
    refresh_token: string;
    refresh_expires_at: number;
};
declare const _default: {
    getAccessToken(clientId: string, clientSecret: string): Promise<Token>;
};
export default _default;
