'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('PRICES', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                autoIncrement: true,
            },
            value: {
                type: Sequelize.STRING,
            },
            min: {
                type: Sequelize.INTEGER,
            },
            max: {
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable('PRICES');
    },
};
