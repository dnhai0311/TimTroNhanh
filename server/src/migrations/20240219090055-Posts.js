'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('POSTS', {
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
                type: Sequelize.FLOAT,
                defaultValue: 0.0,
            },
            status: {
                type: Sequelize.ENUM('payment', 'pending', 'approved', 'rejected', 'expired'),
                defaultValue: 'payment',
                allowNull: false,
            },
            imgsId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'IMAGES',
                    key: 'id',
                },
            },
            categoryCode: {
                type: Sequelize.STRING,
            },
            attributeId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'ATTRIBUTES',
                    key: 'id',
                },
            },
            userId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'USERS',
                    key: 'id',
                },
            },
            typePostId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'POST_CATEGORIES',
                    key: 'id',
                },
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
        await queryInterface.dropTable('POSTS');
    },
};
