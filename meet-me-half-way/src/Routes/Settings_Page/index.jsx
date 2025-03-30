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
        <header className="flex h-[104px] items-center justify-end rounded-t1-[10px] rounded-tr-[10px] bg-[url(/public/images/img_group_56.png)] bg-cover bg-no-repeat px-[34px] py-5 md:h-auto sm:px-5"> 
          <Button shape="square" className="min-w-[168px] self-end px-[34px] sm:px-5">
            Edit
          </Button>
        </header>
        
        {/* profile setting section *,
        <ProfileSettingSection />
      </div>
    </>
  );
}
