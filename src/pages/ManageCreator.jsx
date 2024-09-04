import React, { useEffect, useState, useMemo, useCallback } from "react";
import { DeleteIcon } from "../components/DeleteIcon";
import { SearchIcon } from "../components/SearchIcon";
import { EyeIcon } from "../components/EyeIcon";
import { ChevronDownIcon } from "../components/ChevronDownIcon";
import { withLoading } from "../hoc/withLoading";
import HeaderAdmin from "../components/HeaderAdmin";
import SidebarAdmin from "../components/SidebarAdmin";
import { Button,Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Tooltip, Chip,DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem} from "@nextui-org/react";
import Logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../service/constants";
const ManageCreator=()=>{
  const navigate = useNavigate();
    const statusOptions = [
        {name: "Active", uid: "false"},
        {name: "Not Active", uid: "true"}
      ];
      function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
    const [filterValue, setFilterValue] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [showModal, setShowModal] = useState(null);
    const [creators, setCreators] = useState([]);
    const [selectedCreator, setSelectedCreator] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;
    const pages = Math.ceil(creators.length / rowsPerPage);
    const hasSearchFilter = Boolean(filterValue);
    const filteredItems = useMemo(() => {
      let filtered = [...creators];
  
      if (hasSearchFilter) {
        filtered = filtered.filter((creator) =>
          creator.name.toLowerCase().includes(filterValue.toLowerCase()),
        );
      }
      if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
        filtered = filtered.filter((creator) =>
          Array.from(statusFilter).includes(creator.isDeleted.toString()),
        );
      }
      return filtered;
    }, [creators, filterValue, statusFilter]);

    const cells = useMemo(() => {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;
  
      return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);
    const onSearchChange = useCallback((value) => {
        if (value) {
          setFilterValue(value);
          setPage(1);
        } else {
          setFilterValue("");
        }
      }, []);
      const fetchData = async () => {
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
          setCreators(response.data.data);
          console.log(response.data.data);
        } catch (error) {
          setError(`Failed to fetch creator data: ${error.message}`);
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []);

      const handleDelete=async(id)=>{
        try {
            const token = localStorage.getItem("token_admin");
    
            if (!token) {
              navigate('/signin');
              return;
            }
            const response=await axios.delete(`${BASE_URL}/api/creator/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            return response.data.message;
          } catch (error) {
            console.error('Error deleting creator:', error.response.data.message);
            return error.response.data.message;
          }
    }

      const handleModalDelete=async(id)=>{
        const message=await handleDelete(id);
        setShowModal(false);
        alert(message);
        fetchData();
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
          <p className="font-bold">Daftar Creator</p>
          <div className="flex justify-between gap-3 items-end mb-2">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%] mb-2",
              inputWrapper: "border-1"
            }}
            placeholder="Cari berdasarkan nama..."
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
           <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat" className="text-medium">
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
              className="-ml-8 -mb-4"
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            </div>
              <Table 
      bottomContent={
        <div className="flex w-full justify-center p-0 m-0">
          <Pagination
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader>
      <TableColumn style={{backgroundColor: "#1F316F", color:"white"}} key="id" className="text-lg">ID Creator</TableColumn>
        <TableColumn style={{backgroundColor: "#1F316F", color:"white"}} key="name" className="text-lg">Nama</TableColumn>
        <TableColumn style={{backgroundColor: "#1F316F", color:"white"}} key="phone" className="text-lg">No Telepon</TableColumn>
        <TableColumn style={{backgroundColor: "#1F316F", color:"white"}} key="status" className="text-lg">Status</TableColumn>
        <TableColumn style={{backgroundColor: "#1F316F", color:"white"}} key="action" className="text-lg">Action</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"Data Tidak Ditemukan"} items={cells}>
        {(item) => (
          <TableRow key={item.id}>
            <TableCell className="text-medium">{item.id}</TableCell>
            <TableCell className="text-medium">{item.name}</TableCell>
            <TableCell className="text-medium">{item.phone}</TableCell>
            <TableCell>
      {item.isDeleted ? (
        <Chip className="capitalize" color="danger" size="sm" variant="flat">
        Not Active
        </Chip>
      ) : (<Chip className="capitalize" color="success" size="sm" variant="flat">
        Active
        </Chip>)}
          </TableCell>
            <TableCell>
            <div className="relative flex items-center gap-4">
            <Tooltip color="danger" content="Delete">
              <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => {
                        setShowModal(true);
                        setSelectedCreator(item);
                    }}>
                <DeleteIcon className="h-7 w-7" />
              </span>
            </Tooltip>
          </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
          </div>
          </div>
        </div>
      )}
      {showModal ? (
        <>
          <div
            className="justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none text-left mt-36"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-3 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-xl font-semibold">
                    Hapus Creator
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-4 flex-auto">
                <p>Anda yakin akan menghapus creator atas nama {selectedCreator.name}?</p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-4 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-white bg-red-500 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleModalDelete(selectedCreator.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
        </>
      )
}
export default withLoading(ManageCreator);