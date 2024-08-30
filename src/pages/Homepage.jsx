import React from "react";
import Header from "../components/Header";
import { withLoading } from "../hoc/withLoading";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import EventCard from "../components/EventCard";

function Homepage() {
  return (
    <div>
      <Header />
      <Banner />
      <EventCard />
      <Footer />
    </div>
  );
}

export default withLoading (Homepage);
