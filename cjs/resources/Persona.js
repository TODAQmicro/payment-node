"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consts_js_1 = require("./consts.js");
exports.default = {
    delegatePersona: async function ({ email, hash, hostname, name }) {
        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            // @ts-ignore
            Authorization: `Bearer ${this.authCredentials && await this.authCredentials()}`,
        };
        const body = JSON.stringify({
            hostname,
            name,
            email,
        });
        console.log('DELEGATE PERSONA', headers, body);
        const request = fetch(`${consts_js_1.API_BASE_URL}/v3/persona/${hash}/delegate`, {
            method: 'POST',
            headers,
            body,
        });
        let response = null;
        try {
            response = await request;
        }
        catch (err) {
            return Promise.reject({
                error: 'InternalServerError',
                message: err,
                status: response?.status,
            });
        }
        if (response?.ok) {
            return Promise.resolve(true);
        }
        else {
            return Promise.resolve(false);
        }
    },
};
//# sourceMappingURL=Persona.js.map