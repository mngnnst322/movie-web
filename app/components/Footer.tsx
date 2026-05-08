import React from "react";
import Image from "next/image";

export const Footer = () => {
  return (
    <div className="bg-indigo-700 flex w-full h-70">
      <div className="flex justify-around w-full  items-center ">
        <div>
          {" "}
          <div
            className=" flex  
          "
          >
            <Image
              width={16}
              height={16}
              className="w-4 h-4"
              src="/film.svg"
              alt=""
            />
            <p className="text-white flex items-center justify-center w-16 h-5">
              Movie Z{" "}
            </p>
          </div>
          <div>
            <p>© 2024 Movie Z. All Rights Reserved.</p>ss
          </div>
        </div>
        <div className="flex">
          <div>
            <p>Contact Information</p>
            <div>
              <p>Email:</p>
              <p>support@movieZ.com</p>
            </div>
            <div>
              <p>Phone:</p>
              <p>+976 (11) 123-4567</p>
            </div>
          </div>
          <p>Follow us </p>
          <p>Facebook Instagram. Twitter Youtube </p>
        </div>
      </div>
    </div>
  );
};
