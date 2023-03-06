const fs = require('fs');
const axios = require('axios');

const { BACKEND_URL, AUTH_USER_ID } = process.env;

const userUrls = {
    getUser: `${BACKEND_URL}/wsdl`
};

const xmlRequestTemplate = fs
    .readFileSync('../assets/mock/request.xml', { encoding: 'utf8', flag: 'r' })
    .replace(/{USER_ID}/g, AUTH_USER_ID);

const fetchUserData = (iin) => {
    const xmlRequest = xmlRequestTemplate.replace('{IIN}', iin);
    return axios.post(userUrls.getUser, xmlRequest).then((response) => response.data);
};

module.exports.getUserData = fetchUserData;
