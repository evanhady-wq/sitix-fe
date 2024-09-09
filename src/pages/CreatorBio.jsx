import React, { useState, useEffect } from "react";
import SidebarCreator from "../components/SidebarCreator";
import HeaderCreator from "../components/HeaderCreator";
import { Button, Input, Textarea, Switch } from "@nextui-org/react";
import { BASE_URL } from "../service/constants";
import axios from "axios";
import { withLoading } from "../hoc/withLoading";
import UserCard from "../components/UserCard";

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
  const [profilePicture, setProfilePicture] = useState("");

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

  if (loading) return <p>Loading...</p>;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const handleSaveProfile = async () => {
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
      localStorage.setItem("path", resProfilePicture.data.data.path);
      const pathValue = localStorage.getItem("path");
      setFormData((prevFormData) => ({
        ...prevFormData,
        profilePicture: pathValue,
      }));

      const resEditProfile = await axios.put(
        `${BASE_URL}/api/creator/profile`,
        formData,
        config
      );
      console.log("Profile updated successfully:", resEditProfile.data.message);

      alert("Profile Berhasil Diupdate");
      setIsEditing(false);
      getProfile();
    } catch (error) {
      setError(error);
      console.log("Error Guys");
    }
  };

  return (
    <>
      <div className="flex h-screen">
        <div className="hidden md:inline">
          <SidebarCreator />
        </div>
        <div className="flex flex-col flex-grow">
          <HeaderCreator />

          <div className="mx-2 md:mx-4 mt-2 md:mt-4 flex justify-center gap-3">
            <div>
              <div className="flex-col p-3 w-[300px] md:w-[600px] bg-white text-black rounded-xl shadow-lg">
                <p className="font-bold text-xl mb-4">Ubah Biodata Diri</p>

                <div className="md:flex gap-4">
                  <div className="h-[150px] w-[150px] md:w-[200px] mb-3 md:mb-0">
                    {profile.profilePicture ? (
                      <img
                        src={profile.profilePicture}
                        alt="Profile Picture"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <img
                        src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png"
                        alt="Default Avatar"
                        className="w-full h-full object-cover rounded-full"
                      />
                    )}
                  </div>

                  <div className="space-y-2 md:space-y-4">
                    <Input
                      isDisabled={!isEditing}
                      label="Nama"
                      name="name"
                      defaultValue={profile.name}
                      onChange={handleInputChange}
                      className="md:w-72"
                    />
                    <Input
                      isDisabled={!isEditing}
                      label="Nomor HP"
                      name="phone"
                      defaultValue={profile.phone}
                      onChange={handleInputChange}
                      className="max-w-xs"
                    />
                    <Textarea
                      isDisabled={!isEditing}
                      label="Perkenalan"
                      name="introduction"
                      defaultValue={profile.introduction}
                      onChange={handleInputChange}
                      className="max-w-xs"
                    />
                    {isEditing && (
                      <div className="mt-4 flex">
                        <Input
                          type="file"
                          className="w-[200px]"
                          size="sm"
                          id="files"
                          name="profilePicture"
                          onChange={handleFileChange}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <Button
                    className="bg-gray-500 text-white w-full"
                    onClick={handleSaveProfile}
                  >
                    Pilih Foto
                  </Button>
                </div>
              </div>

              <div className="mt-2 space-y-2">
                {!isEditing ? (
                  <Button
                    className="bg-blue-500 text-white font-bold w-full"
                    onClick={() => setIsEditing(true)}
                  >
                    Ubah Kata Sandi
                  </Button>
                ) : (
                  <Button
                    className="bg-blue-500 text-white font-bold w-full"
                    onClick={handleSaveProfile}
                  >
                    Save
                  </Button>
                )}

                <Button className="bg-gray-200 text-black w-full">
                  PIN Tokopedia
                </Button>
                <Button className="bg-gray-200 text-black w-full">
                  Verifikasi Instan
                </Button>

                <div className="flex items-center justify-between mt-4">
                  <span>Safe Mode</span>
                  <Switch size="lg" />
                </div>
              </div>
            </div>
            <UserCard user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default withLoading(CreatorProfile);
