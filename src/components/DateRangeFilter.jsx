import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@nextui-org/react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { FaCalendarAlt } from "react-icons/fa";

const DateRangeFilter = ({ onApply }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
  

    const handleApply = () => {
        onApply(startDate, endDate); // Pass both startDate and endDate
      };
  
    return (
      <div className="flex flex-col md:flex-row md:space-x-2 md:items-center gap-2 mx-2 md:mx-0 ">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="dd-MMMM-yyyy"
          placeholderText="Pilih Tanggal Mulai"
          className="border p-2 rounded-2xl w-full"
          locale={id}
          />
          <p className="pt-3 hidden md:inline">sd</p>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="dd-MMMM-yyyy"
          placeholderText="Pilih Tanggal Akhir"
          className="border p-2 rounded-2xl w-full"
          minDate={startDate}
          locale={id}
        />
        <Button
          onClick={handleApply}
          className="bg-custom-blue-2 text-white"
          disabled={!startDate || !endDate}
        >
          Terapkan
        </Button>
      </div>
    );
  };
  
  export default DateRangeFilter;