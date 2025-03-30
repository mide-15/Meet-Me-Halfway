import { Helmet } from "react-helmet";
import { Button } from "../../components/ui/button"; // Ensure correct path
import ProfileInformationSection from "./ProfileInformationSection"; // Fixed import
import React from "react";

export default function ProfilePage() {
  return ( 
    <>
      <Helmet>
        <title>User Profile - Edit Your Personal Information</title> 
        <meta
          name="description"
          content="Access and edit your user profile. Update your name, email, and location details to ensure your personal information is current and accurate."
        />
      </Helmet>
      <div className="flex w-full flex-col gap-2 bg-gray-50">
        <header className="flex h-[104px] items-center justify-end rounded-tl-[10px] rounded-tr-[10px] bg-[url(/public/images/img_group_56.png)] bg-cover bg-no-repeat px-[34px] py-5 md:h-auto sm:px-5"> 
          <Button shape="square" className="min-w-[168px] self-end px-[34px] sm:px-5">
            Edit
          </Button>
        </header>
        
        {/* Profile information section */}
        <ProfileInformationSection />
      </div>
    </>
  );
}
