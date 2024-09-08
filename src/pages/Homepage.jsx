import React, { useState } from "react";
import Header from "../components/Header";
import { withLoading } from "../hoc/withLoading";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import EventCard from "../components/EventCard";
import UpcomingEvent from "../components/UpcomingEventCard";

function Homepage() {
  const [searchTerm, setSearchTerm] = useState("")
  return (
    <div className="flex flex-col min-h-screen">
      <Header setSearchTerm={setSearchTerm}/>
      <Banner />
      <div className="items-center justify-center">
        <EventCard searchTerm={searchTerm}/>
        <UpcomingEvent searchTerm={searchTerm}/>
      </div>
      <Footer />
    </div>
  );
}

export default withLoading(Homepage);
