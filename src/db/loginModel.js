const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Login = sequelize.define(
    'Login',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        iin: DataTypes.STRING
    },
    {
        tableName: 'login',
        timestamps: false
    }
);

module.exports.LoginModel = Login;
