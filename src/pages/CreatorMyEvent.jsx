import React, { useEffect, useState } from "react";
import SidebarCreator from "../components/SidebarCreator";
import HeaderCreator from "../components/HeaderCreator";
import { withLoading } from "../hoc/withLoading";
import axios from "axios";
import { BASE_URL } from "../service/constants";
import {
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { IoLocation } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";

const CreatorMyEvent = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [eventDetail, setEventDetail] = useState([]);
  const [eventCategory, setEventCategory] = useState([]);
  const [id, setId] = useState();
  const { isOpen, isPosterModalOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    city: "",
    address: "",
    linkMap: "",
    poster: "",
    date: "",
    eventCategory: "",
    ticketCategories: [
      {
        id: "",
        price: "",
        quota: "",
      },
    ],
  });
  const [priceQuota, setPriceQuota] = useState({
    quota: "",
    price: "",
  });

  //get token
  const token = localStorage.getItem("token_creator");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  //get all event by creator
  const getMyEvent = async () => {
    try {
      const resMyEvent = await axios.get(
        `${BASE_URL}/api/event/myevent`,
        config
      );
      setEvents(resMyEvent.data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  //get my event by id
  const getMyEventById = async (id) => {
    try {
      const resMyEventById = await axios.get(
        `${BASE_URL}/api/event/allevent/${id}`,
        config
      );
      const eventData = resMyEventById.data.data;
      setEventDetail(eventData);
      setFormData({
        id: eventData.id,
        name: eventData.name,
        city: eventData.city,
        address: eventData.address,
        description: eventData.description,
        linkMap: eventData.linkMap,
        date: eventData.date,
        poster: eventData.poster,
        eventCategory: eventData.eventCategoryId,
        ticketCategories: eventData.ticketCategories,
      });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  //get event category
  const getEventCategory = async () => {
    try {
      const resEventCategory = await axios.get(
        `${BASE_URL}/api/eventcategory/get`,
        config
      );
      setEventCategory(resEventCategory.data.data);
      console.log(eventCategory);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(true);
    }
  };

  //Edit MyEventId
  const editMyEventById = async () => {
    try {
      const resEditMyEvent = await axios.put(
        `${BASE_URL}/api/event/myevent`,
        formData,
        config
      );

      if (formData.poster instanceof File) {
        const formDataImg = new FormData();
        formDataImg.append("poster", formData.poster);

        await axios.post(
          `${BASE_URL}/api/event/poster/${eventDetail.id}`,
          formDataImg,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      alert("Update Berhasil");
      getMyEvent();
    } catch (error) {
      setError(error);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyEvent();
  }, []);

  //handle click edit
  const handleEditClick = async (eventId) => {
    setId(eventId);
    await getMyEventById(eventId);
    await getEventCategory();
    onOpen();
  };

  //format DateTime
  const formatDateTime = (date) => {
    const d = new Date(date);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  //handle input change
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData({
        ...formData,
        poster: files[0],
      });
    } else if (name.startsWith("ticketCategories")) {
      const index = parseInt(name.match(/\d+/)[0]);
      const key = name.split(".")[1];

      setFormData((prevFormData) => {
        const updatedTicketCategories = [...prevFormData.ticketCategories];
        updatedTicketCategories[index] = {
          ...updatedTicketCategories[index],
          [key]: value,
        };
        return {
          ...prevFormData,
          ticketCategories: updatedTicketCategories,
        };
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  //Format Angka
  const formatAngka = (number) => {
    if (isNaN(number) || number === "") return "";
    return number.toLocaleString("id-ID");
  };

  const removeFormatting = (number) => {
    return number.replace(/[\.,]/g, "");
  };

  const getFormattedValue = (value) => {
    return formatAngka(value);
  };

  console.log("ini new category", priceQuota);
  console.log("ini form data", formData);

  return (
    <>
      <div className="flex h-screen ">
        <div className="hidden md:inline">
          <SidebarCreator />
        </div>
        <div className="flex flex-col flex-grow md:w-[1050px]">
          <HeaderCreator />
          <div className="mx-2 mt-4">
            <div className="flex-col bg-custom-blue-1 bg-opacity-80 text-white rounded-xl p-3">
              <p className="font-bold">Event Saya</p>

              <div className="flex justify-center md:justify-starts">
                <div className="flex flex-wrap gap-2">
                  {events.map((events) => (
                    <div key={events.id}>
                      <Card className="md:w-[190px]">
                        <CardBody>
                          <div>
                            <img
                              src={events.poster}
                              className="w-full h-24 md:h-48 rounded-md object-cover"
                              alt="Event"
                            />
                          </div>
                          <div className="pt-3 flex">
                            <IoLocation color="blue" />
                            <p className="text-xs text-gray-500 ml-1 mb-0 truncate">
                              {events.city}
                            </p>
                          </div>
                          <p className="text-xs mb-2">{events.address}</p>
                          <p className="text-xs font-bold mb-0">
                            {events.name}
                          </p>
                          <p className="text-xs mb-0">
                            {" "}
                            Date : {new Date(events.date).toLocaleDateString()}
                          </p>
                          <p className="text-xs mb-2">
                            Creator : {events.creatorName}
                          </p>
                          <p className="font-bold text-sm mb-2">
                            {events.ticketCategories.length > 0
                              ? `Rp. ${events.ticketCategories[0].price.toLocaleString()}`
                              : "Price not available"}
                          </p>
                          <div className="">
                            <Button
                              className="w-full bg-custom-blue-2 text-white font-bold"
                              size="sm"
                              onPress={() => handleEditClick(events.id)}
                            >
                              Edit
                            </Button>
                          </div>
                        </CardBody>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
              <ModalContent>
                {(onclose) => (
                  <>
                    <ModalBody>
                      <p className="mb-0 font-bold">Update Event</p>
                      <div className="flex space-x-4">
                        <div className="space-y-2">
                          <div className="flex items-center pl-2 space-x-4">
                            <img
                              src={eventDetail.poster}
                              className="w-20 h-20 rounded-md object-cover"
                            />
                            <Input
                              name="poster"
                              type="file"
                              size="sm"
                              className="w-52"
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Input
                              name="name"
                              size="sm"
                              label="Nama Event"
                              defaultValue={eventDetail.name}
                              onChange={handleInputChange}
                            />
                            <Input
                              name="city"
                              size="sm"
                              label="Kota"
                              defaultValue={eventDetail.city}
                              onChange={handleInputChange}
                            />
                            <Input
                              name="address"
                              size="sm"
                              label="Alamat"
                              defaultValue={eventDetail.address}
                              onChange={handleInputChange}
                            />
                            <Input
                              name="description"
                              size="sm"
                              label="Deskripsi"
                              defaultValue={eventDetail.description}
                              onChange={handleInputChange}
                            />
                            <Input
                              name="linkMap"
                              size="sm"
                              label="Link Map"
                              defaultValue={eventDetail.linkMap}
                              onChange={handleInputChange}
                            />
                            <Input
                              name="date"
                              size="sm"
                              label="Tanggal Event"
                              defaultValue={formatDateTime(eventDetail.date)}
                              onChange={handleInputChange}
                            />
                            <Select
                              label="Kategori Event"
                              name="eventCategory"
                              placeholder={eventDetail.eventCategory}
                              value={formData.eventCategory}
                              onChange={handleInputChange}
                            >
                              {eventCategory.map((selectCategory) => (
                                <SelectItem
                                  key={selectCategory.id}
                                  value={selectCategory.id}
                                  className="-ml-4 -mb-2"
                                >
                                  {selectCategory.categoryName}
                                </SelectItem>
                              ))}
                            </Select>
                          </div>
                        </div>
                        <div className="pt-4 ">
                          <p className="text-sm font-bold">Tiket Kategori</p>
                          {eventDetail.ticketCategories.map((tcat, index) => (
                            <Card className="mb-2">
                              <CardBody
                                key={tcat.id}
                                title={tcat.name}
                                className="w-80 text-sm"
                              >
                                <p className="font-bold mb-1">{tcat.name}</p>
                                <div className="flex gap-1">
                                  <Input
                                    label="Harga"
                                    size="sm"
                                    defaultValue={tcat.price}
                                    name={`ticketCategories[${index}].price`}
                                    onChange={handleInputChange}
                                    onKeyDown={(e) => {
                                      if (e.key === "Backspace") {
                                        return;
                                      }
                                      if (!/[0-9]/.test(e.key)) {
                                        e.preventDefault();
                                      }
                                    }}
                                  />
                                  <Input
                                    label="Kuota"
                                    size="sm"
                                    defaultValue={tcat.quota}
                                    name={`ticketCategories[${index}].quota`}
                                    onChange={handleInputChange}
                                    onKeyDown={(e) => {
                                      if (e.key === "Backspace") {
                                        return;
                                      }
                                      if (!/[0-9]/.test(e.key)) {
                                        e.preventDefault();
                                      }
                                    }}
                                  />
                                </div>
                              </CardBody>
                            </Card>
                          ))}
                        </div>
                      </div>
                      <Button
                        onPress={onclose}
                        className="bg-custom-blue-3 text-white font-bold"
                        onClick={() => editMyEventById()}
                      >
                        Update
                      </Button>
                    </ModalBody>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default withLoading(CreatorMyEvent);
