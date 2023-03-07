const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const User = sequelize.define('User', {
    iin: DataTypes.STRING,
    surname: DataTypes.STRING,
    name: DataTypes.STRING,
    patronymic: DataTypes.STRING,
    engFirstName: DataTypes.STRING,
    engSurname: DataTypes.STRING,
    birthDate: DataTypes.STRING,

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
    citizenshipChangeDate: DataTypes.STRING,

    lifeStatusCode: DataTypes.STRING,
    lifeStatusNameRu: DataTypes.STRING,
    lifeStatusNameKz: DataTypes.STRING,
    lifeStatusChangeDate: DataTypes.STRING,

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

    birthPlaceCityCode: DataTypes.STRING,
    birthPlaceCityNameRu: DataTypes.STRING,
    birthPlaceCityNameKz: DataTypes.STRING,
    birthPlaceCityChangeDate: DataTypes.STRING,

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

    regAddressStreet: DataTypes.STRING,
    regAddressBuilding: DataTypes.STRING,
    regAddressFlat: DataTypes.STRING,
    regAddressBeginDate: DataTypes.STRING,

    regAddressStatusCode: DataTypes.STRING,
    regAddressStatusNameRu: DataTypes.STRING,
    regAddressStatusNameKz: DataTypes.STRING,
    regAddressStatusChangeDate: DataTypes.STRING,

    regAddressInvalidityCode: DataTypes.STRING,
    regAddressInvalidityNameRu: DataTypes.STRING,
    regAddressInvalidityNameKz: DataTypes.STRING,
    regAddressInvalidityChangeDate: DataTypes.STRING,

    regAddressArCode: DataTypes.STRING
});

module.exports.User = User;
