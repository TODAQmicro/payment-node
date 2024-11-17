"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consts_js_1 = require("./consts.js");
exports.default = {
    validPayment: async function (_, hash, nonce, timestamp) {
        console.log('VALID PAYMENT', consts_js_1.API_BASE_URL);
        const request = fetch(`${consts_js_1.API_BASE_URL}/v2/payment/${hash}/validate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                // @ts-ignore
                Authorization: `Bearer ${this.authCredentials && await this.authCredentials()}`,
            },
            body: JSON.stringify({
                nonce,
                timestamp,
            }),
        });
        let response = null;
        try {
            response = await request;
            console.log('RESPONSE', response);
        }
        catch (err) {
            return Promise.reject({
                error: 'InternalServerError',
                message: err,
                status: undefined,
            });
        }
        if (response.ok) {
            return Promise.resolve(true);
        }
        else {
            return Promise.resolve(false);
        }
    },
};
//# sourceMappingURL=Payment.js.map