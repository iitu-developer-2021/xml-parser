const dotenv = require('dotenv');

dotenv.config();

const prompt = require('prompt-sync')();
const { Op } = require('sequelize');
const xmlFormat = require('xml-formatter');
const { LoginModel } = require('./src/db/loginModel');
const { User } = require('./src/db/userModel');
const { sequelize } = require('./src/db/index');
const { getUserData } = require('./src/api/userData');
const { getConvertedXmlData } = require('./src/helpers/getConvertedXmlData');
const { initLogger } = require('./src/helpers/initLogger');
const { withAsync } = require('./src/helpers/withAsync');
const { sleep } = require('./src/helpers/sleep');
const { generateFailedXmlFile, generateSuccessXmlFile } = require('./src/helpers/generateXmlFile');

initLogger();

const startNumber = Number(prompt('Начало старта:'));
const endNumber = Number(prompt('Конец старта:'));
const period = Number(prompt('Периодичность:'));

async function handleResponse(response, iin, id) {
    if (response.status !== 'fulfilled') {
        return console.error(`${iin} (id:${id}) - ответ от сервера ПРОВАЛЕНО`);
    }

    const parsedXml = getConvertedXmlData(response.value);

    if (!parsedXml.success) {
        generateFailedXmlFile(iin, xmlFormat(response.value));
        return console.error(
            `${iin} (id:${id}) (статус код: ${parsedXml.statusCode})- сервер ответил с ОШИБКОЙ`
        );
    }

    if (parsedXml.success) {
        generateSuccessXmlFile(iin, xmlFormat(response.value));
        const { person } = parsedXml;

        const { response: isUserAddSuccess, error: isUserAddFailed } = await withAsync(
            User.create.bind(User),
            {
                iin: person.iin,
                surname: person.surname,
                name: person.name,
                patronymic: person.patronymic,
                engFirstName: person.engFirstName,
                Surname: person.Surname,
                birthDate: person.birthDate,
                deathDate: person.deathDate,

                genderCode: person.gender.code,
                genderNameRu: person.gender.nameRu,
                genderNameKz: person.gender.nameKz,
                genderChangeDate: person.gender.changeDate,

                nationalityCode: person.nationality.code,
                nationalityNameRu: person.nationality.nameRu,
                nationalityNameKz: person.nationality.nameKz,
                nationalityChangeDate: person.nationality.changeDate,

                citizenshipCode: person.citizenship.code,
                citizenshipNameRu: person.citizenship.nameRu,
                citizenshipNameKz: person.citizenship.nameKz,
                citizenshipChangeDate: person.citizenship.changeDate,

                lifeStatusCode: person.lifeStatus.code,
                lifeStatusNameRu: person.lifeStatus.nameRu,
                lifeStatusNameKz: person.lifeStatus.nameKz,
                lifeStatusChangeDate: person.lifeStatus.changeDate,

                birthCertificateNumber: person.birthCertificate.number,
                birthCertificateBeginDate: person.birthCertificate.beginDate,
                birthCertificateIssueOrganisation: person.birthCertificate.issueOrganisation,

                deathCertificateNumber: person.deathCertificate.number,
                deathCertificateBeginDate: person.deathCertificate.beginDate,
                deathCertificateIssueOrganisation: person.deathCertificate.issueOrganisation,

                birthPlaceCountryCode: person.birthPlace.country.code,
                birthPlaceCountryNameRu: person.birthPlace.country.nameRu,
                birthPlaceCountryNameKz: person.birthPlace.country.nameKz,
                birthPlaceCountryChangeDate: person.birthPlace.country.changeDate,

                birthPlaceDistrictCode: person.birthPlace.district.code,
                birthPlaceDistrictNameRu: person.birthPlace.district.nameRu,
                birthPlaceDistrictNameKz: person.birthPlace.district.nameKz,
                birthPlaceDistrictChangeDate: person.birthPlace.district.changeDate,

                birthPlaceRegionCode: person.birthPlace.region.code,
                birthPlaceRegionNameRu: person.birthPlace.region.nameRu,
                birthPlaceRegionNameKz: person.birthPlace.region.nameKz,
                birthPlaceRegionChangeDate: person.birthPlace.region.changeDate,

                birthPlaceForeignDataDistrictName: person.birthPlace.foreignData.districtName,
                birthPlaceForeignDataRegionName: person.birthPlace.foreignData.regionName,
                birthPlaceCity: person.birthPlace.city,
                birthPlaceBirthTeCodeAR: person.birthPlace.birthTeCodeAR,

                regAddressCountryCode: person.regAddress.country.code,
                regAddressCountryNameRu: person.regAddress.country.nameRu,
                regAddressCountryNameKz: person.regAddress.country.nameKz,
                regAddressCountryChangeDate: person.regAddress.country.changeDate,

                regAddressDistrictCode: person.regAddress.district.code,
                regAddressDistrictNameRu: person.regAddress.district.nameRu,
                regAddressDistrictNameKz: person.regAddress.district.nameKz,
                regAddressDistrictChangeDate: person.regAddress.district.changeDate,

                regAddressRegionCode: person.regAddress.region.code,
                regAddressRegionNameRu: person.regAddress.region.nameRu,
                regAddressRegionNameKz: person.regAddress.region.nameKz,
                regAddressRegionChangeDate: person.regAddress.region.changeDate,

                regAddressForeignDataDistrictName: person.regAddress.foreignData.districtName,
                regAddressForeignDataRegionName: person.regAddress.foreignData.regionName,

                regAddressCity: person.regAddress.city,
                regAddressStreet: person.regAddress.street,
                regAddressBuilding: person.regAddress.building,
                regAddressCorpus: person.regAddress.corpus,
                regAddressFlat: person.regAddress.flat,
                regAddressBeginDate: person.regAddress.beginDate,
                regAddressEndDate: person.regAddress.endDate,
                regAddressStatus: person.regAddress.status,
                regAddressInvalidity: person.regAddress.invalidity,
                regAddressArCode: person.regAddress.arCode,

                personCapableStatusCapableStatus: person.personCapableStatus.capableStatus,
                personCapableStatusCapableDate: person.personCapableStatus.capableDate,
                personCapableStatusCapableEndDate: person.personCapableStatus.capableEndDate,
                personCapableStatusCapableNumber: person.personCapableStatus.capableNumber,
                personCapableStatusCourt: person.personCapableStatus.court,

                missingStatusMissing: person.missingStatus.missing,
                missingStatusMissingDate: person.missingStatus.missingDate,
                missingStatusMissingEndDate: person.missingStatus.missingEndDate,
                missingStatusMissingNumber: person.missingStatus.missingNumber,
                missingStatusGpTerritorial: person.missingStatus.gpTerritorial,

                disappearStatusDisappear: person.disappearStatus.disappear,
                disappearStatusDisappearDate: person.disappearStatus.disappearDate,
                disappearStatusDisappearEndDate: person.disappearStatus.disappearEndDate,
                disappearStatusDisappearNumber: person.disappearStatus.disappearNumber,
                disappearStatusGpTerritorial: person.disappearStatus.gpTerritorial,

                excludeStatusExcludeReason: person.excludeStatus.excludeReason,
                excludeStatusExcludeReasonDate: person.excludeStatus.excludeReasonDate,
                excludeStatusExcludeDate: person.excludeStatus.excludeReasonDate,
                excludeStatusExcludeParticipant: person.excludeStatus.excludeParticipant,

                repatriationStatusRepatriationStatus: person.repatriationStatus.repatriationStatus,
                repatriationStatusRepatriationDate: person.repatriationStatus.repatriationDate,
                repatriationStatusRepatriationEndDate:
                    person.repatriationStatus.repatriationEndDate,
                repatriationStatusRepatriationNumber: person.repatriationStatus.repatriationNumber,
                repatriationStatusRepatriationOrg: person.repatriationStatus.repatriationOrg,
                repatriationStatusRepatriationReason: person.repatriationStatus.repatriationReason,

                removed: person.removed
            }
        );

        if (isUserAddFailed) {
            console.error(
                `${iin} (id:${id}) (статус код: ${parsedXml.statusCode}) - не удалось записать в БД`
            );
        }

        if (isUserAddSuccess) {
            console.log(
                `${iin} (id:${id}) (статус код: ${parsedXml.statusCode}) - успешно записан в БД`
            );
        }
    }
}

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

        const loginRequests = loginTableData.map((loginData) => getUserData(loginData.iin));
        const responses = await Promise.allSettled(loginRequests);

        responses.forEach((response, index) =>
            handleResponse(response, loginTableData[index].iin, loginTableData[index].id)
        );

        await sleep(200);
        startParser(startNode + period);
    } catch (e) {
        console.error(e.message);
    }
}

sequelize.sync().then(() => {
    return startParser(startNumber);
});
