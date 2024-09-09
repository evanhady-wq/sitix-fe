import React, { useState } from "react";
import axios from "axios";
import { Button } from "@nextui-org/react";
import { BASE_URL } from "../service/constants";

const DeleteAccount = ({ onAccountDeleted }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirmDelete) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token_creator");
      const response = await axios.delete(
        `${BASE_URL}/api/creator/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Account successfully deleted.");
        onAccountDeleted();
      } else {
        setError("Failed to delete account.");
      }
    } catch (error) {
      setError(`Failed to delete account: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4">
      {error && <p className="text-red-700 font-bold">{error}</p>}
      <Button
        className="bg-red-600 text-white font-bold mt-4"
        onClick={handleDeleteAccount}
        disabled={loading}
      >
        {loading ? "Deleting..." : "Delete Account"}
      </Button>
    </div>
  );
};

export default DeleteAccount;
