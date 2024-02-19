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
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at controller ' + error,
        });
    }
};

export const getAllMessage = async (req, res) => {
    const { id } = req.user;
    try {
        if (!id)
            return res.status(400).json({
                err: 1,
                msg: 'missing input',
            });
        const response = await messageService.getAllMessageService(req.user);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at controller ' + error,
        });
    }
};
