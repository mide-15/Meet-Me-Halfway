import { Input, Text, Button } from "../../components";
import React from "react";

export default function ProfileSettingSection() {
  return (
    <>
      {/* profile setting section */}
      <div className="flex h-[912px] items-start rounded-[10px] bg -[url(/public/images/img_group_35.png)] bg-cover bg-no-repeat px-9 py-[70px] md:h-auto md:py-5 sm:p-5">
          <div className="mx-auto mb-[68px] flex w-full max-w-[1366px] items-center md:flex-col">
            <div className="flex flex-1 flex-col items-start md:self-stretch">
              <Text as="p" className="text-[16px] font-normal">
                Name
              </Text>
              <Input
                shape="round"
                type="text"
                name="name"
                placeholder={'Your Name'}
                className="mt w-[82%] rounded-lg px-3"
              />
              <div className="mt-[66px] flex flex-col items-start gap-9 self-stretch">
              <Text as="p" className="text-[16px] font-normal">
                Email Address
              </Text>
              <Input
                shape="round"
                type="email"
                name="email"
                placeholder={'Your Email Address'}
                className="mt w-[82%] rounded-lg px-3"
              />
              </div>
              <Text as="p" className="mt-[68px] text-[16px] font-normal">
                Password
              </Text>
              <Input
                shape="round"
                type="password"
                name="password"
                placeholder={'Password'}
                className="mt-[34px] w-[82%] rounded-lg px-3"
              />
              <Button shape="square" className="ml-[22px] mt-[170px] min-w-[168px] px3.5 sm:ml-0">
                Update Info
              </Button>
            </div>
            <div className="mb-[230px] flex w-[48%] flex-col items-start gap-[26px] self-end md:w-full">
              <Text as="p" className="text-[16px] font-normal">
                Confirm Password
              </Text>
              <Input
                shape="round"
                type="password"
                name="confirmpassword"
                placeholder={'Confirm Password'}
                className="mw-[90%] rounded-lg px-3"
              />
            </div>
          </div>
        </div>
      </>
    );
  }



