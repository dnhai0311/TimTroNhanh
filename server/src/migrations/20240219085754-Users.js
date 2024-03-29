'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('USERS', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                autoIncrement: true,
            },
            name: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            },
            phone: {
                type: Sequelize.STRING,
            },
            money: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            facebook: {
                type: Sequelize.STRING,
                defaultValue: '',
            },
            avatar: {
                type: Sequelize.STRING,
                defaultValue: 'https://res.cloudinary.com/dvyprevig/image/upload/v1706766558/we6knbr2twzmc9reocid.png',
            },
            type: {
                type: Sequelize.STRING,
                defaultValue: 0,
            },
            status: {
                type: Sequelize.ENUM('active', 'disable'),
                defaultValue: 'active',
                allowNull: false,
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
        await queryInterface.dropTable('USERS');
    },
};
