"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consts_1 = require("./consts");
;
exports.default = {
    async createTwin(accessToken, dq) {
        const request = fetch(`${consts_1.API_BASE_URL}/v2/twin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                dq,
            }),
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
            const twin = (await response.json());
            data = twin;
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
    async getTwins(accessToken) {
        const request = fetch(`${consts_1.API_BASE_URL}/v2/twins`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });
        let response = null;
        let data = [];
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
            const { twins } = (await response.json());
            data = twins;
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
    async getTwin(accessToken, twinId) {
        const request = fetch(`${consts_1.API_BASE_URL}/v2/twin/${twinId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${accessToken}`,
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
//# sourceMappingURL=Twin.js.map