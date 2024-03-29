import express from 'express';
import * as paymentController from '../controllers/payment';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.use(verifyToken);
router.post('/check-out', paymentController.checkOutPostAndUpdateMoney);
router.post('/create-vnpay-payment-url', paymentController.createVNPayPaymentURL);
router.get('/vnpay-return', paymentController.vnpayReturn);
router.get('/all-payments-from-user', paymentController.getAllPaymentsFromUserId);
router.get('/total', paymentController.getTotalPaymentsByStatus);
router.get('/month', paymentController.getTotalPaymentsByMonth);
router.get('/all', paymentController.getAllPayments);

export default router;
