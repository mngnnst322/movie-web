import React from "react";
import Image from "next/image";

export const Footer = () => {
  return (
    <div className="bg-indigo-700 flex w-full">
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
        <div className="flex gap-4">
          <div className="flex flex-col gap-4 ">
            <p>Contact Information</p>
            <div
              className="flex gap-2 justify-center items-center
            "
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.6666 4.66675L8.68658 8.46675C8.48077 8.5957 8.2428 8.66409 7.99992 8.66409C7.75704 8.66409 7.51907 8.5957 7.31325 8.46675L1.33325 4.66675M2.66659 2.66675H13.3333C14.0696 2.66675 14.6666 3.2637 14.6666 4.00008V12.0001C14.6666 12.7365 14.0696 13.3334 13.3333 13.3334H2.66659C1.93021 13.3334 1.33325 12.7365 1.33325 12.0001V4.00008C1.33325 3.2637 1.93021 2.66675 2.66659 2.66675Z"
                  stroke="#FAFAFA"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex flex-col gap-1">
                <p>Email:</p>
                <p>support@movieZ.com</p>
              </div>
            </div>
            <div
              className="flex gap-2 justify-center items-center
            "
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_2868_11510)">
                  <path
                    d="M14.6667 11.2802V13.2802C14.6675 13.4659 14.6294 13.6497 14.555 13.8198C14.4807 13.9899 14.3716 14.1426 14.2348 14.2681C14.0979 14.3937 13.9364 14.4892 13.7605 14.5487C13.5847 14.6082 13.3983 14.6303 13.2134 14.6136C11.1619 14.3907 9.19137 13.6897 7.46004 12.5669C5.84926 11.5433 4.48359 10.1777 3.46004 8.56689C2.33336 6.8277 1.6322 4.84756 1.41337 2.78689C1.39671 2.60254 1.41862 2.41673 1.4777 2.24131C1.53679 2.06589 1.63175 1.90469 1.75655 1.76797C1.88134 1.63126 2.03324 1.52203 2.20256 1.44724C2.37189 1.37245 2.55493 1.33374 2.74004 1.33356H4.74004C5.06357 1.33038 5.37723 1.44495 5.62254 1.65592C5.86786 1.86689 6.02809 2.15986 6.07337 2.48023C6.15779 3.12027 6.31434 3.74871 6.54004 4.35356C6.62973 4.59218 6.64915 4.8515 6.59597 5.10081C6.5428 5.35012 6.41928 5.57897 6.24004 5.76023L5.39337 6.60689C6.34241 8.27592 7.72434 9.65786 9.39337 10.6069L10.24 9.76023C10.4213 9.58099 10.6501 9.45746 10.8994 9.40429C11.1488 9.35112 11.4081 9.37053 11.6467 9.46023C12.2516 9.68593 12.88 9.84248 13.52 9.92689C13.8439 9.97258 14.1396 10.1357 14.3511 10.3852C14.5625 10.6348 14.6748 10.9533 14.6667 11.2802Z"
                    stroke="#FAFAFA"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
              <div className="flex flex-col gap-1">
                <p>Phone:</p>
                <p>+976 (11) 123-4567</p>
              </div>
            </div>
          </div>
          <p>Follow us </p>
          <p>Facebook Instagram. Twitter Youtube </p>
        </div>
      </div>
    </div>
  );
};
