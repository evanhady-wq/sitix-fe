import React, { useEffect, useState } from "react";
import { withLoading } from "../hoc/withLoading";
import HeaderAdmin from "../components/HeaderAdmin";
import SidebarAdmin from "../components/SidebarAdmin";
import { Button } from "@nextui-org/react";
import Logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../service/constants";
import { isWithinInterval } from 'date-fns';
import Chart from 'chart.js/auto'
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Title, Tooltip, Legend);
const AdminDashboard = () =>{
const navigate = useNavigate();
  const [admin, setAdmin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [creators, setCreators] = useState([]);
  const [eventSoldTicket, setEventSoldTicket] = useState([]);
  const [eventCategories, setEventCategories] = useState([]);
  const [events, setEvents] = useState(null);
  const [eventCounts, setEventCounts] = useState([]);
  const [eventCategory, setEventCategory] = useState([]);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [activeCustomers, setActiveCustomers] = useState(0);
  const [inactiveCustomers, setInactiveCustomers] = useState(0);
  const [totalCreators, setTotalCreators] = useState(0);
  const [activeCreators, setActiveCreators] = useState(0);
  const [inactiveCreators, setInactiveCreators] = useState(0);
  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  function convertToMonthIndonesia(monthNumber) {
    const monthIndonesia = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    return monthIndonesia[monthNumber - 1];
  }
  const dataCustomerPie = {
    labels: ['Not Active','Active'],
    datasets: [
      {
        label: 'Jumlah Customer',
        data: [inactiveCustomers, activeCustomers],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const optionCustomerPie = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Status Akun Customer',
      },
    },
  };
  const dataCreatorPie = {
    labels: ['Not Active','Active'],
    datasets: [
      {
        label: 'Jumlah Creator',
        data: [inactiveCreators, activeCreators],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const getEventsForMonth = (events, year, month) => {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    
    return events.filter(event =>
      isWithinInterval(new Date(event.date), { start: startDate, end: endDate })
    ).length;
  };
  
  const year = currentDate.getFullYear();
  const months = ['September', 'Oktober', 'November', 'Desember'];

  useEffect(() => {
    if (events) {
      const counts = months.map((month, index) => {
        const monthIndex = currentDate.getMonth() + index;
        return getEventsForMonth(events, year, monthIndex);
      });
      setEventCounts(counts);
    }
  }, [events]);
  
  const dataEventPerMonthLine = {
    labels: months,
    datasets: [
      {
        label: 'Jumlah Event',
        data: eventCounts,
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };
  
  const optionEventPerMonthLine = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Jumlah Event Diselenggarakan Berdasarkan Bulan',
      },
    },
  };

  const optionCreatorPie = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Status Akun Creator',
      },
    },
  };

  const dataChoosedEventCatBar = {
    labels: eventCategories.map((evCat)=>{return evCat.categoryName}),
    datasets: [
      {
        label: 'Jumlah Event',
        data: eventCategories.map((evCat)=>{return evCat.eventCount}),
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const optionChoosedEventCatBar = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Top Kategori Event Periode Bulan '+convertToMonthIndonesia(currentDate.getMonth() + 1)+' '+currentDate.getFullYear(),
      },
    },
  };

  const dataEventWithSoldTicketBar = {
    labels: eventSoldTicket.map((ev)=>{return ev.name}),
    datasets: [
      {
        label: 'Jumlah Penjualan Tiket',
        data: eventSoldTicket.map((ev)=>{return ev.totalTicketCatSoldTicket}),
        backgroundColor: [
          'rgba(75, 192, 192, 1)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const optionEventWithSoldTicketBar = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Top Penjualan Tiket Periode Bulan '+convertToMonthIndonesia(currentDate.getMonth() + 1)+' '+currentDate.getFullYear(),
      },
    },
  };

  const dataCreatorEventBar = {
    labels: creators.map((creator)=>{return creator.name}),
    datasets: [
      {
        label: 'Jumlah Event',
        data: creators.map((creator)=>{return creator.eventCount}),
        backgroundColor: [
          'rgba(153, 102, 255, 1)',
        ],
        borderColor: [
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const optionCreatorEventBar = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Top Creator Periode Bulan '+convertToMonthIndonesia(currentDate.getMonth() + 1)+' '+currentDate.getFullYear(),
      },
    },
  };
  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token_admin");

      if (!token) {
        navigate('/signin');
        return;
      }

      const response = await axios.get(`${BASE_URL}/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data=response.data.data;
      setAdmin(data);
    } catch (error) {
      setError(`Failed to fetch admin profile: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
    fetchCreator();
    fetchCustomer();
    analyticsCreator();
  }, []);

  const fetchEventCategory = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token_admin");

      if (!token) {
        navigate('/signin');
        return;
      }

      const response = await axios.get(`${BASE_URL}/api/eventcategory/get`);
      setEventCategory(response.data.data);
      return response.data.data;
    } catch (error) {
      setError(`Failed to fetch event category data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchCreator = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token_admin");

      if (!token) {
        navigate('/signin');
        return;
      }

      const response = await axios.get(`${BASE_URL}/api/creator`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data=response.data.data;
      setTotalCreators(data.length);
      const inactive = data.filter(creator => creator.isDeleted).length;
      const active = data.filter(creator => !creator.isDeleted).length;

      setActiveCreators(active);
      setInactiveCreators(inactive);
    } catch (error) {
      setError(`Failed to fetch creator data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomer = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token_admin");

      if (!token) {
        navigate('/signin');
        return;
      }

      const response = await axios.get(`${BASE_URL}/api/customer`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data=response.data.data;
      setTotalCustomers(data.length);
      const inactive = data.filter(customer => customer.isDeleted).length;
      const active = data.filter(customer => !customer.isDeleted).length;

      setActiveCustomers(active);
      setInactiveCustomers(inactive);
    } catch (error) {
      setError(`Failed to fetch customer data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchCreators=async()=>{
    setLoading(true);
      try {
          const token = localStorage.getItem("token_admin");
    
          if (!token) {
            navigate('/signin');
            return;
          }
        const creatorResponse = await axios.get(`${BASE_URL}/api/creator`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const creatorData = creatorResponse.data.data;
        return creatorData;
      } catch (err) {
        setError(err);
      } finally {
      setLoading(false);
    }
  }

  const fetchEvents=async()=>{
    setLoading(true);
    try {
      const eventResponse = await axios.get(`${BASE_URL}/api/event/allevent`);
      const eventData = eventResponse.data.data;
      return eventData;
    } catch (err) {
      setError(err);
    } finally {
    setLoading(false);
  }
  }

  const analyticsCreator=async()=>{
    const creatorData = await fetchCreators();
    const eventData = await fetchEvents();
    const eventCategoryData=await fetchEventCategory();
    const filteredEvents = eventData.filter(event =>
            isWithinInterval(new Date(event.date), { start: startDate, end: endDate })
          );
          const eventWithSoldTicket=filteredEvents.map((event)=>{
            const ticketCategories=event.ticketCategories;
            const ticketCategoriesQuota=ticketCategories.map((ticketCat)=>{
              const ticketCatSoldTicket=ticketCat.quota-ticketCat.availableTicket;
              return ticketCatSoldTicket;
            })
            const totalTicketCatSoldTicket=ticketCategoriesQuota.reduce((accumulator, currentValue) => {
              return accumulator + currentValue;
            }, 0);
            return { ...event, totalTicketCatSoldTicket };
          })

          // const eventWithMonetazion=filteredEvents.map((event)=>{

          // })
          const creatorsWithEventCount = creatorData.map(creator => {
            const eventCount = filteredEvents.filter(event => event.creatorId === creator.id).length;
            return { ...creator, eventCount };
          });
          const eventCategoryWithEventCount=eventCategoryData.map(eventcategory=>{
            const eventCount = filteredEvents.filter(event => event.eventCategoryId === eventcategory.id).length;
            return {...eventcategory, eventCount};
          });
          creatorsWithEventCount.sort((a, b)=>b.eventCount - a.eventCount);
          eventCategoryWithEventCount.sort((a, b)=>b.eventCount - a.eventCount);
          let limitEventCategories=eventCategoryWithEventCount;
          if(eventCategoryWithEventCount.length>5){
            limitEventCategories=eventCategoryWithEventCount.slice(0,5);
          }
          let limitCreators=creatorsWithEventCount;
          if(creatorsWithEventCount.length>5){
            limitCreators=creatorsWithEventCount.slice(0,5);
          }
          eventWithSoldTicket.sort((a, b)=>b.totalTicketCatSoldTicket - a.totalTicketCatSoldTicket);
          let limitEventWithSoldTicket=eventWithSoldTicket;
          if(eventWithSoldTicket.length>5){
            limitEventWithSoldTicket=eventWithSoldTicket.slice(0,5);
          }
          setCreators(limitCreators);
          setEventCategories(limitEventCategories);
          setEvents(eventData);
          setEventSoldTicket(limitEventWithSoldTicket);
  }

    return (
        <>
         {loading ? (
        <p></p>
      ) : (
        <div className="flex h-screen ">
          <div className="hidden md:inline">
            <SidebarAdmin />
          </div>
          <div className="flex flex-col flex-grow">
          <HeaderAdmin />
          <div className=" mx-4 mt-4 text-2xl">
          <p className="font-bold">Selamat Datang, {admin.username}</p>
          <p className="font-bold">Anda Berada Dalam Halaman Dashboard Admin SiTix</p>
          </div>
          <div className="flex flex-row flex-wrap">
          <div className="w-[270px] md:w-[550px] flex-col bg-opacity-80 text-white mx-4 mt-4 rounded-xl p-3" style={{backgroundColor: "#1F316F"}}>
              <div className="flex-row justify-between md:flex">
                <div className="mt-1">
                  <p className="text-xl">
                    Jumlah Creator Yang Terdaftar
                  </p>
                </div>
                <div className="text-5xl">
                  {totalCustomers}
                </div>
              </div>
            </div>
            <div className="w-[270px] md:w-[550px] flex-col bg-opacity-80 text-white mx-4 mt-4 rounded-xl p-3" style={{backgroundColor: "#1F316F"}}>
              <div className="flex-row justify-between md:flex">
                <div className="mt-1">
                  <p className="text-xl">
                    Jumlah Customer Yang Terdaftar
                  </p>
                </div>
                <div className="text-5xl">
                  {totalCustomers}
                </div>
              </div>
            </div>
            <div className="w-[270px] md:w-[550px] flex-col bg-white bg-opacity-80 text-white mx-4 mt-4 rounded-xl shadow-lg p-3">
            <Pie data={dataCreatorPie} options={optionCreatorPie} width={400} height={400}/>
            </div>
            <div className="w-[270px] md:w-[550px] flex-col bg-white bg-opacity-80 text-white mx-4 mt-4 rounded-xl shadow-lg p-3">
            <Pie data={dataCustomerPie} options={optionCustomerPie} width={400} height={400} />
            </div>
            <div className="w-[270px] md:w-[550px] flex-col bg-white bg-opacity-80 text-white mx-4 mt-4 rounded-xl shadow-lg p-3">
            <Line data={dataEventPerMonthLine} options={optionEventPerMonthLine} width={400} height={250} />
            </div>
            <div className="w-[270px] md:w-[550px] flex-col bg-white bg-opacity-80 text-white mx-4 mt-4 rounded-xl shadow-lg p-3">
            <Bar data={dataChoosedEventCatBar} options={optionChoosedEventCatBar} width={400} height={250} />
            </div>
            <div className="w-[270px] md:w-[550px] flex-col bg-white bg-opacity-80 text-white mx-4 mt-4 rounded-xl shadow-lg p-3">
            <Bar data={dataCreatorEventBar} options={optionCreatorEventBar} width={400} height={250} />
            </div>
            <div className="w-[270px] md:w-[550px] flex-col bg-white bg-opacity-80 text-white mx-4 mt-4 rounded-xl shadow-lg p-3">
            <Bar data={dataEventWithSoldTicketBar} options={optionEventWithSoldTicketBar} width={400} height={250} />
            </div>
            </div>
          </div>
        </div>
      )}
        </>
    )
}

export default withLoading(AdminDashboard);