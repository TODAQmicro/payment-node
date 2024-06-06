"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consts_1 = require("./consts");
exports.default = {
    async getAccessToken(clientId, clientSecret) {
        const request = fetch(`${consts_1.API_BASE_URL}/v2/account/oauth/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
            },
        });
        let response = null;
        let data = null;
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
        try {
            data = (await response.json());
        }
        catch (err) {
            return Promise.reject({
                error: 'Bad Response',
                message: err,
                status: response.status,
            });
        }
        return Promise.resolve(data);
    },
};
//# sourceMappingURL=Token.js.map