const { XMLParser } = require('fast-xml-parser');

const parser = new XMLParser();

const getConvertedXmlData = (responseXmlData) => {
    const convertedResponseObject = parser.parse(responseXmlData);
    const responseData =
        convertedResponseObject['soap:Envelope']['soap:Body']['ns2:getPersonResponse'].return[
            'ns3:Person'
        ].responseData.data;
    return responseData.persons.person;
};

module.exports.getConvertedXmlData = getConvertedXmlData;
