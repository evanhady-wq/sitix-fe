import React, { useEffect, useState } from "react";
import { withLoading } from "../hoc/withLoading";
import { BASE_URL } from "../service/constants";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button, Card, CardBody } from "@nextui-org/react";
import { LuTicket } from "react-icons/lu";

const OrderPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { eventid } = useParams();
  const [ticketCategories, setTicketCategories] = useState([]);
  const [quantities, setQuantities] = useState({});

  const navigate = useNavigate();

  const fetchEvent = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token tidak ditemukan !");
      }

      const response = await axios.get(
        `${BASE_URL}/api/event/allevent/${eventid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTicketCategories(response.data.data.ticketCategories);
    } catch (error) {
      setError("failed to fetch event");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [eventid]);

  const handleAddClick = (ticketId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [ticketId]: (prevQuantities[ticketId] || 0) + 1,
    }));
  };

  const handleIncrement = (ticketId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [ticketId]: prevQuantities[ticketId] + 1,
    }));
  };

  const handleDecrement = (ticketId) => {
    setQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      if (newQuantities[ticketId] > 1) {
        newQuantities[ticketId] -= 1;
      } else {
        delete newQuantities[ticketId];
      }
      return newQuantities;
    });
  };

  const getTotalPrice = (ticketId, price) => {
    const quantity = quantities[ticketId] || 0;
    return quantity * price;
  };

  const getGrandTotal = () => {
    return ticketCategories.reduce((total, ticket) => {
      const quantity = quantities[ticket.id] || 0;
      return total + quantity * ticket.price;
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const transactionDetail = {
      transactionDetailRequests: Object.keys(quantities).map((ticketId) => {
        const ticket = ticketCategories.find((t) => t.id === ticketId);
        return {
          ticketCategoryId: ticketId,
          quantity: quantities[ticketId],
        };
      }),
    };
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token tidak ditemukan !");
      }

      const response = await axios.post(
        `${BASE_URL}/api/transaction`,
        transactionDetail,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const paymentUrl = response.data.data.paymentUrl;

      if (paymentUrl) {
        if (
          paymentUrl !== "undefined" &&
          paymentUrl !== null &&
          paymentUrl !== ""
        ) {
          window.open(paymentUrl, "_blank");
          window.location.href = "/mytransaction";
        } else {
          console.error("Payment URL tidak valid");
        }
      } else {
        console.error("Payment URL tidak ditemukan");
      }
    } catch (error) {
      console.error("Error create transaction:", error.message);
    }
  };



  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row justify-between mx-4 md:mx-16 my-4 gap-4 md:pl-32 md:pr-64">
        <div>
          <div>
            <p className="font-bold text-xl mb-0">{}</p>
            <p>Pilih tiket yang ingin kamu pesan</p>
            {ticketCategories.map((ticket) => (
              <div key={ticket.id}>
                <Card className="mb-4 text-xl md:w-[850px]">
                  <CardBody className="p-4">
                    <p className="font-bold text-2xl mb-0">{ticket.name}</p>
                    <p className="text-sm md:text-base  mt-2 ">
                      Harga tertera belum termasuk pajak, biaya layanan, dan
                      biaya platfom. Harap selesaikan transaksi dalam waktu 10
                      menit.
                    </p>
                    <div className="flex flex-col md:flex-row justify-between items-center">
                      <p className="font-bold">
                        Rp. {ticket.price.toLocaleString("id-ID")}
                      </p>
                      {ticket.availableTicket == 0 ? (
                         <Button
                         isDisabled
                         size="md"
                         >
                           Tiket Habis        
                         </Button>
                      ) : (
                        quantities[ticket.id] ? (
                          <div className="flex gap-3">
                            <Button
                              className="text-custom-blue-3 font-bold bg-transparent border-2 border-custom-blue-2"
                              onClick={() => handleDecrement(ticket.id)}
                            >
                              -
                            </Button>
                            <p className="pt-2">{quantities[ticket.id]}</p>
                            {(ticket.availableTicket > quantities[ticket.id] && quantities[ticket.id] <5) ? (
                              <Button
                              className="text-custom-blue-3 font-bold bg-transparent border-2 border-custom-blue-2"
                              onClick={() => handleIncrement(ticket.id)}
                            >
                              +
                            </Button>
                            ) : (
                              <Button
                              isDisabled
                              >
                              +
                            </Button>
                            )}
                            
                          </div>
                        ) : (
                          <Button
                            className="text-white font-bold bg-custom-blue-2"
                            onClick={() => handleAddClick(ticket.id)}
                            size="md"
                          >
                            Tambah +
                          </Button>
                        )
                      )}
                      
                    </div>
                  </CardBody>
                </Card>
              </div>
            ))}
          </div>
        </div>
        <div className="md:w-1/3">
          <Card className="md:mt-10">
            <CardBody>
              <p className="text-lg font-bold">Detail Pesanan</p>
              {Object.keys(quantities).length === 0 ? (
                <p className="text-sm"> Belum ada tiket yang dipilih </p>
              ) : (
                <div>
                  {ticketCategories.map((ticket) => {
                    const quantity = quantities[ticket.id] || 0;
                    const totalPrice = getTotalPrice(ticket.id, ticket.price);
                    if (quantity > 0) {
                      return (
                        <div
                          key={ticket.id}
                          className="flex justify-between my-2 items-center"
                        >
                          <div>
                            <p className="text-base mb-0 text-custom-blue-3">
                              {" "}
                              {ticket.name}
                            </p>
                            <p className="text-[16px]">{quantity} Tiket</p>
                          </div>
                          <p className="text-[16px]">
                            Rp. {totalPrice.toLocaleString("id-ID")}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  })}
                  <div className="flex justify-between font-bold mt-4 text-xl">
                    <p>Grand Total</p>
                    <p>Rp. {getGrandTotal().toLocaleString("id-ID")}</p>
                  </div>
                  <Button
                    onClick={handleSubmit}
                    className="text-white font-bold bg-custom-blue-2 w-full"
                  >
                    Lanjutkan
                  </Button>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
      <div className="mt-[100px]">
        <Footer />
      </div>
    </>
  );
};

export default withLoading(OrderPage);
