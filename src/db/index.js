const { Sequelize } = require('sequelize');

const DB_CONFIG = {
    dbType: process.env.DB_TYPE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    datebase: process.env.DB_DATABASE
};

const sequelize = new Sequelize(DB_CONFIG.datebase, DB_CONFIG.username, DB_CONFIG.password, {
    host: 'localhost',
    port: DB_CONFIG.port,
    dialect: DB_CONFIG.dbType
});

module.exports.sequelize = sequelize;
