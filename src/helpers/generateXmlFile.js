const fs = require('fs');
const path = require('path');

function generateSuccessXmlFile(iin, xmlContent, id) {
    fs.writeFile(
        path.resolve(__dirname, `../assets/xml/success/${iin}_${id}.xml`),
        xmlContent,
        (err) => {
            if (err) {
                console.error(`${iin}  - не удалось записать response в xml file`);
            } else {
                console.log(`${iin} - успешно записан в xml файл`);
            }
        }
    );
}

function generateFailedXmlFile(iin, xmlContent, id) {
    fs.writeFile(
        path.resolve(__dirname, `../assets/xml/failed/${iin}_${id}.xml`),
        xmlContent,
        (err) => {
            if (err) {
                console.error(`${iin}- не удалось записать response в xml file`);
            } else {
                console.log(`${iin} - успешно записан в xml файл`);
            }
        }
    );
}

module.exports.generateSuccessXmlFile = generateSuccessXmlFile;
module.exports.generateFailedXmlFile = generateFailedXmlFile;
