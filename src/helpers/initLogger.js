const fs = require('fs');
const util = require('util');
const path = require('path');

module.exports.initLogger = () => {
    const logFile = fs.createWriteStream(path.resolve(__dirname, '../assets/debug.log'), {
        flags: 'a'
    });
    const logStdout = process.stdout;

    console.log = (d) => {
        logFile.write(`${util.format(d)}\n`);
        logStdout.write(`${util.format(d)}\n`);
    };

    const errorLogFile = fs.createWriteStream(path.resolve(__dirname, `../assets/error.log`), {
        flags: 'a'
    });

    console.error = (d) => {
        errorLogFile.write(`${util.format(d)}\n`);
        logStdout.write(`${util.format(d)}\n`);
    };
};
