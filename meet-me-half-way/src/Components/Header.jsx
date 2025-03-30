import { Button } from "../components/ui/button"; // Adjust path as needed
import { Img } from "../components/ui/img"; // Ensure correct path
import React from "react";

export default function Header({ className, ...props }) {
  return ( 
    <header
      {...props}
      className={`${className} flex items-center h-[104px] md:h-auto p-5 rounded-tl-[10px] rounded-tr-[10px] bg-[url(/public/images/img_group_56.png)] bg-cover bg-no-repeat`}
    >
      <div className="mx-auto flex w-full max-w-[1376px] items-center justify-between gap-5 self-end">
        <Img src="images/img_header_logo.svg" alt="Header logo" className="h-[48px] w-[48px] object-contain" /> 
        <Button shape="square" className="min-w-[168px] px-6 sm:px-5">
          Update
        </Button>
      </div>
    </header>
  );
}
