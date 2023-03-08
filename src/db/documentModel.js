const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const DocumentModel = sequelize.define(
    'Document',
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

        number: DataTypes.STRING,
        series: DataTypes.STRING,
        beginDate: DataTypes.STRING,
        endDate: DataTypes.STRING,

        issueOrganizationCode: DataTypes.STRING,
        issueOrganizationNameRu: DataTypes.STRING,
        issueOrganizationNameKz: DataTypes.STRING,
        issueOrganizationChangeDate: DataTypes.STRING,

        statusCode: DataTypes.STRING,
        statusNameRu: DataTypes.STRING,
        statusNameKz: DataTypes.STRING,
        statusChangeDate: DataTypes.STRING,

        invalidityDate: DataTypes.STRING,
        surname: DataTypes.STRING,
        name: DataTypes.STRING,
        patronymic: DataTypes.STRING,
        birthDate: DataTypes.STRING
    },
    {
        tableName: 'documents'
    }
);

module.exports.Document = DocumentModel;
