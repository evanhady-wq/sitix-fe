import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../service/constants";
import { Button, Input } from "@nextui-org/react";

const UserCard = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");

  const handleChangePassword = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token_creator");
      const response = await axios.put(
        `${BASE_URL}/api/auth/change-password`,
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (newPassword !== retypePassword) {
        setError("New Passwords do not match.");
        return;
      }

      if (response.data.statusCode === 200) {
        alert("Password successfully changed.");
        setIsChangingPassword(false);
        setOldPassword("");
        setNewPassword("");
        setRetypePassword("");
        setError(""); // Clear the error after successful submission
      } else {
        setError(response.data.message); // Display error message
      }
    } catch (error) {
      setError(`Failed to change password: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsChangingPassword(false);
    setOldPassword("");
    setNewPassword("");
    setRetypePassword("");
    setError(""); // Clear the error on cancel
  };

  return (
    <div className="flex-col p-3 w-[300px] md:w-[600px] bg-custom-blue-1 bg-opacity-80 text-white rounded-xl my-1">
      <p className="font-bold text-lg">User Info</p>
      {user ? (
        <div className="space-y-2">
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          {!isChangingPassword ? (
            <Button
              className="mt-2 bg-custom-blue-2 text-white font-bold"
              onClick={() => setIsChangingPassword(true)}
            >
              Change Password
            </Button>
          ) : (
            <div className="mt-2 space-y-2">

              <p>Change Your Password</p>
              {error && <p className="text-red-700 font-bold">{error}</p>}
              <Input
                type="password"
                label="Old Password"
                size="sm"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full h-10"
              />
              <Input
                type="password"
                size="sm"
                label="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full h-10"
              />
              <Input
                type="password"
                label="Re-type Password"
                size="sm"
                value={retypePassword}
                onChange={(e) => setRetypePassword(e.target.value)}
                className="w-full h-10"
              />
              <div className="flex gap-3">
                <Button
                  className="bg-custom-blue-2 text-white font-bold"
                  onClick={handleChangePassword}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save New Password"}
                </Button>
                <Button
                  className="bg-red-600 text-white font-bold "
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};

export default UserCard;
