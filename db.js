const fs = require('fs'),
    path = require('path'),
    Sequelize = require('sequelize');

let db = null;

module.exports = app => {
    if (!db) {
        const config = app.libs.config;
        const sequelize = new Sequelize(
            config.database,
            config.username,
            config.password,
            config.params
        );
        db = {
            sequelize,
            sequelize, 
            models :{}
        };

        const dir = path.join(__dirname, "models");
        fs.readdirSync(dir).forEach(file => {
            const modelDir = path.join(dir, file);
            const model = sequelize.import(modelDir);
            db.models[model.name] = model;
        });

        Object.keys(db.models).forEach(key => {
            if(db.models[key].hasOwnProperty('associate')) {
                db.models[key].associate(db.models);
            }
        });
    }
    return db;
};
