import db from '../models';

export const sendMessageService = async (message, sender, receiver) => {
    try {
        const response = await db.MESSAGE.create({
            value: message,
            sender,
            receiver,
        });

        return {
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'FAILED TO SEND A MESSAGE',
            response,
        };
    } catch (error) {
        throw error;
    }
};

export const getAllMessagesService = async (id) => {
    try {
        const messages = await db.MESSAGE.findAll({
            where: {
                [db.Sequelize.Op.or]: [
                    { receiver: id, sender: { [db.Sequelize.Op.ne]: id } },
                    { sender: id, receiver: { [db.Sequelize.Op.ne]: id } },
                ],
            },
            include: [
                {
                    model: db.USER,
                    as: 'sentUser',
                    attributes: ['id', 'name', 'avatar'],
                },
                {
                    model: db.USER,
                    as: 'receiveUser',
                    attributes: ['id', 'name', 'avatar'],
                },
            ],
            attributes: ['id', 'value', 'sender', 'receiver', 'createdAt'],
            order: [['id', 'DESC']],
        });

        const groupedMessages = {};
        messages.forEach((message) => {
            const otherUserId = message.sender === id ? message.receiver : message.sender;
            const isCurrentUserSender = message.sender === id;

            if (!groupedMessages[otherUserId] || groupedMessages[otherUserId].createdAt < message.createdAt) {
                const otherUser = isCurrentUserSender ? message.receiveUser : message.sentUser;

                groupedMessages[otherUserId] = {
                    user: {
                        id: otherUser.id,
                        name: otherUser.name,
                        avatar: otherUser.avatar,
                    },
                    messages: [
                        {
                            id: message.id,
                            value: message.value,
                            isCurrentUserSender,
                        },
                    ],
                    createdAt: message.createdAt,
                };
            }
        });

        const result = Object.values(groupedMessages);
        result.sort((a, b) => b.createdAt - a.createdAt);
        return result;
    } catch (error) {
        throw error;
    }
};

export const getMessagesService = async ({ id, otherId, page, currentTotalMessages }) => {
    try {
        const messages = await db.MESSAGE.findAll({
            offset: +currentTotalMessages || page * 2 * +process.env.PAGE_DISPLAYED || 0,
            limit: 2 * +process.env.PAGE_DISPLAYED,
            where: {
                [db.Sequelize.Op.or]: [
                    {
                        sender: id,
                        receiver: otherId,
                    },
                    {
                        sender: otherId,
                        receiver: id,
                    },
                ],
            },
            include: [
                {
                    model: db.USER,
                    as: 'sentUser',
                    attributes: ['id', 'name', 'avatar'],
                },
                {
                    model: db.USER,
                    as: 'receiveUser',
                    attributes: ['id', 'name', 'avatar'],
                },
            ],
            attributes: ['id', 'value', 'sender', 'receiver'],
            order: [['id', 'DESC']],
        });

        const groupedMessages = {};

        messages.forEach((message) => {
            const otherUserId = message.sender === id ? message.receiver : message.sender;
            const isCurrentUserSender = message.sender === id;

            if (!groupedMessages[otherUserId]) {
                const otherUser = isCurrentUserSender ? message.receiveUser : message.sentUser;

                groupedMessages[otherUserId] = {
                    user: {
                        id: otherUser.id,
                        name: otherUser.name,
                        avatar: otherUser.avatar,
                    },
                    messages: [],
                };
            }

            // Add messages to the beginning of the array (newest first)
            groupedMessages[otherUserId].messages.unshift({
                id: message.id,
                value: message.value,
                isCurrentUserSender,
            });
        });

        const result = Object.values(groupedMessages);
        return result;
    } catch (error) {
        throw error;
    }
};
