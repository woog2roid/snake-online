const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.STRING(15),
                allowNull: false,
                primaryKey: true,
            },
            password: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            nickname: {
                type: Sequelize.STRING(30),
                allowNull: false,
                unique: true,
            },
            comment: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true,
            paranoid: false,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.User.hasMany(db.Game, {foreignKey: 'player', sourceKey: 'id'});
    }
}