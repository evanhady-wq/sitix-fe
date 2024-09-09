import {
  Card,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  CardBody,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { BASE_URL } from "../service/constants";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Logo3 from "../assets/Logo3.png";
import DateRangeFilter from "./DateRangeFilter";

const TransactionCard = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const {
    data,
    error: fetchError,
    loading: isLoading,
  } = useAxios(`${BASE_URL}/api/transaction`, "GET", token);

  useEffect(() => {
    if (data) {
      setTransactions(data);
      setFilteredTransactions(data);
      setError(null);
    } else if (fetchError) {
      setError(fetchError);
    }
    setLoading(isLoading);
  }, [data, fetchError, isLoading]);

  useEffect(() => {
    applyFilters();
  }, [selectedStatus, startDate, endDate]);

  const openModal = (transaction) => {
    setSelectedTransaction(transaction);
    setModalOpen(true);
  };

  const isExpired = (transactionDate) => {
    const transactionTime = new Date(transactionDate).getTime();
    const currentTime = new Date().getTime();
    const fifteenMinutes = 15 * 60 * 1000;
    return currentTime - transactionTime > fifteenMinutes;
  };

  const closeModal = () => {
    setSelectedTransaction(null);
    setModalOpen(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID").format(price);
  };

  const generatePDF = async (transactionId) => {
    const selectedTransaction = transactions.find(
      (trx) => trx.id === transactionId
    );
    if (!selectedTransaction) {
      console.error("Ticket not found for this transaction.");
      return;
    }

    const doc = new jsPDF();

    try {
      const response = await fetch(Logo3);
      const blob = await response.blob();
      const reader = new FileReader();

      reader.onloadend = function () {
        const base64Data = reader.result;
        doc.addImage(base64Data, "PNG", 10, 10, 50, 50);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(24);
        doc.setTextColor("#1F316F");
        doc.text("Si", 40, 50);

        doc.setTextColor("#5B99C2");
        doc.text("Tix", 48, 50);

        doc.setFontSize(12);
        doc.setTextColor("#000000");
        doc.text("Jl. Topaz No 7, Lowokwaru, Malang", 125, 50);

        doc.setFontSize(12);
        doc.setTextColor("#000000");
        doc.text(
          "* Dokumen ini sebagai bukti pengganti tiket yang sah",
          15,
          120
        );

        const transactionDetails = selectedTransaction.transactionDetails.map(
          (detail) => [
            detail.eventName,
            detail.ticketCategoryName,
            formatPrice(detail.ticketCategoryPrice),
            detail.quantity,
            formatPrice(detail.ticketCategoryPrice * detail.quantity),
            detail.transactionId,
          ]
        );

        doc.autoTable({
          startY: 70,
          head: [
            [
              "Event Name",
              "Ticket Category",
              "Price",
              "Quantity",
              "Total",
              "ID Transaksi",
            ],
          ],
          body: transactionDetails,
        });

        doc.output("dataurlnewwindow");
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Error loading image:", error);
    }
  };

  const applyFilters = (start, end) => {
    setStartDate(start);
    setEndDate(end);

    let filtered = transactions;

    if (selectedStatus && selectedStatus !== "ALL") {
      filtered = filtered.filter((trx) => trx.status === selectedStatus);
    }
    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
  
      endDate.setHours(23, 59, 59, 999);
  
      filtered = filtered.filter((trx) => {
        const transactionDate = new Date(trx.transactionDate);
        return transactionDate >= startDate && transactionDate <= endDate;
      });
  
      setFilteredTransactions(filtered);
    }
  };

  const filterTransactions = (status) => {
    setSelectedStatus(status);
  
    // Terapkan filter status langsung
    let filtered = transactions;
  
    if (status && status !== "ALL") {
      filtered = filtered.filter((trx) => trx.status === status);
    }
  
    // Terapkan filter tanggal jika ada
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
  
      end.setHours(23, 59, 59, 999);
  
      filtered = filtered.filter((trx) => {
        const transactionDate = new Date(trx.transactionDate);
        return transactionDate >= start && transactionDate <= end;
      });
    }
  
    setFilteredTransactions(filtered);
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-4xl mx-4 my-8">
        <p className="font-bold text-3xl text-center mb-4">Riwayat Transaksi</p>

        <div className="flex flex-col md:flex-row md:items-center mb-4 justify-between">
          <Dropdown>
            <DropdownTrigger>
              {selectedStatus == null ? (
                <Button className="text-white font-bold bg-custom-blue-2 w-full md:w-40">
                  Select Status
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </Button>
              ) : (
                <Button className="text-white font-bold bg-custom-blue-1 w-40">
                  {selectedStatus}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </Button>
              )}
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Filter Transactions"
              onAction={(key) => filterTransactions(key)}
            >
              <DropdownItem key="ALL">Semua</DropdownItem>
              <DropdownItem key="PAID">Dibayar</DropdownItem>
              <DropdownItem key="UNPAID">Belum Dibayar</DropdownItem>
              <DropdownItem key="CANCELLED">Dibatalkan</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <DateRangeFilter onApply={applyFilters} />
        </div>

        {filteredTransactions.length === 0 ? (
          <p className="text-center text-gray-500">No Transaction Found</p>
        ) : (
          <div className="space-y-4">
            {filteredTransactions.map((trx) => (
              <Card
                key={trx.id}
                className="shadow-xl p-6 flex flex-col space-y-4"
              >
                <CardBody>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex flex-row items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
                          />
                        </svg>
                        <p className="font-semibold text-lg mb-0 mx-2">
                          {trx.transactionDetails[0].eventName}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        {formatDate(trx.transactionDate)}
                      </p>
                      <p>
                        <strong>Total Price: </strong> Rp{" "}
                        {formatPrice(
                          trx.transactionDetails.reduce((total, detail) => {
                            return (
                              total +
                              detail.ticketCategoryPrice * detail.quantity
                            );
                          }, 0)
                        )}
                      </p>{" "}
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-semibold ${
                          trx.status === "PAID"
                            ? "text-green-500 text-2xl"
                            : trx.status === "CANCELLED"
                            ? "text-red-500 text-2xl"
                            : "text-orange-400 text-2xl"
                        }`}
                      >
                        {trx.status}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-end space-x-4">
                    <a
                      className="cursor-pointer text-custom-blue-2 no-underline"
                      onClick={() => openModal(trx)}
                    >
                      Lihat Detail Transaksi
                    </a>
                    <Modal
                      backdrop="transparent"
                      onOpenChange={onOpenChange}
                      isOpen={isModalOpen}
                      onClose={closeModal}
                    >
                      <ModalContent>
                        <ModalHeader>Detail Transaksi</ModalHeader>
                        <ModalBody>
                          {selectedTransaction &&
                            selectedTransaction.transactionDetails.map(
                              (detail) => (
                                <div
                                  key={detail.id}
                                  className="flex flex-col space-y-1 mb-4"
                                >
                                  <p className="font-medium text-base">
                                    {detail.eventName}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    Kategori: {detail.ticketCategoryName}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    Qty: {detail.quantity}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    Harga:{" "}
                                    {formatPrice(detail.ticketCategoryPrice)}
                                  </p>
                                </div>
                              )
                            )}
                        </ModalBody>
                        <ModalFooter>
                          <Button onClick={closeModal}>Tutup</Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>

                    {trx.status === "PAID" && (
                      <>
                        <Button
                          className="text-white font-bold bg-custom-blue-2"
                          onClick={() => generatePDF(trx.id)}
                        >
                          Unduh Invoice
                        </Button>
                        {/* <Button
                        color="primary"
                        onClick={() => goToViewTicket(trx.id)}
                      >
                        Lihat Tiket
                      </Button> */}
                      </>
                    )}

                    {trx.status === "UNPAID" &&
                      (isExpired(trx.transactionDate) ? (
                        <Button color="warning" size="lg" isDisabled>
                          Expired
                        </Button>
                      ) : (
                        trx.paymentUrl && (
                          <a
                            href={trx.paymentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button color="danger" size="lg">
                              Bayar
                            </Button>
                          </a>
                        )
                      ))}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionCard;
