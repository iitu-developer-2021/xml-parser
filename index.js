const dotenv = require('dotenv');

dotenv.config();

const prompt = require('prompt-sync')();
const { getConvertedXmlData } = require('./src/helpers/getConvertedXmlData');
const { getUserData } = require('./src/api/userData');

const startNumber = Number(prompt('Начало старта:'));
const endNumber = Number(prompt('Конец старта:'));

for (let iin = startNumber; iin <= endNumber; iin++) {
    getUserData(iin).then((response) => {
        const person = getConvertedXmlData(response);
        console.dir(person, { depth: null });
    });
}

const iinList = ['990204350231', '990204350233', '990204350234', '990243350234', '990243350234'];

Promise.allSettled(iinList.map((iin) => getUserData(iin))).then((responses) => {
    console.dir(responses, { depth: null });
});
