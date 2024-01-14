declare const interfaceCall: unique symbol;
export type MicroInterfaceFunction = (...args: any) => Promise<void> | null;
export type MicroInterfaceObject = {
    [interfaceCall]: MicroInterfaceFunction;
};
export declare class Micro {
    static VERSIONS: {
        [x: symbol]: string;
        main: string;
    };
    constructor();
}
export {};
