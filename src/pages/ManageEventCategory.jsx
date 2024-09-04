import React, { useEffect, useState, useMemo, useCallback } from "react";
import { DeleteIcon } from "../components/DeleteIcon";
import { SearchIcon } from "../components/SearchIcon";
import { EyeIcon } from "../components/EyeIcon";
import { EditIcon } from "../components/EditIcon";
import { PlusIcon } from "../components/PlusIcon";
import { withLoading } from "../hoc/withLoading";
import HeaderAdmin from "../components/HeaderAdmin";
import SidebarAdmin from "../components/SidebarAdmin";
import { Button,Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Tooltip} from "@nextui-org/react";
import Logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../service/constants";

const ManageEventCategory=()=>{
  const navigate = useNavigate();
    const [filterValue, setFilterValue] = useState("");
    const [showModalDelete, setShowModalDelete] = useState(null);
    const [showModalEdit, setShowModalEdit] = useState(null);
    const [showModalAdd, setShowModalAdd] = useState(null);
    const [eventCategory, setEventCategory] = useState([]);
    const [selectedEventCategory, setSelectedEventCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryValues, setCategoryValues] = useState({
    categoryName: ""
  });
  const [categoryIdEdit, setCategoryIdEdit] = useState("");
  const [categoryValuesEdit, setCategoryValuesEdit]=useState("");
  const [categoryErrors, setCategoryErrors] = useState({});
  const [categoryErrorsEdit, setCategoryErrorsEdit] = useState("");
  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setCategoryValues({
      ...categoryValues,
      [name]: value,
    });
  };
  const handleCategoryEditChange = (e) => {
    const { value } = e.target;
    setCategoryValuesEdit(value);
  };
  const validateCategory = () => {
    const errors = {};
    if (categoryValues.categoryName.length < 1)
      errors.categoryName = "Nama kategori tidak boleh kosong";
    setCategoryErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateCategoryEdit = () => {
    let errors = "";
    if (categoryValuesEdit.length < 1)
      errors = "Nama kategori tidak boleh kosong";
    setCategoryErrorsEdit(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (validateCategory()) {
    handleAdd(categoryValues);
    }
  };

  const handleCategoryEdit = (e) => {
    e.preventDefault();
    if (validateCategoryEdit()) {
        const updatedEventCategory={
            id : categoryIdEdit,
            categoryName : categoryValuesEdit
        }
    handleEdit(updatedEventCategory);
    }
  };
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;
    const pages = Math.ceil(eventCategory.length / rowsPerPage);
    const hasSearchFilter = Boolean(filterValue);
    const filteredItems = useMemo(() => {
      let filtered = [...eventCategory];
  
      if (hasSearchFilter) {
        filtered = filtered.filter((eventcategory) =>
          eventcategory.categoryName.toLowerCase().includes(filterValue.toLowerCase()),
        );
      }
      return filtered;
    }, [eventCategory, filterValue]);

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

          const response = await axios.get(`${BASE_URL}/api/eventcategory/get`);
    
        //   const response = await axios.get(`${BASE_URL}/api/eventcategory`, {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   });
          setEventCategory(response.data.data);
          console.log(response.data.data);
        } catch (error) {
          setError(`Failed to fetch event category data: ${error.message}`);
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []);

      useEffect(() => {
        setCategoryIdEdit(selectedEventCategory.id);
      }, [selectedEventCategory]);

      const editEventCategory=async(payload)=>{
        try {
            const token = localStorage.getItem("token_admin");
    
            if (!token) {
              navigate('/signin');
              return;
            }
            const response=await axios.put(`${BASE_URL}/api/eventcategory`, payload, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            return response.data.message;
          } catch (error) {
            console.error('Error updating data:', error.response.data.message);
            return error.response.data.message;
          }
      }

      const handleEdit=async(payload)=>{
        const message=await editEventCategory(payload);
        setShowModalEdit(false);
        setCategoryValuesEdit("");
        alert(message);
        fetchData();
      }

      const addEventCategory=async(payload)=>{
        try {
            const token = localStorage.getItem("token_admin");
    
            if (!token) {
              navigate('/signin');
              return;
            }
            const response=await axios.post(`${BASE_URL}/api/eventcategory`, payload, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            return response.data.message;
          } catch (error) {
            console.error('Error adding new data:', error.response.data.message);
            return error.response.data.message;
          }
      }

      const handleAdd=async(payload)=>{
        const message=await addEventCategory(payload);
        setShowModalAdd(false);
        setCategoryValues({
            categoryName: ""
          })
        alert(message);
        fetchData();
      }

      const handleDelete=async(id)=>{
        try {
            const token = localStorage.getItem("token_admin");
    
            if (!token) {
              navigate('/signin');
              return;
            }
            const response=await axios.delete(`${BASE_URL}/api/eventcategory/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            return response.data.message;
          } catch (error) {
            console.error('Error deleting event category:', error.response.data.message);
            return error.response.data.message;
          }
    }

      const handleModalDelete=async(id)=>{
        const message=await handleDelete(id);
        setShowModalDelete(false);
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
          <p className="font-bold">Daftar Event Category</p>
          <div className="flex justify-between gap-3 items-end mb-2">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1"
            }}
            placeholder="Cari berdasarkan nama kategori event..."
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <Button color="primary" endContent={<PlusIcon />} onPress={()=>setShowModalAdd(true)} className="text-medium">
              Tambah Data Baru
            </Button>
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
      <TableColumn style={{backgroundColor: "#1F316F", color:"white"}} key="id" className="text-lg">ID Kategori Event</TableColumn>
        <TableColumn style={{backgroundColor: "#1F316F", color:"white"}} key="name" className="text-lg">Nama Kategori</TableColumn>
        <TableColumn style={{backgroundColor: "#1F316F", color:"white"}} key="action" className="text-lg">Action</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"Data Tidak Ditemukan"} items={cells}>
        {(item) => (
          <TableRow key={item.id}>
            <TableCell className="text-medium">{item.id}</TableCell>
            <TableCell className="text-medium">{item.categoryName}</TableCell>
            <TableCell>
            <div className="relative flex items-center gap-4">
            <Tooltip color="gray" content="Edit">
              <span className="text-lg text-gray-500 cursor-pointer active:opacity-50" onClick={() => {
                        setShowModalEdit(true);
                        setSelectedEventCategory(item);
                    }}>
                <EditIcon className="h-7 w-7" />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete">
              <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => {
                        setShowModalDelete(true);
                        setSelectedEventCategory(item);
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
      {showModalAdd ? (
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
                    Tambah Event Category
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-4 flex-auto">
                        <Input
                          name="categoryName"
                          label="Input Nama Kategori"
                          size="lg"
                          value={categoryValues.categoryName}
                          onChange={handleCategoryChange}
                          status={categoryErrors.categoryName ? "error" : ""}
                        />
                        {categoryErrors.categoryName && (
                          <p className="text-red-500 mt-2 text-sm">
                            {categoryErrors.categoryName}
                          </p>
                        )}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-4 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                        setShowModalAdd(false);
                        setCategoryValues({
                            categoryName: ""
                          });
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-white bg-green-500 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleCategorySubmit}
                  >
                    Tambah
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {showModalEdit ? (
        <>
          <div
            className="justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none text-left mt-36"
          >
            <div className="relative w-96 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-3 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-xl font-semibold">
                    Edit Event Category
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-4 flex-auto">
                    <Input
                        name="categoryId"
                        label="ID"
                        size="lg"
                        value={categoryIdEdit}
                        disabled
                        className="mb-3"
                    />
                        <Input
                          name="categoryName"
                          label="Edit Nama Kategori"
                          size="lg"
                          value={categoryValuesEdit}
                          onChange={handleCategoryEditChange}
                          status={categoryErrorsEdit ? "error" : ""}
                        />
                        {categoryErrorsEdit && (
                          <p className="text-red-500 mt-2 text-sm">
                            {categoryErrorsEdit}
                          </p>
                        )}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-4 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                        setShowModalEdit(false);
                        setCategoryValuesEdit("");
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-white bg-green-500 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleCategoryEdit}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {showModalDelete ? (
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
                    Hapus Event Category
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-4 flex-auto">
                <p>Anda yakin akan menghapus kategori {selectedEventCategory.categoryName}?</p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-4 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModalDelete(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-white bg-red-500 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleModalDelete(selectedEventCategory.id)}
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

export default withLoading(ManageEventCategory)