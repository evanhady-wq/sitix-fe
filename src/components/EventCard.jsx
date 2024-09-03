import { Card, CardBody } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import DummyCard from "../assets/DummyCard.jpeg";
import { IoLocation } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EventCard = ({searchTerm}) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      // const token = localStorage.getItem("token");

      // if (!token) {
      //   throw new Error("Token tidak ditemukan. Harap login terlebih dahulu.");
      // }

      const response = await axios.get("http://10.10.102.144:8080/api/event/allevent"
      );
      
      setEvents(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
      setError("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
    
  }, []);
  

  const handleCardClick = (eventid) => {
    navigate(`/event/${eventid}`);
  };

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mx-16 my-8">
      <div>
        <p className="font-bold text-xl text-center">Rekomendasi Event</p>
      </div>
      <div className="flex flex-wrap justify-center gap-4 ">
        {filteredEvents.length > 0 ? (
        filteredEvents.map((event) => (
          <div key={event.id} className="w-48">
            <Card className="w-[200px] cursor-pointer">
              <CardBody
                onClick={() => {
                  handleCardClick(event.id);
                }}
              >
                <img
                  src={event.poster}
                  className="w-full h-48 rounded-md object-cover"
                  alt="Event"
                />
                <div className="pt-3 flex">
                  <IoLocation color="blue" />
                  <p className="text-xs text-gray-500 ml-1 truncate">
                    {event.location}
                  </p>
                </div>
                <p className="font-bold text-sm mb-0 truncate">{event.name}</p>
                <p className="text-xs text-gray-600 mb-0">
                  Date: {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  Creator: {event.creatorName}
                </p>
                <p className="font-bold text-sm mt-2">
                  {event.ticketCategories.length > 0
                    ? `Rp. ${event.ticketCategories[0].price.toLocaleString()}`
                    : "Price not available"}
                </p>
              </CardBody>
            </Card>
          </div>
        ))
      ) : (
        <p>Event yang kamu cari gak ada </p>
      )}
      </div>
    </div>
  );
};

export default EventCard;
