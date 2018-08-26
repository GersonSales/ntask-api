module.exports = (sequelize, DataType) => {
    const Tasks = sequelize.define("Tasks", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoInacrement: true
        },
        title: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                noEmpty: true
            }
        },
        done: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        classMethods: {
            associate: (models) => {
                taskss.belongsTo(models.Users);
            }
        }
    });
    return Tasks;
};