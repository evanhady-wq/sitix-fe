import { Button, Card, CardBody, Input, Tab, Tabs } from "@nextui-org/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { withLoading } from "../hoc/withLoading";
import axios from "axios";
import { BASE_URL } from "../service/constants";

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [customerValues, setCustomerValues] = useState({
    email: "",
  });

  const [customerErrors, setCustomerErrors] = useState({});
  const navigate = useNavigate();

  const validateCustomer = () => {
    const errors = {};
    if (!customerValues.email.includes("@")) errors.email = "Email tidak valid";
    setCustomerErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomerValues({
      ...customerValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateCustomer()) {
      alert("Recovery link has been sent to your email");
      try {
        setLoading(true);

        const params = new URLSearchParams();
        params.append("email", customerValues.email);

        const response = await axios.post(
          `${BASE_URL}/api/auth/forgot`,
          params,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div className="flex mt-16 md:mt-0 mx-3 md:items-center justify-center h-screen">
        <Card className=" w-[600px] h-[350px]">
          <CardBody>
            <h1 className="font-bold text-2xl pt-4">Forgot Password</h1>
            <div className="font-semibold">
              <Card shadow="none">
                <CardBody>
                  <p>Email</p>
                  <div className="flex-row space-y-8">
                    <Input
                      name="email"
                      placeholder="Alamat Email"
                      size="lg"
                      value={customerValues.email}
                      onChange={handleCustomerChange}
                      status={customerErrors.email ? "error" : ""}
                      className="mt-4"
                    />
                    {customerErrors.email && (
                      <p className="text-red-500">{customerErrors.email}</p>
                    )}

                    <Button
                      className="bg-custom-blue-2 text-white font-bold text-lg w-full"
                      onClick={handleSubmit}
                    >
                      Lanjutkan
                    </Button>

                    <p
                      onClick={() => navigate("/signin")}
                      className="cursor-pointer"
                    >
                      Kembali
                    </p>
                  </div>
                </CardBody>
              </Card>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default ForgotPasswordPage;