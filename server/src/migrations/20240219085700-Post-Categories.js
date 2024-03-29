'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('POST_CATEGORIES', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                autoIncrement: true,
            },
            value: {
                type: Sequelize.STRING,
            },
            info: {
                type: Sequelize.STRING,
            },
            perDay: {
                type: Sequelize.STRING,
            },
            perWeek: {
                type: Sequelize.STRING,
            },
            perMonth: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('POST_CATEGORIES');
    },
};
