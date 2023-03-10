const dotenv = require('dotenv');

dotenv.config();

const fs = require('fs');
const path = require('path');
const prompt = require('prompt-sync')();
const { User } = require('./src/db/userModel');
const { Address } = require('./src/db/addressModel');
const { Document } = require('./src/db/documentModel');
const { sequelize } = require('./src/db/index');
const { getConvertedXmlData } = require('./src/helpers/getConvertedXmlData');
const {
    writeDataError,
    writeUserDataSuccess,
    writeUserAddressesSuccess,
    writeUserDocumentsSuccess
} = require('./src/helpers/loggers');
const { withAsync } = require('./src/helpers/withAsync');
const { generateFailedXmlFile, generateSuccessXmlFile } = require('./src/helpers/generateXmlFile');
const { sleep } = require('./src/helpers/sleep');

const files = fs.readdirSync('./src/assets/xml/success');

console.log(files);

const startNumber = Number(prompt('Начало старта:'));
const endNumber = files.length;
const period = Number(prompt('Периодичность:'));

async function handleResponse(response, fileName) {
    const parsedXml = getConvertedXmlData(response.value);

    if (!parsedXml.success) {
        return writeDataError(
            `${fileName} (статус код: ${parsedXml.statusCode}) - сервер ответил с ОШИБКОЙ`
        );
    }

    if (parsedXml.success) {
        const { person } = parsedXml;

        const payload = {
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

            regAddressStatusCode: person.regAddress.status.code,
            regAddressStatusNameRu: person.regAddress.status.nameRu,
            regAddressStatusNameKz: person.regAddress.status.nameKz,
            regAddressStatusChangeDate: person.regAddress.status.changeDate,

            regAddressInvalidityCode: person.regAddress.invalidity.code,
            regAddressInvalidityNameRu: person.regAddress.invalidity.nameRu,
            regAddressInvalidityNameKz: person.regAddress.invalidity.nameKz,
            regAddressInvalidityChangeDate: person.regAddress.invalidity.nameKz,

            regAddressArCode: person.regAddress.arCode,

            personCapableStatusCapableStatusCode: person.personCapableStatus.capableStatus.code,
            personCapableStatusCapableStatusNameRu: person.personCapableStatus.capableStatus.nameRu,
            personCapableStatusCapableStatusNameKz: person.personCapableStatus.capableStatus.nameKz,
            personCapableStatusCapableStatusChangeDate:
                person.personCapableStatus.capableStatus.changeDate,

            personCapableStatusCapableDate: person.personCapableStatus.capableDate,
            personCapableStatusCapableEndDate: person.personCapableStatus.capableEndDate,
            personCapableStatusCapableNumber: person.personCapableStatus.capableNumber,

            personCapableStatusCourtCode: person.personCapableStatus.court.code,
            personCapableStatusCourtNameRu: person.personCapableStatus.court.nameRu,
            personCapableStatusCourtNameKz: person.personCapableStatus.court.nameKz,
            personCapableStatusCourtChangeDate: person.personCapableStatus.court.changeDate,

            missingStatusMissing: person.missingStatus.missing,
            missingStatusMissingDate: person.missingStatus.missingDate,
            missingStatusMissingEndDate: person.missingStatus.missingEndDate,
            missingStatusMissingNumber: person.missingStatus.missingNumber,

            missingStatusGpTerritorialCode: person.missingStatus.gpTerritorial.code,
            missingStatusGpTerritorialNameRu: person.missingStatus.gpTerritorial.nameRu,
            missingStatusGpTerritorialNameKz: person.missingStatus.gpTerritorial.nameKz,
            missingStatusGpTerritorialChangeDate: person.missingStatus.gpTerritorial.changeDate,

            disappearStatusDisappear: person.disappearStatus.disappear,
            disappearStatusDisappearDate: person.disappearStatus.disappearDate,
            disappearStatusDisappearEndDate: person.disappearStatus.disappearEndDate,
            disappearStatusDisappearNumber: person.disappearStatus.disappearNumber,

            disappearStatusGpTerritorialCode: person.disappearStatus.gpTerritorial.code,
            disappearStatusGpTerritorialNameRu: person.disappearStatus.gpTerritorial.nameRu,
            disappearStatusGpTerritorialNameKz: person.disappearStatus.gpTerritorial.nameKz,
            disappearStatusGpTerritorialChangeDate: person.disappearStatus.gpTerritorial.changeDate,

            excludeStatusExcludeReasonCode: person.excludeStatus.excludeReason.code,
            excludeStatusExcludeReasonNameRu: person.excludeStatus.excludeReason.nameRu,
            excludeStatusExcludeReasonNameKz: person.excludeStatus.excludeReason.nameKz,
            excludeStatusExcludeReasonChangeDate: person.excludeStatus.excludeReason.changeDate,

            excludeStatusExcludeReasonDateCode: person.excludeStatus.excludeReasonDate.code,
            excludeStatusExcludeReasonDateNameRu: person.excludeStatus.excludeReasonDate.nameRu,
            excludeStatusExcludeReasonDateNameKz: person.excludeStatus.excludeReasonDate.nameKz,
            excludeStatusExcludeReasonDateChangeDate:
                person.excludeStatus.excludeReasonDate.changeDate,

            excludeStatusExcludeDate: person.excludeStatus.excludeDate,

            excludeStatusExcludeParticipantCode: person.excludeStatus.excludeParticipant.code,
            excludeStatusExcludeParticipantNameRu: person.excludeStatus.excludeParticipant.nameRu,
            excludeStatusExcludeParticipantNameKz: person.excludeStatus.excludeParticipant.nameKz,
            excludeStatusExcludeParticipantChangeDate:
                person.excludeStatus.excludeParticipant.changeDate,

            repatriationStatusRepatriationStatus: person.repatriationStatus.repatriationStatus,
            repatriationStatusRepatriationDate: person.repatriationStatus.repatriationDate,
            repatriationStatusRepatriationEndDate: person.repatriationStatus.repatriationEndDate,
            repatriationStatusRepatriationNumber: person.repatriationStatus.repatriationNumber,
            repatriationStatusRepatriationOrg: person.repatriationStatus.repatriationOrg,
            repatriationStatusRepatriationReason: person.repatriationStatus.repatriationReason,

            removed: person.removed
        };

        const { response: isUserAddSuccess, error: isUserAddFailed } = await withAsync(
            User.create.bind(User),
            payload
        );

        if (isUserAddFailed) {
            writeDataError(
                `${fileName} (статус код: ${parsedXml.statusCode}) - не удалось записать в БД, текст ошибки: ${isUserAddFailed.message}`
            );
        }

        if (isUserAddSuccess) {
            writeUserDataSuccess(
                `${fileName} (статус код: ${parsedXml.statusCode}) - успешно записан в БД`
            );
        }

        return Promise.all([
            ...person.documents.map((doc) => {
                return Document.create({
                    iin: person.iin,
                    typeCode: doc.type.code,
                    typeNameRu: doc.type.nameRu,
                    typeNameKz: doc.type.nameKz,
                    typeChangeDate: doc.type.changeDate,

                    number: doc.number,
                    series: doc.series,
                    beginDate: doc.beginDate,
                    endDate: doc.endDate,

                    issueOrganizationCode: doc.issueOrganization.code,
                    issueOrganizationNameRu: doc.issueOrganization.nameRu,
                    issueOrganizationNameKz: doc.issueOrganization.nameKz,
                    issueOrganizationChangeDate: doc.issueOrganization.changeDate,

                    statusCode: doc.status.code,
                    statusNameRu: doc.status.nameRu,
                    statusNameKz: doc.status.nameKz,
                    statusChangeDate: doc.status.changeDate,

                    invalidityDate: doc.invalidityDate,
                    surname: doc.surname,
                    name: doc.name,
                    patronymic: doc.patronymic,
                    birthDate: doc.birthDate
                });
            }),
            ...person.addresses.map((add) => {
                return Address.create({
                    iin: person.iin,
                    typeCode: add.type.code,
                    typeNameRu: add.type.nameRu,
                    typeNameKz: add.type.nameKz,
                    typeChangeDate: add.type.changeDate,
                    countryCode: add.country.code,
                    countryNameRu: add.country.nameRu,
                    countryNameKz: add.country.nameKz,
                    countryChangeDate: add.country.changeDate,

                    districtCode: add.district.code,
                    districtNameRu: add.district.nameRu,
                    districtNameKz: add.district.nameKz,
                    districtChangeDate: add.district.changeDate,

                    regionCode: add.region.code,
                    regionNameRu: add.region.nameRu,
                    regionNameKz: add.region.nameKz,
                    regionChangeDate: add.region.changeDate,

                    city: add.city,
                    street: add.street,
                    building: add.building,
                    corpus: add.corpus,
                    flat: add.flat,
                    beginDate: add.beginDate,
                    endDate: add.endDate,
                    arCode: add.arCode
                });
            })
        ])
            .then(() => {
                writeUserAddressesSuccess(`${fileName} - список АДРЕССОВ успешно записаны в БД`);
                writeUserDocumentsSuccess(`${fileName} - ДОКУМЕНТЫ успешно записаны в БД`);
            })
            .catch((e) => {
                writeDataError(
                    `${fileName} - не удалось записать ДОКУМЕНТ в БД, текст ошибки: ${e.message}`
                );
                writeDataError(
                    `${fileName} - не удалось записать АДРЕСС в БД, текст ошибки: ${e.message}`
                );
            });
    }
}

async function startParser(startNode) {
    try {
        if (startNode > endNumber) return;

        let endNode = startNode - 1 + period;

        if (endNode > endNumber) {
            endNode = endNumber;
        }

        // eslint-disable-next-line no-plusplus
        for (let i = startNode; i <= endNode; i++) {
            const fileName = files[i];
            const filePath = path.resolve(__dirname, `./src/assets/xml/success/${fileName}`);
            console.log(filePath);

            // eslint-disable-next-line no-loop-func
            fs.access(filePath, fs.F_OK, (err) => {
                if (err) {
                    return writeDataError(`Нет такого файла${filePath}`);
                }

                fs.readFile(
                    filePath,
                    { encoding: 'utf8', flag: 'r' },
                    async (readFileErr, data) => {
                        if (readFileErr) {
                            return writeDataError(`Ошибка при чтении файла${err}`);
                        }
                        console.log(`${fileName} - READ FROM FILE`);
                        await handleResponse({ value: data }, fileName);
                        console.log(`${fileName} - WRITE TO DB COMPLETED`);
                    }
                );
            });
        }

        await sleep(100);
        startParser(startNode + period);
    } catch (e) {
        writeDataError(e.message);
    }
}

sequelize.sync().then(() => {
    return startParser(startNumber);
});
