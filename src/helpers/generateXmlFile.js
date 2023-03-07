const fs = require('fs');
const path = require('path');

function generateXmlFile(iin, xmlContent) {
    return fs.writeFileSync(path.resolve(__dirname, `../assets/xml/${iin}.xml`), xmlContent);
}

module.exports.generateXmlFile = generateXmlFile;
