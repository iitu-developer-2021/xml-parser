const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const AddressModel = sequelize.define(
    'Address',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        iin: DataTypes.STRING,
        typeCode: DataTypes.STRING,
        typeNameRu: DataTypes.STRING,
        typeNameKz: DataTypes.STRING,
        typeChangeDate: DataTypes.STRING,
        countryCode: DataTypes.STRING,
        countryNameRu: DataTypes.STRING,
        countryNameKz: DataTypes.STRING,
        countryChangeDate: DataTypes.STRING,

        districtCode: DataTypes.STRING,
        districtNameRu: DataTypes.STRING,
        districtNameKz: DataTypes.STRING,
        districtChangeDate: DataTypes.STRING,

        regionCode: DataTypes.STRING,
        regionNameRu: DataTypes.STRING,
        regionNameKz: DataTypes.STRING,
        regionChangeDate: DataTypes.STRING,

        city: DataTypes.STRING,
        street: DataTypes.STRING,
        building: DataTypes.STRING,
        corpus: DataTypes.STRING,
        flat: DataTypes.STRING,
        beginDate: DataTypes.STRING,
        endDate: DataTypes.STRING,
        arCode: DataTypes.STRING
    },
    {
        tableName: 'addresses'
    }
);

module.exports.Address = AddressModel;
