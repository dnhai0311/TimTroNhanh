import db from '../models';

export const sendMessageService = async ({ message, sender, receiver }) => {
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

export const getAllMessageService = async ({ id }) => {
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
            attributes: ['id', 'value', 'sender', 'receiver'],
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

            groupedMessages[otherUserId].messages.push({
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
