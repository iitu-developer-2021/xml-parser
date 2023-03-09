const fs = require('fs');
const path = require('path');
const { writeDataError, writeUserXmlSuccess } = require('./loggers');

function generateSuccessXmlFile(iin, xmlContent) {
    fs.writeFile(path.resolve(__dirname, `../assets/xml/success/${iin}.xml`), xmlContent, (err) => {
        if (err) {
            writeDataError(`${iin}  - не удалось записать response в xml file`);
        } else {
            writeUserXmlSuccess(`${iin} - успешно записан в xml файл`);
        }
    });
}

function generateFailedXmlFile(iin, xmlContent) {
    fs.writeFile(path.resolve(__dirname, `../assets/xml/failed/${iin}.xml`), xmlContent, (err) => {
        if (err) {
            writeDataError(`${iin}- не удалось записать response в xml file`);
        } else {
            writeUserXmlSuccess(`${iin} - успешно записан в xml файл`);
        }
    });
}

module.exports.generateSuccessXmlFile = generateSuccessXmlFile;
module.exports.generateFailedXmlFile = generateFailedXmlFile;
