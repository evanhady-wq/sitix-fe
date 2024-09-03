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
import AboutUs from "./pages/AboutUs";
import TermAndCondition from "./pages/TermAndCondition";

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
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/term" element={<TermAndCondition />} />
      </Routes>
    </>
  );
}

export default App;
