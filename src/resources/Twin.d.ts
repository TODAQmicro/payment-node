export type Twin = {
    id: number;
    hostname: string;
    key?: string;
};
declare const _default: {
    getTwins(accessToken: string): Promise<Array<Twin>>;
    getTwin(accessToken: string, twinId: number): Promise<Twin | null>;
};
export default _default;
