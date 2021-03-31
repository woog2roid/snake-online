const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            score: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            paranoid: false,
            underscored: false,
            modelName: 'Game',
            tableName: 'games',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.Game.belongsTo(db.User, {foreignKey: 'player', targetKey: 'id'});
    }
}