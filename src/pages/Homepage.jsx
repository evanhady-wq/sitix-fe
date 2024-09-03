import React from "react";
import Header from "../components/Header";
import { withLoading } from "../hoc/withLoading";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import EventCard from "../components/EventCard";

function Homepage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Banner />
      <div className="items-center justify-center">
        <EventCard />
      </div>
      <Footer />
    </div>
  );
}

export default withLoading(Homepage);
