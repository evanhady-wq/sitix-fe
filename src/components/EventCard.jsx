import { Button, Card, CardBody } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { IoLocation } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../service/constants";
import useAxios from "../hooks/useAxios";
import axios from "axios";

const EventCard = ({ searchTerm }) => {
  const [events, setEvents] = useState([]);
  const [eventCategory, setEventCategory] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const {
    data,
    error: fetchError,
    loading: isLoading,
    refetch,
  } = useAxios(`${BASE_URL}/api/event/allevent`, "GET", null);

  const getEventByCategory = async (categoryId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/event/allevent/category/${categoryId}`
      );
      setEvents(response.data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getEventCategory = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/eventcategory/get`);
      setEventCategory(response.data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data) {
      setEvents(data);
    }
  }, [data]);

  useEffect(() => {
    getEventCategory();
  }, []);

  const handleCardClick = (eventid) => {
    navigate(`/event/${eventid}`);
  };

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    if (categoryId === "all") {
      refetch();
    } else {
      getEventByCategory(categoryId);
    }
  };

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mx-16 my-8">
      <div>
        <p className="font-bold text-xl text-center">Rekomendasi Event</p>
      </div>
      <div className="flex flex-row items-center justify-center gap-2 mb-3">
        <Button
          size="md"
          className={
            activeCategory === "all"
              ? "bg-custom-blue-1 text-white"
              : "bg-custom-blue-3 text-white"
          }
          onClick={() => handleCategoryClick("all")}
        >
          Semua
        </Button>
        {eventCategory.map((categoryEvent) => (
          <Button
            key={categoryEvent.id}
            size="md"
            className={
              activeCategory === categoryEvent.id
                ? "bg-custom-blue-1 text-white"
                : "bg-custom-blue-3 text-white"
            }
            onClick={() => handleCategoryClick(categoryEvent.id)}
          >
            {categoryEvent.categoryName}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-4 ">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => {
            const isEventOver = new Date(event.date) < new Date();
            return (
              <div key={event.id} >
                <Card className="w-[310px] md:w-[200px] cursor-pointer transition-transform transform hover:scale-110 duration-300 relative">
                  <CardBody
                    onClick={() => {
                      handleCardClick(event.id);
                    }}
                    className="relative"
                  >
                    <div className="flex md:flex-col gap-2">
                      <div>
                        <div className="relative w-24 md:w-full">
                      <img
                        src={event.poster}
                        className="w-full h-32 md:h-48 rounded-md object-cover"
                        alt="Event"
                      />
                      {isEventOver && (
                        <div className="absolute bottom-0 left-0 w-full bg-red-500 text-white text-center py-1 rounded-b-md">
                          Event berakhir
                        </div>
                      )}
                    </div>
                    </div>
                      <div className="w-40">
                        <div className="md:pt-3 flex">
                      <IoLocation color="blue" />
                      <p className="text-xs text-gray-500 ml-1">
                        {event.city}
                      </p>
                    </div>
                    <p className="font-bold text-sm mb-0 truncate">
                      {event.name}
                    </p>
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
                    </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            );
          })
        ) : (
          <p>Event yang kamu cari gak ada </p>
        )}
      </div>
    </div>
  );
};

export default EventCard;
