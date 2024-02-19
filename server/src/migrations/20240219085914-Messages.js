'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('MESSAGES', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                autoIncrement: true,
            },
            sender: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'USERS',
                    key: 'id',
                },
            },
            receiver: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'USERS',
                    key: 'id',
                },
            },
            value: {
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
        await queryInterface.dropTable('MESSAGES');
    },
};
