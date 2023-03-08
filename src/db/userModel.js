const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const User = sequelize.define('User', {
    iin: DataTypes.STRING,
    surname: DataTypes.STRING,
    name: DataTypes.STRING,
    patronymic: DataTypes.STRING,
    engFirstName: DataTypes.STRING,
    Surname: DataTypes.STRING,
    birthDate: DataTypes.STRING,
    deathDate: DataTypes.STRING,

    genderCode: DataTypes.STRING,
    genderNameRu: DataTypes.STRING,
    genderNameKz: DataTypes.STRING,
    genderChangeDate: DataTypes.STRING,

    nationalityCode: DataTypes.STRING,
    nationalityNameRu: DataTypes.STRING,
    nationalityNameKz: DataTypes.STRING,
    nationalityChangeDate: DataTypes.STRING,

    citizenshipCode: DataTypes.STRING,
    citizenshipNameRu: DataTypes.STRING,
    citizenshipNameKz: DataTypes.STRING,
    citizenshipChangeDate: DataTypes.STRING,

    lifeStatusCode: DataTypes.STRING,
    lifeStatusNameRu: DataTypes.STRING,
    lifeStatusNameKz: DataTypes.STRING,
    lifeStatusChangeDate: DataTypes.STRING,

    birthCertificateNumber: DataTypes.STRING,
    birthCertificateBeginDate: DataTypes.STRING,
    birthCertificateIssueOrganisation: DataTypes.STRING,

    deathCertificateNumber: DataTypes.STRING,
    deathCertificateBeginDate: DataTypes.STRING,
    deathCertificateIssueOrganisation: DataTypes.STRING,

    birthPlaceCountryCode: DataTypes.STRING,
    birthPlaceCountryNameRu: DataTypes.STRING,
    birthPlaceCountryNameKz: DataTypes.STRING,
    birthPlaceCountryChangeDate: DataTypes.STRING,

    birthPlaceDistrictCode: DataTypes.STRING,
    birthPlaceDistrictNameRu: DataTypes.STRING,
    birthPlaceDistrictNameKz: DataTypes.STRING,
    birthPlaceDistrictChangeDate: DataTypes.STRING,

    birthPlaceRegionCode: DataTypes.STRING,
    birthPlaceRegionNameRu: DataTypes.STRING,
    birthPlaceRegionNameKz: DataTypes.STRING,
    birthPlaceRegionChangeDate: DataTypes.STRING,

    birthPlaceForeignDataDistrictName: DataTypes.STRING,
    birthPlaceForeignDataRegionName: DataTypes.STRING,
    birthPlaceCity: DataTypes.STRING,
    birthPlaceBirthTeCodeAR: DataTypes.STRING,

    regAddressCountryCode: DataTypes.STRING,
    regAddressCountryNameRu: DataTypes.STRING,
    regAddressCountryNameKz: DataTypes.STRING,
    regAddressCountryChangeDate: DataTypes.STRING,

    regAddressDistrictCode: DataTypes.STRING,
    regAddressDistrictNameRu: DataTypes.STRING,
    regAddressDistrictNameKz: DataTypes.STRING,
    regAddressDistrictChangeDate: DataTypes.STRING,

    regAddressRegionCode: DataTypes.STRING,
    regAddressRegionNameRu: DataTypes.STRING,
    regAddressRegionNameKz: DataTypes.STRING,
    regAddressRegionChangeDate: DataTypes.STRING,

    regAddressForeignDataDistrictName: DataTypes.STRING,
    regAddressForeignDataRegionName: DataTypes.STRING,

    regAddressCity: DataTypes.STRING,
    regAddressStreet: DataTypes.STRING,
    regAddressBuilding: DataTypes.STRING,
    regAddressCorpus: DataTypes.STRING,
    regAddressFlat: DataTypes.STRING,
    regAddressBeginDate: DataTypes.STRING,
    regAddressEndDate: DataTypes.STRING,

    regAddressStatusCode: DataTypes.STRING,
    regAddressStatusNameRu: DataTypes.STRING,
    regAddressStatusNameKz: DataTypes.STRING,
    regAddressStatusChangeDate: DataTypes.STRING,

    regAddressInvalidityCode: DataTypes.STRING,
    regAddressInvalidityNameRu: DataTypes.STRING,
    regAddressInvalidityNameKz: DataTypes.STRING,
    regAddressInvalidityChangeDate: DataTypes.STRING,

    regAddressArCode: DataTypes.STRING,

    personCapableStatusCapableStatusCode: DataTypes.STRING,
    personCapableStatusCapableStatusNameRu: DataTypes.STRING,
    personCapableStatusCapableStatusNameKz: DataTypes.STRING,
    personCapableStatusCapableStatusChangeDate: DataTypes.STRING,

    personCapableStatusCapableDate: DataTypes.STRING,
    personCapableStatusCapableEndDate: DataTypes.STRING,
    personCapableStatusCapableNumber: DataTypes.STRING,

    personCapableStatusCourtCode: DataTypes.STRING,
    personCapableStatusCourtNameRu: DataTypes.STRING,
    personCapableStatusCourtNameKz: DataTypes.STRING,
    personCapableStatusCourtChangeDate: DataTypes.STRING,

    missingStatusMissing: DataTypes.STRING,
    missingStatusMissingDate: DataTypes.STRING,
    missingStatusMissingEndDate: DataTypes.STRING,
    missingStatusMissingNumber: DataTypes.STRING,

    missingStatusGpTerritorialCode: DataTypes.STRING,
    missingStatusGpTerritorialNameRu: DataTypes.STRING,
    missingStatusGpTerritorialNameKz: DataTypes.STRING,
    missingStatusGpTerritorialChangeDate: DataTypes.STRING,

    disappearStatusDisappear: DataTypes.STRING,
    disappearStatusDisappearDate: DataTypes.STRING,
    disappearStatusDisappearEndDate: DataTypes.STRING,
    disappearStatusDisappearNumber: DataTypes.STRING,

    disappearStatusGpTerritorialCode: DataTypes.STRING,
    disappearStatusGpTerritorialNameRu: DataTypes.STRING,
    disappearStatusGpTerritorialNameKz: DataTypes.STRING,
    disappearStatusGpTerritorialChangeDate: DataTypes.STRING,

    excludeStatusExcludeReasonCode: DataTypes.STRING,
    excludeStatusExcludeReasonNameRu: DataTypes.STRING,
    excludeStatusExcludeReasonNameKz: DataTypes.STRING,
    excludeStatusExcludeReasonChangeDate: DataTypes.STRING,

    excludeStatusExcludeReasonDateCode: DataTypes.STRING,
    excludeStatusExcludeReasonDateNameRu: DataTypes.STRING,
    excludeStatusExcludeReasonDateNameKz: DataTypes.STRING,
    excludeStatusExcludeReasonDateChangeDate: DataTypes.STRING,

    excludeStatusExcludeDate: DataTypes.STRING,

    excludeStatusExcludeParticipantCode: DataTypes.STRING,
    excludeStatusExcludeParticipantNameRu: DataTypes.STRING,
    excludeStatusExcludeParticipantNameKz: DataTypes.STRING,
    excludeStatusExcludeParticipantChangeDate: DataTypes.STRING,

    repatriationStatusRepatriationStatus: DataTypes.STRING,
    repatriationStatusRepatriationDate: DataTypes.STRING,
    repatriationStatusRepatriationEndDate: DataTypes.STRING,
    repatriationStatusRepatriationNumber: DataTypes.STRING,
    repatriationStatusRepatriationOrg: DataTypes.STRING,
    repatriationStatusRepatriationReason: DataTypes.STRING,

    removed: DataTypes.STRING
});

module.exports.User = User;
