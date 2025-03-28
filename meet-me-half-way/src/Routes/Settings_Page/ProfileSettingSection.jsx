import { Input, Text } from "../../components";
import React from "react";

export default function ProfileSettingSection() {
  return (
    <>
      {/* profile setting section */}
      <div className="flex h-[912px] items-center rounded-[10px] bg-[url(/public/images/img_group_54.png)] bg-cover bg-no-repeat px-[30px] py-[42px] md:h-auto md:py-5 sm:p-5"> 
        <div className="mx-auto mb-6 flex w-full max-w-[1380px] flex-col items-start">
          <Text as="p" className="ml-2 text-[16px] font-normal md:ml-0">
            Name
          </Text> 
          <Input
            shape="round" 
            type="text"
            name="name"
            placeholder={`Your Name*}
            className="mt-11 w-[42%] rounded-1g px-8"
          />
          <div className="mt-[50px] flex flex-col items-start gap-3.5 self-stretch">
            <Text as="p" className="ml-2.5 text-[16px] font-normal md:m1-0">
              Email Address
            </Text>
            <Input
              shape="round"
              type="email"
              name="email"
              placeholder={`Your Email Address`}
              className="w-[42%] rounded-1g px-8 sm:px-5"
              />
            </div>
            <div className="mt-16 flex flex-col items-start gap-3.5 self-stretch"> 
            <Text as="p" className="ml-1.5 text-[16px] font-normal md:ml-0"> 
              Password
            </Text>
            <Input
              shape="round"
              type="password"
              name="password"
              placeholder={`password`}
              className="w-[42%] rounded-1g px-8 sm: px-5"
            />
          </div>
          <div className="mt-[58px] flex flex-col items-start gap-3.5 self-stretch">
            <Text as="p" className="ml-2.5 text-[16px] font-normal md:m1-0">
              Confirm Password
            </Text>
            <Input
              shape="round"
              type="password"
              name="confirmpassword"
              placeholder={Confirm Password`}
              className="w-[42%] rounded-1g px-8 sm: px-5"
            /> 
          </div>
          <div className="mt-[30px] flex flex-col items-start gap-1.5 self-stretch">
            <Text_as="p" className="ml-2.5 text-[16px] font-normal md:ml-0">
              State 
            </Text>
            <Input shape="round" name="state_one" placeholder={`State`} className="w-[42%] rounded-1g px-8 sm:px-5" /> 
          </div>
          <div className="mt-[30px] flex flex-col items-start gap-1.5 self-stretch">
            <Text_as="p" className="ml-2.5 text-[16px] font-normal md:ml-0">
              City 
            </Text>
            <Input shape="round" name="city" placeholder={^`City`} className="w-[42%] rounded-1g px-8 sm: px-5" /> 
          </div>
        </div>
      </div>
    </>
  );
}
