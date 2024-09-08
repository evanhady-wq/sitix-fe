import React from "react";
import Header from "../components/Header";
import { withLoading } from "../hoc/withLoading";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import EventCard from "../components/EventCard";
import TransactionCard from "../components/TransactionCard";

function MyTransactionPage() {
  return (
    <div>
      <Header />
      <TransactionCard />
      <div className="mt-[300px] min-w-32">
        <Footer />
      </div>
    </div>
  );
}

export default withLoading(MyTransactionPage);
