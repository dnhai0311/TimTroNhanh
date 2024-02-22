import { getReceiverSocketId, io } from '../../socket/socket';
import * as messageService from '../services/message';

export const sendMessage = async (req, res) => {
    const { message, receiver } = req.body;
    const { id } = req.user;

    try {
        if (!message || !receiver)
            return res.status(400).json({
                err: 1,
                msg: 'missing input',
            });
        const response = await messageService.sendMessageService(message, id, receiver);
        const receiverSocketId = getReceiverSocketId(receiver);
        if (receiverSocketId) {
            const newMessage = {
                value: message,
                sender: id,
            };
            io.to(receiverSocketId).emit('message', newMessage);
            io.to(receiverSocketId).emit('receiver', receiver);
        }
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at controller ' + error,
        });
    }
};

export const getAllMessages = async (req, res) => {
    const { id } = req.user;
    try {
        const response = await messageService.getAllMessagesService(id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at controller ' + error,
        });
    }
};

export const getMessages = async (req, res) => {
    const { id } = req.user;
    const { otherId, page, currentTotalMessages } = req.query;

    try {
        if (!otherId)
            return res.status(400).json({
                err: 1,
                msg: 'missing input',
            });
        const response = await messageService.getMessagesService({ id, otherId, page, currentTotalMessages });
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at controller ' + error,
        });
    }
};
