import { Routes, Route } from 'react-router-dom';
import {
    Main,
    Home,
    Login,
    RentalApartment,
    RentalHouse,
    RentalRoom,
    RentalSpace,
    DetailPost,
    LikedPost,
    ForgetPassword,
} from './containers/public/index';
import {
    Messenger,
    PostManagement,
    TopUp,
    TopUpContainer,
    System,
    TransactionManagement,
    UserManagement,
    CreateNewPost,
    ChangePassword,
    Momo,
    VNPay,
    Status,
    Checkout,
} from './containers/system/User/index';
import {
    Admin,
    LoginAdmin,
    Dashboard,
    AdminUserManagement,
    AdminPostManagement,
    AdminTransactionsManagement,
} from './containers/system/Admin/index';
import { path } from './utils/constant';
import { PrivateWrapper, AdminWrapper } from './route/index';
import ScrollToTop from './utils/commons/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import { useSocketContext } from './context/SocketContext';
import { useEffect } from 'react';
import { showToastSuccess } from './utils/commons/ToastUtil';
function App() {
    const { socket } = useSocketContext();
    useEffect(() => {
        if (socket) {
            socket.on('receiver', () => {
                showToastSuccess(`Bạn nhận được tin nhắn mới`);
            });

            return () => {
                socket.off('receiver');
            };
        }
    }, [socket]);
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path={path.MAIN} element={<Main />}>
                    <Route path={'*'} element={<Home />} index />
                    <Route path={path.LOGIN} element={<Login />} />
                    <Route path={path.FORGET_PASSWORD} element={<ForgetPassword />} />
                    <Route path={path.RENTAL_ROOM} element={<RentalRoom />} />
                    <Route path={path.RENTAL_HOUSE} element={<RentalHouse />} />
                    <Route path={path.RENTAL_APARTMENT} element={<RentalApartment />} />
                    <Route path={path.RENTAL_SPACE} element={<RentalSpace />} />
                    <Route path={path.DETAIL_POST__POST_ID} element={<DetailPost />} />
                    <Route path={path.LIKED_POST} element={<LikedPost />} />
                </Route>
                <Route element={<PrivateWrapper />}>
                    <Route path={path.SYSTEM} element={<System />}>
                        <Route path={'*'} element={<UserManagement />} index />
                        <Route path={path.MESSENGER} element={<Messenger />} />
                        <Route path={path.MESSENGER__USER_ID} element={<Messenger />} />
                        <Route path={path.POST_MANAGEMENT} element={<PostManagement />} />
                        <Route path={path.TOP_UP} element={<TopUp />}>
                            <Route path={'*'} element={<TopUpContainer />} index />
                            <Route path={path.MOMO} element={<Momo />} />
                            <Route path={path.VNPAY} element={<VNPay />} />
                            <Route path={path.STATUS} element={<Status />} />
                        </Route>
                        <Route path={path.CREATE_NEW_POST} element={<CreateNewPost />} />
                        <Route path={path.CHANGE_PASSWORD} element={<ChangePassword />} />
                        <Route path={path.TRANSACTION_MANAGEMENT} element={<TransactionManagement />} />{' '}
                        <Route path={path.CHECKOUT__POST_ID} element={<Checkout />} />
                    </Route>
                </Route>
                <Route path={path.ADMIN_LOGIN} element={<LoginAdmin />} />
                <Route element={<AdminWrapper />}>
                    <Route path={path.ADMIN} element={<Admin />}>
                        <Route path="*" element={<Dashboard />} index />
                        <Route path={path.ADMIN_USER_MANAGEMENT} element={<AdminUserManagement />} />
                        <Route path={path.ADMIN_POST_MANAGEMENT} element={<AdminPostManagement />} />
                        <Route path={path.APPROVE_POST} element={<AdminPostManagement isApproved={true} />} />
                        <Route path={path.ADMIN_TRANSACTION_MANAGEMENT} element={<AdminTransactionsManagement />} />
                    </Route>
                </Route>
            </Routes>
            <ToastContainer autoClose={1000} position="bottom-right" />
        </>
    );
}

export default App;
