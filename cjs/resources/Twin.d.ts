export interface Twin {
    id: number;
    hostname: string;
    key?: string;
}
declare const _default: {
    createTwin(accessToken: string, dq: string): Promise<Twin | null>;
    getTwins(accessToken: string): Promise<Array<Twin>>;
    getTwin(accessToken: string, twinId: number): Promise<Twin | null>;
};
export default _default;
