"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consts_1 = require("./consts");
exports.default = {
    validPayment: async function (accessToken, hash, nonce, timestamp) {
        const request = fetch(`${consts_1.API_BASE_URL}/v2/payment/${hash}/validate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                nonce,
                timestamp,
            }),
        });
        let response = null;
        try {
            response = await request;
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