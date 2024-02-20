import express from 'express';
import * as messageController from '../controllers/message';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.use(verifyToken);
router.post('/send-message', messageController.sendMessage);
router.get('/all-messages', messageController.getAllMessages);
router.get('/messages', messageController.getMessages);

export default router;
