import React from "react";
import "../App.css";
import Header from "../components/Header/Header";
import Profile from "../components/Profile/Profile";

const ProfilePage = () => {
  return (
    <div className="body">
      <Header />
      <Profile />
    </div>
  );
};

export default ProfilePage;
