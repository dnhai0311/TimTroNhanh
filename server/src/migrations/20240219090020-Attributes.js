'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('ATTRIBUTES', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                autoIncrement: true,
            },
            price: {
                type: Sequelize.FLOAT,
            },
            acreage: {
                type: Sequelize.FLOAT,
            },
            address: {
                type: Sequelize.STRING,
            },
            districtId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'DISTRICTS',
                    key: 'id',
                },
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
        await queryInterface.dropTable('ATTRIBUTES');
    },
};
