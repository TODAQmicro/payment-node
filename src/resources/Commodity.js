const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8500';
export default {
    createCommodity: async function (accessToken, twinId, { cost, descriptor, dq }) {
        const request = fetch(`${API_BASE_URL}/v2/commodity`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Beareri ${Buffer.from(accessToken).toString('base64')}`,
            },
            body: JSON.stringify({
                cost,
                descriptor,
                dq,
                twin_id: twinId,
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
//# sourceMappingURL=Commodity.js.map