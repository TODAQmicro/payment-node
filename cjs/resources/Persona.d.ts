type ApiRequest = {
    accessToken: string;
};
type DelegetePersonaByHostname = {
    email: string;
    hash: string;
    hostname: string;
    name: string;
};
declare const _default: {
    delegatePersona: ({ email, hash, hostname, name }: ApiRequest & DelegetePersonaByHostname) => Promise<boolean>;
};
export default _default;
