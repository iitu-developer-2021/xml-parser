const fs = require('fs');
const util = require('util');
const path = require('path');

const userDataSuccessLogFile = fs.createWriteStream(path.resolve(__dirname, '../assets/user.log'), {
    flags: 'a'
});

const userDocumentsSuccessLogFile = fs.createWriteStream(
    path.resolve(__dirname, '../assets/documents.log'),
    {
        flags: 'a'
    }
);

const userAddressesSuccessLogFile = fs.createWriteStream(
    path.resolve(__dirname, '../assets/addresses.log'),
    {
        flags: 'a'
    }
);

const userXmlSuccessLogFile = fs.createWriteStream(path.resolve(__dirname, '../assets/xml.log'), {
    flags: 'a'
});

const errorLogFile = fs.createWriteStream(path.resolve(__dirname, `../assets/error.log`), {
    flags: 'a'
});

function writeUserDataSuccess(d) {
    userDataSuccessLogFile.write(`${util.format(d)}\n`);
}

function writeUserDocumentsSuccess(d) {
    userDocumentsSuccessLogFile.write(`${util.format(d)}\n`);
}

function writeUserAddressesSuccess(d) {
    userAddressesSuccessLogFile.write(`${util.format(d)}\n`);
}

function writeDataError(d) {
    errorLogFile.write(`${util.format(d)}\n`);
}

function writeUserXmlSuccess(d) {
    userXmlSuccessLogFile.write(`${util.format(d)}\n`);
}

module.exports = {
    writeUserDataSuccess,
    writeUserDocumentsSuccess,
    writeUserAddressesSuccess,
    writeDataError,
    writeUserXmlSuccess
};
