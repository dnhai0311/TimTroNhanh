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
} from './containers/public/index';
import {
    Messenger,
    PostManagement,
    Recharge,
    System,
    TransactionManagement,
    UserManagement,
    CreateNewPost,
    ChangePassword,
} from './containers/system/User/index';
import { path } from './utils/constant';
import PrivateWrapper from './route/PrivateWrapper';
import ScrollToTop from './utils/commons/ScrollToTop';

function App() {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path={path.MAIN} element={<Main />}>
                    <Route path={'*'} element={<Home />} />
                    <Route path={path.LOGIN} element={<Login />} />
                    <Route path={path.RENTAL_ROOM} element={<RentalRoom />} />
                    <Route path={path.RENTAL_HOUSE} element={<RentalHouse />} />
                    <Route path={path.RENTAL_APARTMENT} element={<RentalApartment />} />
                    <Route path={path.RENTAL_SPACE} element={<RentalSpace />} />
                    <Route path={path.DETAIL_POST__POST_ID} element={<DetailPost />} />
                    <Route path={path.LIKED_POST} element={<LikedPost />} />
                </Route>
                <Route element={<PrivateWrapper />}>
                    <Route path={path.SYSTEM} element={<System />}>
                        <Route path={'*'} element={<UserManagement />} />
                        <Route path={path.MESSENGER} element={<Messenger />} />
                        <Route path={path.POST_MANAGEMENT} element={<PostManagement />} />
                        <Route path={path.RECHARGE} element={<Recharge />} />
                        <Route path={path.CREATE_NEW_POST} element={<CreateNewPost />} />
                        <Route path={path.CHANGE_PASSWORD} element={<ChangePassword />} />
                        <Route path={path.TRANSACTION_MANAGEMENT} element={<TransactionManagement />} />
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;
