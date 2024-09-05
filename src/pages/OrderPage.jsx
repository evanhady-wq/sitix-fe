import React, { useEffect, useState } from "react";
import { withLoading } from "../hoc/withLoading";
import { BASE_URL } from "../service/constants";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button, Card, CardBody } from "@nextui-org/react";
import { LuTicket } from "react-icons/lu";

const OrderPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { eventid } = useParams();
  const [event, setEvent] = useState([]);
  const [quantities, setQuantities] = useState({});

  const fetchEvent = async () => {
    try {
     

      if (!token) {
        throw new Error("Token tidak ditemukan !");
      }

      const response = await axios.get(`${BASE_URL}/api/event/allevent/${eventid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEvent(response.data.data.ticketCategories);
    } catch (error) {
      setError("failed to fetch event");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

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
    return event.reduce((total, ticket) => {
      const quantity = quantities[ticket.id] || 0;
      return total + quantity * ticket.price;
    }, 0);
  };

  return (
    <>
      <Header />
      <div className="flex justify-between mx-16 my-4 gap-4">
        <div>
          <div>
            <p className="font-bold text-xl mb-0">{}</p>
            <p>Pilih tiket yang ingin kamu pesan</p>
            {event.map((ticket) => (
              <div key={ticket.id}>
                <Card className="mb-4">
                  <CardBody className="w-[700px]">
                    <p className="font-bold text-lg mb-0">{ticket.name}</p>
                    <p className="text-sm ">
                      Harga tertera belum termasuk pajak, biaya layanan, dan
                      biaya platfom. Harap selesaikan transaksi dalam waktu 10
                      menit.
                    </p>
                    <div className="flex justify-between">
                      <p className="font-bold">
                        Rp. {ticket.price.toLocaleString("id-ID")}
                      </p>
                      {quantities[ticket.id] ? (
                        <div className="flex gap-3">
                          <Button
                            className="text-custom-blue-3 font-bold bg-transparent border-2 border-custom-blue-2"
                            onClick={() => handleDecrement(ticket.id)}
                          >
                            -
                          </Button>
                          <p className="pt-2">{quantities[ticket.id]}</p>
                          <Button
                            className="text-custom-blue-3 font-bold bg-transparent border-2 border-custom-blue-2"
                            onClick={() => handleIncrement(ticket.id)}
                          >
                            +
                          </Button>
                        </div>
                      ) : (
                        <Button
                          className="text-white font-bold bg-custom-blue-2"
                          onClick={() => handleAddClick(ticket.id)}
                        >
                          Tambah +
                        </Button>
                      )}
                    </div>
                  </CardBody>
                </Card>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/3">
          <Card>
            <CardBody>
              <p className="text-sm font-bold">Detail Pesanan</p>
              {Object.keys(quantities).length === 0 ? (
                <p className="text-sm"> Belum ada tiket yang dipilih </p>
              ) : (
                <div>
                  {event.map((ticket) => {
                    const quantity = quantities[ticket.id] || 0;
                    const totalPrice = getTotalPrice(ticket.id, ticket.price);
                    if (quantity > 0) {
                      return (
                        <div
                          key={ticket.id}
                          className="flex justify-between my-2 items-center"
                        >
                          <div>
                            <p className="text-[10px] mb-0 text-custom-blue-3"> {ticket.name}</p>
                            <p className="text-[14px]">{quantity} Tiket</p>
                          </div>
                          <p className="text-[15px]">Rp. {totalPrice.toLocaleString("id-ID")}</p>
                        </div>
                      );
                    }
                    return null;
                  })}
                  <div className="flex justify-between font-bold mt-4">
                    <p>Grand Total</p>
                    <p>Rp. {getGrandTotal().toLocaleString("id-ID")}</p>
                  </div>
                  <Button className="text-white font-bold bg-custom-blue-2 w-full">
                    Lanjutkan
                  </Button>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default withLoading(OrderPage);
