type ApiRequest = {
    accessToken: string;
};
type DelegetePersonaByHostname = {
    hash: string;
    hostname: string;
};
declare const _default: {
    delegatePersona: ({ accessToken, hash, hostname }: ApiRequest & DelegetePersonaByHostname) => Promise<unknown>;
};
export default _default;
