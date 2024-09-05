import React, { useEffect, useState } from "react";
import SidebarCreator from "../components/SidebarCreator";
import HeaderCreator from "../components/HeaderCreator";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
  useDisclosure,
  TimeInput,
} from "@nextui-org/react";
import {
  FaMoneyBill1Wave,
  FaPenToSquare,
  FaPeopleGroup,
  FaTicket,
} from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { BASE_URL } from "../service/constants";
import axios from "axios";
import { withLoading } from "../hoc/withLoading";

const CreatorCreateEvent = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [ticketCategories, setTicketCategories] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [eventCategory, setEventCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: "",
    quota: "",
    price: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    eventCategory: "",
    description: "",
    city: "",
    address: "",
    linkMap: "",
    poster: "",
    date: "",
    ticketCategories: "",
  });

  //setDateTime
  const [dateTime, setDateTime] = useState("");
  const handleDateChange = (e) => {
    const date = e.target.value;
    const [currentDate, time] = dateTime.split(" ");
    const newDateTime = `${date} ${time || ""}`.trim();
    setDateTime(newDateTime);
  };

  const handleTimeChange = (time) => {
    const minute = String(time.minute).padStart(2, "0");
    const hour = String(time.hour).padStart(2, "0");
    const formattedTime = `${hour}:${minute}`;
    const [date] = dateTime.split(" ");
    const newDateTime = `${date || ""} ${formattedTime}`.trim();
    setDateTime(newDateTime);
    formData.date = newDateTime;
  };

  //get token
  const token = localStorage.getItem("token_creator");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  //fetch Category
  const getEventCategory = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/eventcategory/get`,
        config
      );
      setEventCategory(response.data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEventCategory();
  }, []);

  //Validate Form
  const validateForm = () => {
    if (
      !formData.name ||
      !formData.eventCategory ||
      !formData.description ||
      !formData.city ||
      !formData.address ||
      !formData.linkMap ||
      !formData.date
    ) {
      alert("lengkapi form yang belum diisi");
      return false;
    }
    console.log("field sudah terisi");
    return true;
  };

  //Create New Event
  const handleCreateEvent = async () => {
    try {
      if (!validateForm()) {
        return;
      }

      const eventData = {
        ...formData,
        ticketCategories,
      };

      console.log(formData);

      const eventResponse = await axios.post(
        `${BASE_URL}/api/event`,
        eventData,
        config
      );
      console.log("Sukses create event", eventResponse.data.message);

      if (formData.poster) {
        const formDataImg = new FormData();
        formDataImg.append("poster", formData.poster);

        const imageResponse = await axios.post(
          `${BASE_URL}/api/event/poster/${eventResponse.data.data.id}`,
          formDataImg,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Image berhasil diupload", imageResponse.data.message);
        alert("Event Berhasil Dibuat");
        window.location.reload();
      }
    } catch (error) {
      console.error(
        "Error saat membuat event atau mengunggah gambar",
        error.message
      );
    }
  };

  //Input Change Tiket Category
  const handleInputChangeCategory = (e) => {
    const { name, value } = e.target;

    if (name === "quota" || name === "price") {
      const rawValue = removeFormatting(value);
      const numberValue = rawValue ? parseInt(rawValue, 10) : "";

      setNewCategory((prevCategory) => ({
        ...prevCategory,
        [name]: numberValue,
      }));
    } else {
      setNewCategory((prevCategory) => ({
        ...prevCategory,
        [name]: value,
      }));
    }
  };

  //Input Change Event
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  //Add Tiket Kategori
  const handleAddCategory = () => {
    if (editingIndex !== null) {
      setTicketCategories((prevCategories) =>
        prevCategories.map((category, index) =>
          index === editingIndex ? newCategory : category
        )
      );
      setEditingIndex(null);
    } else {
      setTicketCategories((prevCategories) => [...prevCategories, newCategory]);
      console.log(ticketCategories);
    }
    setNewCategory({ name: "", quota: "", price: "" });
  };

  //Delete Tiket Kategori
  const handleDeleteCategory = (index) => {
    setTicketCategories((prevCategories) =>
      prevCategories.filter((_, i) => i !== index)
    );
    window.confirm("Apakah anda yakin?");
  };

  //Edit Tiket Kategori
  const handleEditCategory = (index) => {
    setNewCategory(ticketCategories[index]);
    setEditingIndex(index);
    onOpen();
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

  return (
    <>
      <div className="flex h-screen">
        <div className="hidden md:inline">
          <SidebarCreator />
        </div>

        <div className="flex h-screen flex-col flex-grow">
          <HeaderCreator />

          <div className="flex justify-center md:justify-start">
            <div className="mx-2 mt-4 md:flex md:space-x-4">

            <div
              className="flex-col w-[300px] md:w-fit bg-custom-blue-1 bg-opacity-80 
              text-white rounded-xl p-3 h-fit"
            >
              <p className="font-bold">Create Event</p>
              <div className="space-y-1 md:w-[500px] text-right">
                <Input
                  label="Nama Event"
                  placeholder="Masukan nama event"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />

                <Select
                  label="Kategori Event"
                  placeholder="Pilih Kategori Event"
                  name="eventCategory"
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

                <div className="md:flex space-y-1 md:space-y-0 gap-2">
                  <Input
                    label="Kota"
                    placeholder="Masukan lokasi kota event"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                  <Input
                    label="Alamat"
                    placeholder="Masukan alamat event"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>

                <Input
                  label="Link Map"
                  placeholder="Masukan link lokasi event"
                  name="linkMap"
                  value={formData.linkMap}
                  onChange={handleInputChange}
                />

                <div className="flex gap-2">
                  <Input
                    label="Tanggal Event"
                    type="date"
                    name="date"
                    onChange={handleDateChange}
                  />
                  <TimeInput
                    label="Waktu Event"
                    name="time"
                    hourCycle={24}
                    onChange={handleTimeChange}
                  />
                </div>

                <Input
                  label="Deskripsi"
                  placeholder="Deskripsi Event"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />

                <div className="flex items-center gap-2">
                  <p className="text-sm pt-2">Poster event:</p>
                  <Input
                    type="file"
                    className="w-[200px]"
                    size="sm"
                    id="files"
                    name="poster"
                    onChange={handleInputChange}
                  />
                </div>

                <Button
                  className="bg-custom-blue-2 text-white font-bold mt-2 mx-2 w-fit"
                  onClick={handleCreateEvent}
                  size="sm"
                >
                  Create
                </Button>

                <Button
                  className="mt-2 bg-custom-blue-2 font-bold text-white"
                  onPress={onOpen}
                  size="sm"
                >
                  Buat Tiket Kategori
                </Button>
              </div>
            </div>

            <div className="bg-white w-[260px] md:w-full overflow-y-auto">
              <p className="font-bold mb-2 text-sm">
                Kategori Tiket yang Sudah Dibuat:
              </p>
              {ticketCategories.length === 0 ? (
                <p className="text-sm">Belum ada kategori tiket.</p>
              ) : (
                <ul className="px-0">
                  {ticketCategories.map((category, index) => (
                    <li
                      key={index}
                      className="border-2 rounded-3xl p-3 mb-2 border-custom-blue-1"
                    >
                      <div className="flex gap-2 justify-end">
                        <FaTrash
                          onClick={() => handleDeleteCategory(index)}
                          className="cursor-pointer"
                        />
                        <FaPenToSquare
                          onClick={() => handleEditCategory(index)}
                          className="cursor-pointer"
                        />
                      </div>
                      <p className="font-semibold mb-0 flex items-center gap-2">
                        <FaTicket />
                        {category.name}
                      </p>
                      <p className="mb-0 text-sm flex items-center gap-2">
                        <FaPeopleGroup />
                        Quota : {formatAngka(category.quota)} Tiket
                      </p>
                      <p className="mb-0 text-sm flex items-center gap-2">
                        <FaMoneyBill1Wave /> Price :{" "}
                        {formatAngka(category.price)},-
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            </div>

          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Buat Kategori Tiket
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Nama Kategori"
                  name="name"
                  placeholder="Masukan nama kategori"
                  value={newCategory.name}
                  onChange={handleInputChangeCategory}
                />
                <Input
                  label="Quota"
                  type="text"
                  name="quota"
                  placeholder="Masukan quota"
                  value={getFormattedValue(newCategory.quota)}
                  onChange={handleInputChangeCategory}
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
                  label="Harga"
                  type="text"
                  name="price"
                  placeholder="Masukan harga"
                  value={getFormattedValue(newCategory.price)}
                  onChange={handleInputChangeCategory}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace") {
                      return;
                    }
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  className="bg-gray-400 text-white"
                  onClick={() => {
                    setNewCategory({ name: "", quota: "", price: "" });
                    setEditingIndex(null);
                    onClose();
                  }}
                >
                  Batal
                </Button>
                <Button
                  className="bg-custom-blue-2 text-white"
                  onClick={() => {
                    handleAddCategory();
                    onClose();
                  }}
                >
                  {editingIndex !== null ? "Update" : "Buat"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default withLoading(CreatorCreateEvent);
