import "./App.css";
import Homepage from "./pages/Homepage";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import EventPage from "./pages/EventPage";
import OrderPage from "./pages/OrderPage";
import CreatorDashboard from "./pages/CreatorDashboard";
import CreatorProfile from "./pages/CreatorProfile";
import CreatorCreateEvent from "./pages/CreatorCreateEvent";
import AdminDashboard from "./pages/AdminDashboard";
import ManageCustomer from "./pages/ManageCustomer";
import ManageCreator from "./pages/ManageCreator";
import ManageEventCategory from "./pages/ManageEventCategory";
import AboutUs from "./pages/AboutUs";
import TermAndCondition from "./pages/TermAndCondition";
import CreatorMyEvent from "./pages/CreatorMyEvent";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPage from "./pages/ResetPage";
import MyTransactionPage from "./pages/MyTransactionPage";
import PageNotFound from "./pages/PageNotFound";



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/event/:eventid" element={<EventPage />} />
        <Route path="/event/order/:eventid" element={<OrderPage />} />
        <Route path="/mytransaction" element={<MyTransactionPage/>} />
        <Route path="/recovery" element={<ForgotPasswordPage />} />
        <Route path="/reset" element={<ResetPage />} />

        <Route path="/creator/dashboard" element={<CreatorDashboard />} />
        <Route path="/creator/profile" element={<CreatorProfile />} />
        <Route path="/creator/create-event" element={<CreatorCreateEvent />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/customers" element={<ManageCustomer />} />
        <Route path="/admin/creators" element={<ManageCreator />} />
        <Route path="/admin/eventcategory" element={<ManageEventCategory />} />

        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/term" element={<TermAndCondition />} />
        <Route path="/creator/myevent" element={<CreatorMyEvent />} />

        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </>
  );
}

export default App;
