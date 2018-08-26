const Sequelize = require('sequelize'),
config = require('./libs/config.js');

let connection = null;

module.exports = () => {
    if (!connection) {
        connection = new Sequelize(
            config.database,
            config.username,
            config.password,
            config.params
        );
    }
    return connection;
};
