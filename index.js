const dotenv = require('dotenv');

dotenv.config();

const prompt = require('prompt-sync')();
const { Op } = require('sequelize');
const { LoginModel } = require('./src/db/loginModel');
const { sequelize } = require('./src/db/index');
const { getUserData } = require('./src/api/userData');
const { getConvertedXmlData } = require('./src/helpers/getConvertedXmlData');
const { initLogger } = require('./src/helpers/initLogger');
const { sleep } = require('./src/helpers/sleep');
const { generateXmlFile } = require('./src/helpers/generateXmlFile');

initLogger();

const startNumber = Number(prompt('Начало старта:'));
const endNumber = Number(prompt('Конец старта:'));
const period = Number(prompt('Периодичность:'));

async function startParser(startNode) {
    try {
        if (startNode > endNumber) return;

        let endNode = startNode - 1 + period;

        if (endNode > endNumber) {
            endNode = endNumber;
        }

        const loginTableData = await LoginModel.findAll({
            where: {
                id: {
                    [Op.between]: [startNode, endNode]
                }
            }
        });

        const responses = await Promise.allSettled(
            loginTableData.map((loginData) => {
                return getUserData(loginData.iin);
            })
        );

        responses.forEach((response, index) => {
            generateXmlFile(loginTableData[index].iin, response.value);
        });

        await sleep(200);
        startParser(startNode + period);
    } catch (e) {
        console.error(e.message);
    }
}

sequelize.sync().then(() => {
    return startParser(startNumber);
});
