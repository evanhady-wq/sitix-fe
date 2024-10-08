import React, { useState } from "react";
import HeaderLogo from "../components/HeaderLogo";
import LogoDummy from "../assets/LogoDummy1.jpeg";
import { Button, Card, CardBody, Input, Tab, Tabs } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { withLoading } from "../hoc/withLoading";
import { BASE_URL } from "../service/constants";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SigninPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [customerValues, setCustomerValues] = useState({
    username: "",
    password: "",
  });
  const [customerErrors, setCustomerErrors] = useState({});

  const [creatorValues, setCreatorValues] = useState({
    username: "",
    password: "",
  });
  const [creatorErrors, setCreatorErrors] = useState({});

  const [adminValues, setAdminValues] = useState({
    username: "",
    password: "",
  });
  const [adminErrors, setAdminErrors] = useState({});

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomerValues({
      ...customerValues,
      [name]: value,
    });
  };

  const handleCreatorChange = (e) => {
    const { name, value } = e.target;
    setCreatorValues({
      ...creatorValues,
      [name]: value,
    });
  };

  const handleAdminChange = (e) => {
    const { name, value } = e.target;
    setAdminValues({
      ...adminValues,
      [name]: value,
    });
  };

  const validateCustomer = () => {
    const errors = {};
    if (customerValues.username.length < 6)
      errors.username = "Username minimal 6 karakter";
    if (customerValues.password.length < 8)
      errors.password = "Password minimal 8 karakter";
    setCustomerErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateCreator = () => {
    const errors = {};
    if (creatorValues.username.length < 6)
      errors.username = "Username minimal 6 karakter";
    if (creatorValues.password.length < 8)
      errors.password = "Password minimal 8 karakter";
    setCreatorErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateAdmin = () => {
    const errors = {};
    if (adminValues.username.length < 6)
      errors.username = "Username minimal 6 karakter";
    if (adminValues.password.length < 8)
      errors.password = "Password minimal 8  karakter";
    setAdminErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const loginCustomer = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/api/auth/login`, values);
      console.log(response.data.data);
      const roleLogin = response.data.data.role.name;
      if (roleLogin === "CUSTOMER") {
        localStorage.setItem("token", response.data.data.token);
        navigate("/");
      } else {
        alert("Anda Bukan CUSTOMER, Tidak Dapat Login");
        navigate("/signin");
      }
    } catch (error) {
      alert("Login gagal. Silakan cek kembali username dan password Anda.");
    } finally {
      setLoading(false);
    }
  };

  const loginCreator = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/api/auth/login`, values);
      console.log(response.data.data);
      const roleLogin = response.data.data.role.name;
      if (roleLogin === "CREATOR") {
        localStorage.setItem("token_creator", response.data.data.token);
        navigate("/creator/dashboard");
      } else {
        alert("Anda Bukan CREATOR, Tidak Dapat Login");
        navigate("/signin");
      }
    } catch (error) {
      alert("Login gagal. Silakan cek kembali username dan password Anda.");
    } finally {
      setLoading(false);
    }
  };

  const loginAdmin = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/api/auth/login`, values);
      console.log(response.data.data);
      const roleLogin = response.data.data.role.name;
      if (roleLogin === "ADMIN") {
        localStorage.setItem("token_admin", response.data.data.token);
        navigate("/admin/dashboard");
      } else {
        alert("Anda Bukan ADMIN, Tidak Dapat Login");
        navigate("/signin");
      }
    } catch (error) {
      alert("Login gagal. Silakan cek kembali username dan password Anda.");
    } finally {
      setLoading(false);
    }
  };

  const handleCustomerSubmit = (e) => {
    e.preventDefault();
    if (validateCustomer()) {
      loginCustomer(customerValues);
    }
  };

  const handleCreatorSubmit = (e) => {
    e.preventDefault();
    if (validateCreator()) {
      loginCreator(creatorValues);
    }
  };

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    if (validateAdmin()) {
      loginAdmin(adminValues);
    }
  };

  return (
    <>
      <HeaderLogo />
      <div className="flex px-4 justify-center gap-8 h-screen">
        <div className="hidden md:flex">
          <img src={LogoDummy} className="w-[500px] h-[550px]" />
        </div>
        <div className="py-8 md:py-1  w-[500px]">
          <Card>
            <CardBody>
              <h1 className="font-bold text-2xl pt-4">Masuk</h1>
              <p className="text-md text-gray-600 mt-0">
                Silahkan Masuk akun SiTix kamu, atau klik Daftar Sekarang untuk
                mendaftar di SiTix
              </p>
              <div className="font-semibold">
                <Tabs size="lg" variant="underlined">
                  <Tab title="Customer">
                    <Card shadow="none">
                      <CardBody>
                        <p>Username</p>
                        <Input
                          name="username"
                          placeholder="Username Kamu"
                          size="lg"
                          value={customerValues.username}
                          onChange={handleCustomerChange}
                          status={customerErrors.username ? "error" : ""}
                        />
                        {customerErrors.username && (
                          <p className="text-red-500">
                            {customerErrors.username}
                          </p>
                        )}
                        <p className="pt-4">Password</p>
                        <Input
                          name="password"
                          placeholder="Password"
                          size="lg"
                          value={customerValues.password}
                          onChange={handleCustomerChange}
                          status={customerErrors.password ? "error" : ""}
                          type={isVisible ? "text" : "password"}
                          endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                              {isVisible ? (
                                <FaEye className="text-2xl text-default-400 pointer-events-none" />
                              ) : (
                                <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                              )}
                            </button>
                          }
                        />
                        {customerErrors.password && (
                          <p className="text-red-500">
                            {customerErrors.password}
                          </p>
                        )}
                        <span className="font-bold text-custom-blue-3 pt-4">
                          <p
                            onClick={() => navigate("/recovery")}
                            className="cursor-pointer"
                          >
                            Lupa Password?
                          </p>
                        </span>

                        <Button
                          className="bg-custom-blue-2 text-white font-bold text-lg"
                          onClick={handleCustomerSubmit}
                          disabled={loading}
                        >
                          {loading ? "Loading..." : "Lanjutkan"}
                        </Button>
                      </CardBody>
                    </Card>
                  </Tab>
                  <Tab title="Creator">
                    <Card shadow="none">
                      <CardBody className="">
                        <p>Username</p>
                        <Input
                          name="username"
                          placeholder="Username Kamu"
                          size="lg"
                          value={creatorValues.username}
                          onChange={handleCreatorChange}
                          status={creatorErrors.username ? "error" : ""}
                        />
                        {creatorErrors.username && (
                          <p className="text-red-500">
                            {creatorErrors.username}
                          </p>
                        )}
                        <p className="pt-4">Password</p>
                        <Input
                          name="password"
                          placeholder="Password"
                          size="lg"
                          value={creatorValues.password}
                          onChange={handleCreatorChange}
                          status={creatorErrors.password ? "error" : ""}
                          type={isVisible ? "text" : "password"}
                          endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                              {isVisible ? (
                                <FaEye className="text-2xl text-default-400 pointer-events-none" />
                              ) : (
                                <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                              )}
                            </button>
                          }
                        />
                        {creatorErrors.password && (
                          <p className="text-red-500">
                            {creatorErrors.password}
                          </p>
                        )}
                        <span className="font-bold text-custom-blue-3 pt-4">
                          <p
                            onClick={() => navigate("/recovery")}
                            className="cursor-pointer"
                          >
                            Lupa Password?
                          </p>
                        </span>

                        <Button
                          className="bg-custom-blue-2 text-white font-bold text-lg"
                          onClick={handleCreatorSubmit}
                          disabled={loading}
                        >
                          {loading ? "Loading..." : "Lanjutkan"}
                        </Button>
                      </CardBody>
                    </Card>
                  </Tab>
                  <Tab title="Admin">
                    <Card shadow="none">
                      <CardBody className="">
                        <p>Username</p>
                        <Input
                          name="username"
                          placeholder="Username Kamu"
                          size="lg"
                          value={adminValues.username}
                          onChange={handleAdminChange}
                          status={adminErrors.username ? "error" : ""}
                        />
                        {adminErrors.username && (
                          <p className="text-red-500">{adminErrors.username}</p>
                        )}
                        <p className="pt-4">Password</p>
                        <Input
                          name="password"
                          placeholder="Password"
                          size="lg"
                          value={adminValues.password}
                          onChange={handleAdminChange}
                          status={adminErrors.password ? "error" : ""}
                          type={isVisible ? "text" : "password"}
                          endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                              {isVisible ? (
                                <FaEye className="text-2xl text-default-400 pointer-events-none" />
                              ) : (
                                <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                              )}
                            </button>
                          }
                        />
                        {adminErrors.password && (
                          <p className="text-red-500">{adminErrors.password}</p>
                        )}

                        <span className="font-bold text-custom-blue-3 pt-4">
                          <p
                            onClick={() => navigate("/recovery")}
                            className="cursor-pointer"
                          >
                            Lupa Password?
                          </p>
                        </span>

                        <Button
                          className="bg-custom-blue-2 text-white font-bold text-lg"
                          onClick={handleAdminSubmit}
                          disabled={loading}
                        >
                          {loading ? "Loading..." : "Lanjutkan"}
                        </Button>
                      </CardBody>
                    </Card>
                  </Tab>
                </Tabs>
              </div>
            </CardBody>
            <div className="flex justify-center pb-8">
              <p>
                Belum punya akun ?{" "}
                <span
                  className="text-custom-blue-3 font-bold cursor-pointer"
                  onClick={() => navigate("/signup")}
                >
                  Daftar Sekarang
                </span>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default withLoading(SigninPage);
