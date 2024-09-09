import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { BASE_URL } from "../service/constants";

const PictureUploadComponent = ({ token, onPictureUpdated }) => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const handleUploadClick = () => {
    document.getElementById("profilePictureInput").click();
  };

  const updateProfilePicture = async () => {
    if (!profilePicture) return;

    try {
      const formDataPicture = new FormData();
      formDataPicture.append("profile", profilePicture);

      const resProfilePicture = await axios.post(
        `${BASE_URL}/api/creator/profilepicture`,
        formDataPicture,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const pathValue = resProfilePicture.data.data.path;
      onPictureUpdated(pathValue);
      setProfilePicture(null);
      setError(null)
      alert(
        "Profile picture updated successfully:",
        resProfilePicture.data.message
      );
    } catch (error) {
      setError(error);
      console.log("Error updating profile picture:", error);
    }
  };

  return (
    <div className="flex flex-col my-4">
      {profilePicture ? (
        <div className="flex gap-2">
          <Button className="w-1/2 h-10" onClick={updateProfilePicture}>
            Save
          </Button>
          <Button
            className="w-1/2 h-10 bg-red-600 text-white font-bold "
            onClick={() => setProfilePicture(null)}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <>
          <Input
            type="file"
            id="profilePictureInput"
            name="profilePicture"
            className="hidden"
            onChange={handleFileChange}
          />
          <Button className="w-full h-10" onClick={handleUploadClick}>
            Upload Picture
          </Button>
        </>
      )}
      {error && <p className="text-red-600 mt-2">{error.message}</p>}
    </div>
  );
};

export default PictureUploadComponent;
