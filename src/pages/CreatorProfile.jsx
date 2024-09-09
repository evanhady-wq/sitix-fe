import React, { useState, useEffect } from "react";
import SidebarCreator from "../components/SidebarCreator";
import HeaderCreator from "../components/HeaderCreator";
import { Button, Input, Textarea } from "@nextui-org/react";
import { BASE_URL } from "../service/constants";
import axios from "axios";
import { withLoading } from "../hoc/withLoading";
import PictureUploadComponent from "../components/PictureUpload";
import UserCard from "../components/UserCard"
import DeleteAccount from "../components/DeleteAccount";
const CreatorProfile = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState();
  const [user, setUser] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    introduction: "",
    profilePicture: "",
  });

  const token = localStorage.getItem("token_creator");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getProfile = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/creator/profile`, config);
      const resProfile = res.data.data;
      setProfile(resProfile);
      setFormData({
        name: resProfile.name,
        phone: resProfile.phone,
        introduction: resProfile.introduction,
        profilePicture: resProfile.profilePicture,
      });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/user`, config);
      setUser(res.data.data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    getProfile();
    getUser();
  }, []);

  const handlePictureUpdated = (newProfilePicture) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      profilePicture: newProfilePicture,
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      profilePicture: newProfilePicture,
    }));
  };

  const handleSaveProfile = async () => {
    try {
      const resEditProfile = await axios.put(
        `${BASE_URL}/api/creator/profile`,
        formData,
        config
      );
      console.log("Profile updated successfully:", resEditProfile.data.message);
      alert("Profile Berhasil Diupdate");
      setIsEditing(false);
      getProfile(); // Optional, if you want to refetch the entire profile
    } catch (error) {
      setError(error);
      console.log("Error saving profile:", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: profile.name,
      phone: profile.phone,
      introduction: profile.introduction,
      profilePicture: profile.profilePicture,
    });
  };

  const handleAccountDeleted = () => {
    localStorage.removeItem("token_creator");
    window.location.href = "/"; // Redirect ke halaman home atau halaman login setelah delete
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex h-screen">
      <div className="hidden md:inline">
        <SidebarCreator />
      </div>
      <div className="flex flex-col flex-grow">
        <HeaderCreator />
        <div className="mx-2 md:mx-4 mt-2 md:mt-4 flex justify-center">
          <div>
            <div className="flex-col p-5 w-[400px] md:w-[700px] md:h-[850px] bg-custom-blue-1 bg-opacity-80 text-white rounded-xl">
              <p className="font-bold text-3xl">Creator Profile</p>
              <div className="md:flex gap-4">
                <div className="h-[320px] md:w-[300px] mb-3 md:mb-0">
                  {profile.profilePicture ? (
                    <img
                      src={profile.profilePicture}
                      alt="Profile Picture"
                      className="w-full h-5/6 object-cover rounded-xl"
                    />
                  ) : (
                    <img
                      src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png"
                      alt="Default Avatar"
                      className="w-full h-5/6 object-cover rounded-xl"
                    />
                  )}
                  <PictureUploadComponent
                    token={token}
                    onPictureUpdated={handlePictureUpdated}
                  />
                </div>
                <div className="space-y-2 md:space-y-4 md:w-96">
                  <Input
                    disabled={!isEditing}
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        name: e.target.value,
                      }))
                    }
                    css={{ maxWidth: "20rem" }}
                  />
                  <Input
                    disabled={!isEditing}
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        phone: e.target.value,
                      }))
                    }
                    css={{ maxWidth: "10rem" }}
                  />
                  <Textarea
                    disabled={!isEditing}
                    label="Introduction"
                    name="introduction"
                    value={formData.introduction}
                    onChange={(e) =>
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        introduction: e.target.value,
                      }))
                    }
                    css={{ maxWidth: "20rem" }}
                  />
                  <div className="flex gap-4 my-4 justify-center">
                    {!isEditing ? (
                      <Button
                        className="bg-custom-blue-2 text-white font-bold w-full"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit Profile
                      </Button>
                    ) : (
                      <>
                        <Button
                          className="bg-custom-blue-2 text-white font-bold w-5/6"
                          onClick={handleSaveProfile}
                        >
                          Save
                        </Button>
                        <Button
                          className="bg-red-600 text-white font-bold w-5/6"
                          onClick={handleCancel}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <UserCard user={user}/>
            </div>
            {/* <DeleteAccount onAccountDeleted={handleAccountDeleted} />           */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withLoading(CreatorProfile);
