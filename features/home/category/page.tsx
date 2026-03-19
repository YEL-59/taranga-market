"use client";

import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const Category = () => {
  const t = useTranslations("Category");

  const categories = [
    {
      key: "services" as const,
      // href: "/services",
      href: "/",
      bgColor: "bg-[#DCFCE7]",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M16 20V4C16 3.46957 15.7893 2.96086 15.4142 2.58579C15.0391 2.21071 14.5304 2 14 2H10C9.46957 2 8.96086 2.21071 8.58579 2.58579C8.21071 2.96086 8 3.46957 8 4V20"
            stroke="#16A34A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 6H4C2.89543 6 2 6.89543 2 8V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V8C22 6.89543 21.1046 6 20 6Z"
            stroke="#16A34A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      key: "job" as const,
      // href: "/jobs",
      href: "/",
      bgColor: "bg-[#DBEAFE]",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g clipPath="url(#clip0_26076_4585)">
            <path
              d="M22.875 14.625H20.625V13.5C20.625 12.8797 20.1203 12.375 19.5 12.375H15.75C15.4268 12.375 15.1369 12.5141 14.9314 12.7331L10.875 12.0574V11.1176C11.994 10.4681 12.75 9.25949 12.75 7.87499H13.125C13.7453 7.87499 14.25 7.37024 14.25 6.74999C14.25 6.12974 13.7453 5.62499 13.125 5.62499H12.945L13.1505 5.14836C13.3404 4.7069 13.4227 4.22667 13.3908 3.74717C13.3588 3.26767 13.2135 2.80261 12.9668 2.39024C12.6519 1.86347 12.1836 1.44545 11.6246 1.19211L10.578 0.715488C9.34238 0.152988 7.82776 0.317613 6.74138 1.13174L6.15001 1.57499C5.55801 1.73021 5.04893 2.10983 4.73213 2.63399C4.5291 2.9706 4.41469 3.35318 4.39961 3.746C4.38452 4.13882 4.46925 4.52905 4.64588 4.88024L5.01826 5.62499H4.87501C4.25476 5.62499 3.75001 6.12974 3.75001 6.74999C3.75001 7.37024 4.25476 7.87499 4.87501 7.87499H5.25001C5.25001 9.25949 6.00601 10.4681 7.12501 11.1176V12.0574L2.56838 12.8167C1.95474 12.9173 1.39698 13.2332 0.995059 13.7077C0.593136 14.1822 0.373322 14.7843 0.37501 15.4061V23.25C0.37501 23.3494 0.414518 23.4448 0.484845 23.5152C0.555171 23.5855 0.650553 23.625 0.75001 23.625H22.875C23.2886 23.625 23.625 23.2886 23.625 22.875V15.375C23.625 14.9614 23.2886 14.625 22.875 14.625Z"
              fill="#1D7E87"
            />
          </g>
          <defs>
            <clipPath id="clip0_26076_4585">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      key: "realEstate" as const,
      // href: "/properties",
      href: "/",
      bgColor: "bg-[#DBEAFE]",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
            stroke="#2563EB"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 22V12H15V22"
            stroke="#2563EB"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      key: "products" as const,
      // href: "/products",
      href: "/",
      bgColor: "bg-[#FCE7F3]",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z"
            stroke="#DB2777"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 6H21"
            stroke="#DB2777"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10"
            stroke="#DB2777"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      key: "vehicles" as const,
      //  href: "/vehicles",
      href: "/",
      bgColor: "bg-[#FED7AA]",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M7 17C8.10457 17 9 16.1046 9 15C9 13.8954 8.10457 13 7 13C5.89543 13 5 13.8954 5 15C5 16.1046 5.89543 17 7 17Z"
            stroke="#EA580C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17 17C18.1046 17 19 16.1046 19 15C19 13.8954 18.1046 13 17 13C15.8954 13 15 13.8954 15 15C15 16.1046 15.8954 17 17 17Z"
            stroke="#EA580C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 15H3V11L6 5H18L21 11V15H19"
            stroke="#EA580C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 15H9"
            stroke="#EA580C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 8L7 11"
            stroke="#EA580C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18 8L17 11"
            stroke="#EA580C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-full container mx-auto">
        <h2 className="text-center font-[Inter] text-[36px] not-italic font-bold leading-[normal] mb-18">
          {t("title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 justify-center items-center">
          {categories.map((category) => (
            <Link
              key={category.key}
              href={category.href}
              className="border border-gray-300 p-5 rounded-lg hover:shadow-lg transition-shadow cursor-pointer text-center flex flex-col items-center justify-center h-full w-full"
            >
              <div
                className={`${category.bgColor} w-12 h-12 flex items-center justify-center text-center rounded-full mb-4`}
              >
                {category.icon}
              </div>
              <h1 className="text-[#374151] text-center font-inter text-[20px] font-medium leading-[24px]">
                {t(category.key)}
              </h1>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
