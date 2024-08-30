import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { withLoading } from "../hoc/withLoading";
import axios from "axios";
import { BASE_URL } from "../service/constants";
import { useNavigate, useParams } from "react-router-dom";
import DummyCard from "../assets/DummyCard.jpeg";
import { IoLocation } from "react-icons/io5";
import { Button, Input, Select } from "@nextui-org/react";

const EventPage = () => {
  const [event, setEvent] = useState(null);
  const { eventid } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchEvent = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token tidak ditemukan !");
      }

      const response = await axios.get(`${BASE_URL}/api/event/${eventid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEvent(response.data.data);
      console.log(response.data.data.name);
    } catch (error) {
      console.error("Failed to fetch event:", error.message);
      setError("failed to fetch event");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [eventid]);

  const handleOrderClick = (eventid) => {
    navigate(`/event/order/${eventid}`)
  }

  return (
    <>
      {loading ? (
        <p></p>
      ) : (
        <>
          <Header />
          <div className="flex mt-12 mx-24">
            <div className="w-1/3 flex justify-center ">
              <img
                src={DummyCard}
                className="w-80 h-80 rounded-md object-cover"
              />
            </div>
            <div className="ml-8">
              <h1 className="text-3xl">{event.name}</h1>
              <div className="flex space-x-24">
                <p>
                  oleh <span className="font-bold">{event.creatorName} </span>
                </p>
                <div className="flex">
                  <IoLocation color="blue" className="pt-1" />
                  <p className="">{event.location}</p>
                </div>
              </div>

              <div className="flex space-x-2">
                <div className="bg-slate-200 rounded-xl p-2 h-[60px] w-[250px]">
                  <p className="text-sm mb-1">Tanggal</p>
                  <p className="font-bold text-sm">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="bg-slate-200 rounded-xl p-2 h-[60px] w-[250px]">
                  <p className="text-sm mb-1">Waktu </p>
                </div>
                <div className="bg-slate-200 rounded-xl p-2 h-[60px] w-[250px]">
                  <p className="text-sm mb-1">Tipe Event</p>
                  <p className="font-bold text-sm">{event.eventCategory}</p>
                </div>
              </div>
              <div
                className="items-center justify-around  my-4 p-2 w-[770px]"
              >
                <p className="font-bold">Description</p>
                <p className="text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Ducimus, voluptates! Eos neque blanditiis, eligendi natus
                  fugit nulla corrupti vero, impedit laborum distinctio
                  exercitationem beatae quaerat asperiores labore assumenda
                  saepe vitae?
                </p>
                <Button 
                className="text-white font-bold bg-custom-blue-2 w-[150px]"
                onClick={() => {
                  handleOrderClick(event.id)
                }}
                >
                  Beli Tiket Event
                </Button>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default withLoading(EventPage);
