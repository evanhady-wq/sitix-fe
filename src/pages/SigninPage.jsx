import React, { useState } from "react";
import HeaderLogo from "../components/HeaderLogo";
import LogoDummy from "../assets/LogoDummy1.jpeg";
import { Button, Card, CardBody, Input, Tab, Tabs } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { withLoading } from "../hoc/withLoading";
import { BASE_URL } from "../service/constants";
import axios from "axios";

const SigninPage = () => {
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

  const validateCustomer = () => {
    const errors = {};
    if (customerValues.username.length < 4)
      errors.username = "Username minimal 4 karakter";
    if (customerValues.password.length < 8)
      errors.password = "Password minimal 8 karakter";
    setCustomerErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateCreator = () => {
    const errors = {};
    if (creatorValues.username.length < 6)
      errors.username = "Username minimal 6 karakter";
    if (creatorValues.password.length < 5)
      errors.password = "Password minimal 5 karakter";
    setCreatorErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const loginCustomer = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${BASE_URL}/api/auth/login`,
        values
      );
      localStorage.setItem("token", response.data.data.token)
      console.log(response.data.data)
      navigate('/')
    } catch (error) {
      alert("Login gagal. Silakan cek kembali username dan password Anda.");
    } finally {
      setLoading(false);
    }
  };

  const loginCreator = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${BASE_URL}/api/auth/login`,
        values
      );
      localStorage.setItem("token_creator", response.data.data.token)
      console.log(response.data.data)
      navigate('/creator/dashboard')
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
                          type="password"
                          value={customerValues.password}
                          onChange={handleCustomerChange}
                          status={customerErrors.password ? "error" : ""}
                        />
                        {customerErrors.password && (
                          <p className="text-red-500">
                            {customerErrors.password}
                          </p>
                        )}
                        <p className="font-bold text-custom-blue-3 pt-4">
                          Lupa Password ?
                        </p>
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
                          type="password"
                          value={creatorValues.password}
                          onChange={handleCreatorChange}
                          status={creatorErrors.password ? "error" : ""}
                        />
                        {creatorErrors.password && (
                          <p className="text-red-500">
                            {creatorErrors.password}
                          </p>
                        )}
                        <p className=" text-custom-blue-3 pt-4 ">
                          Lupa Password ?
                        </p>
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
