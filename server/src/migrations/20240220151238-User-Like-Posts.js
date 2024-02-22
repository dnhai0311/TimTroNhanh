'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('USER_LIKE_POSTS', {
            userId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'USERS',
                    key: 'id',
                },
            },
            postId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'POSTS',
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
        await queryInterface.dropTable('USER_LIKE_POSTS');
    },
};
