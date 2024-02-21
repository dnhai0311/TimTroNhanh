import { getReceiverSocketId, io } from '../../socket/socket';
import * as messageService from '../services/message';

export const sendMessage = async (req, res) => {
    const { message, sender, receiver } = req.body;
    try {
        if (!message || !receiver || !sender)
            return res.status(400).json({
                err: 1,
                msg: 'missing input',
            });
        const response = await messageService.sendMessageService(req.body);
        const receiverSocketId = getReceiverSocketId(receiver);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('message', message);
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
        if (!id)
            return res.status(400).json({
                err: 1,
                msg: 'missing input',
            });
        const response = await messageService.getAllMessagesService(req.user);
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
    const { otherId, page } = req.query;

    try {
        if (!id || !otherId)
            return res.status(400).json({
                err: 1,
                msg: 'missing input',
            });
        const response = await messageService.getMessagesService({ id, otherId, page });
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at controller ' + error,
        });
    }
};
