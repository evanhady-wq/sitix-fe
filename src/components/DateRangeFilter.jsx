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
      <div className="flex ml-4 space-x-2">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="dd-MMMM-yyyy"
          placeholderText="Pilih Tanggal Mulai"
          className="border p-2 rounded"
          locale={id}
          />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="dd-MMMM-yyyy"
          placeholderText="Pilih Tanggal Akhir"
          className="border p-2 rounded"
          minDate={startDate}
          locale={id}
        />
        <Button
          onClick={handleApply}
          className="bg-custom-blue-1 text-white"
          disabled={!startDate || !endDate}
        >
          Terapkan
        </Button>
      </div>
    );
  };
  
  export default DateRangeFilter;