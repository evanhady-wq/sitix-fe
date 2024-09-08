import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../service/constants";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const ResetPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const resetPassword = async (newPassword) => {
    const token = new URLSearchParams(window.location.search).get("token");

    try {
        const response = await axios.post(
            `${BASE_URL}/api/auth/reset?token=${token}`,
            newPassword,
            {
                headers: {
                    'Content-Type': 'text/plain',
                },
            }
        );
      console.log(response.data.message);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== retypePassword) {
      setError("Passwords do not match.");
      return;
    }
    resetPassword(newPassword);
    navigate("/signin")
  };

  return (
    <div className="flex mt-16 md:mt-0 mx-3 md:items-center justify-center h-screen">
      <Card className="w-[600px] h-[350px]">
        <CardBody>
          <h1 className="font-bold text-2xl pt-4">Reset Password</h1>
          <div className="font-semibold">
            <Card shadow="none">
              <CardBody>
                <p>New Password</p>
                <div className="flex-row space-y-8">
                  <Input
                    name="password"
                    type="password"
                    placeholder="New Password"
                    size="lg"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-4"
                  />
                   <Input
                    name="retypePassword"
                    type="password"
                    placeholder="Re-type Password"
                    size="lg"
                    value={retypePassword}
                    onChange={(e) => setRetypePassword(e.target.value)}
                    className="mt-4"
                  />
                  {error && (
                    <p className="text-red-500 mt-2">{error}</p>
                  )}
                  <Button
                    className="bg-custom-blue-2 text-white font-bold text-lg w-full"
                    onClick={handleSubmit}
                  >
                    Reset Password
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ResetPage;