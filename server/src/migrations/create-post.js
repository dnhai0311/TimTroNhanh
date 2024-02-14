'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('POSTs', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                autoIncrement: true,
            },
            title: {
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.TEXT('long'),
            },
            star: {
                type: Sequelize.STRING,
            },
            status: {
                type: Sequelize.ENUM('payment', 'pending', 'approved', 'rejected', 'expired'),
                defaultValue: 'payment',
                allowNull: false,
            },
            imgsId: {
                type: Sequelize.STRING,
            },
            categoryCode: {
                type: Sequelize.STRING,
            },
            attributeId: {
                type: Sequelize.STRING,
            },
            userId: {
                type: Sequelize.STRING,
            },
            typePostId: {
                type: Sequelize.STRING,
            },
            expiredAt: {
                allowNull: false,
                type: Sequelize.DATE,
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
        await queryInterface.dropTable('POSTs');
    },
};
