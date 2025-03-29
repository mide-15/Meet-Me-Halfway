import { Text } from "../../components/Text/index";
import React from "react";

export default function ProfileInformationSection() {
  return (
    <div className="h-[912px] rounded-[10px] bg-[url(/images/img_group_54.png)] bg-cover bg-no-repeat px-8 py-24 md:h-auto md:py-5 sm:p-5">
      <div className="mb-[408px] flex flex-col items-start">
        <Text size="md" as="p" className="text-[40px] font-normal md:text-[38px] sm:text-[36px]">
          Name
        </Text>
        <Text as="p" className="mt-3 text-[16px] font-normal !text-black-900_66">
          Email Address
        </Text>
        <Text
          size="md"
          as="p"
          className="mt-16 text-[32px] font-normal leading-[48px] md:text-[30px] sm:text-[28px]"
        >
          State
        </Text>
        <Text
          size="md"
          as="p"
          className="mt-16 text-[32px] font-normal leading-[48px] md:text-[30px] sm:text-[28px]"
        >
          City
        </Text>
      </div>
    </div>
  );
}
