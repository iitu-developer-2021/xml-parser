const path = require('path');
const fs = require('fs');
const axios = require('axios');
const https = require('https');

axios.interceptors.request.use((request) => {
    const authorizationHeader = `Basic ${Buffer.from(
        `${process.env.AUTH_USERNAME}:${process.env.AUTH_PASSWORD}`
    ).toString('base64')}`;

    if (!('Authorization' in request.headers)) {
        request.headers.Authorization = authorizationHeader;
    }

    return request;
});

const { BACKEND_URL, AUTH_USER_ID } = process.env;

const userUrls = {
    getUser: `${BACKEND_URL}`
};

const filePath = path.resolve(__dirname, '../assets/mock/request.xml');

const xmlRequestTemplate = fs
    .readFileSync(filePath, { encoding: 'utf8', flag: 'r' })
    .replace(/{USER_ID}/g, AUTH_USER_ID);

const getUserData = (iin) => {
    const xmlRequest = xmlRequestTemplate.replace('{IIN}', iin);
    return axios
        .post(userUrls.getUser, xmlRequest, {
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        })
        .then((response) => response.data);
};

module.exports.getUserData = getUserData;
