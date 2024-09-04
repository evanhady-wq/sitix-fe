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
import CreatorEventSaya from "./pages/CreatorEventSaya";
import AdminDashboard from "./pages/AdminDashboard";
import ManageCustomer from "./pages/ManageCustomer";
import ManageCreator from "./pages/ManageCreator";
import ManageEventCategory from "./pages/ManageEventCategory";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/event/:eventid" element={<EventPage />} />
        <Route path="/event/order/:eventid" element={<OrderPage />} />

        <Route path="/creator/dashboard" element={<CreatorDashboard />} />
        <Route path="/creator/profile" element={<CreatorProfile />} />
        <Route path="/creator/create-event" element={<CreatorCreateEvent />} />
        <Route path="/creator/event-saya" element={<CreatorEventSaya />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/customers" element={<ManageCustomer />} />
        <Route path="/admin/creators" element={<ManageCreator />} />
        <Route path="/admin/eventcategory" element={<ManageEventCategory />} />
      </Routes>
    </>
  );
}

export default App;
