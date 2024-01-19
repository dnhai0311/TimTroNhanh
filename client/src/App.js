import { Routes, Route } from "react-router-dom";
import {
  Main,
  Home,
  Login,
  RentalApartment,
  RentalHouse,
  RentalRoom,
  RentalSpace,
} from "./containers/public";
import { path } from "./ultils/constant";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path={path.MAIN} element={<Main />}>
          <Route path={"*"} element={<Home />} />
          <Route path={path.RENTAL_ROOM} element={<RentalRoom />} />
          <Route path={path.RENTAL_HOUSE} element={<RentalHouse />} />
          <Route path={path.RENTAL_APARTMENT} element={<RentalApartment />} />
          <Route path={path.RENTAL_SPACE} element={<RentalSpace />} />
        </Route>
        <Route path={path.LOGIN} element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
