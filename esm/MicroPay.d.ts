import { MicroOptions } from './types.js';
declare const interfaceCall: unique symbol;
export type MicroInterfaceFunction = (...args: any) => Promise<void> | null;
export type MicroInterfaceObject = {
    [interfaceCall]: MicroInterfaceFunction;
};
export declare class Micro {
    static VERSIONS: {
        [type: symbol | string]: string;
    };
    private clientId?;
    private clientSecret?;
    accessToken: string;
    private refreshToken;
    authCredentials(clientId: string, clientSecret: string): Promise<void>;
    private v;
    private get version();
    private set version(value);
    constructor(clientId: string, clientSecret: string, { apiVersion, }: MicroOptions);
}
export {};
