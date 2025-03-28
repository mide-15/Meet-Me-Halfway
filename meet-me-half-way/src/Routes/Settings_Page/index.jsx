import { Helmet } from "react-helmet";
import Header from "../../components/Header";
import ProfileSettingSection from "./ProfileSettingSection";
import React from "react";

export default function ProfilesettingPage() {
  return (
    <>
      <Helmet>
        <title>Profile Settings - Update Your Account Details</title>
        <meta
          name="description"
          content="Manage your profile settings including name, email address, password, state, and city. Keep your account information up-to-date for a personalized experience."
        />
      </Helmet>
      <div className="flex w-full flex-col gap-2 bg-gray-50">
        <Header />
        
        {/* profile setting section *,
        <ProfileSettingSection />
      </div>
    </>
  );
}
