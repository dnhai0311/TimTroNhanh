import authRouter from './auth';
import categoryRouter from './category';
import postRouter from './post';
import insertRouter from './insert';
import priceRouter from './price';
import acreageRouter from './acreage';
import provinceRouter from './province';
import districtRouter from './district';
import messageRouter from './message';
import otpRouter from './otp';
import userRouter from './user';
import paymentRouter from './payment';
import postCategoryRouter from './post-category';

const initRoutes = (app) => {
    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/category', categoryRouter);
    app.use('/api/v1/post', postRouter);
    app.use('/api/v1/insert', insertRouter);
    app.use('/api/v1/price', priceRouter);
    app.use('/api/v1/acreage', acreageRouter);
    app.use('/api/v1/province', provinceRouter);
    app.use('/api/v1/district', districtRouter);
    app.use('/api/v1/user', userRouter);
    app.use('/api/v1/message', messageRouter);
    app.use('/api/v1/otp', otpRouter);
    app.use('/api/v1/payment', paymentRouter);
    app.use('/api/v1/post-category', postCategoryRouter);

    return app.use('/', (req, res) => {
        res.send('server on...');
    });
};

export default initRoutes;
