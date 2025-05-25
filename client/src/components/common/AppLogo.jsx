import React from "react";

const AppLogo = () => {
  return (
    <div className="flex items-center gap-1 md:gap-2">
      <div className="w-[45px] h-[45px]">
        <svg
          width="45"
          height="45"
          viewBox="0 0 60 60"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <circle cx="30" cy="30" r="23" fill="#4F46E5" />
          <path
            d="M25 35L29 36L34 31C34 31 34.5 30.5 34 30L30 26C29.5 25.5 29 26 29 26L24 31L25 35Z"
            fill="white"
          />
          <path d="M25 35L24.5 37.5L27 37L25 35Z" fill="#E0E7FF" />
        </svg>
      </div>
      <span className="text-lg font-bold text-gray-900 dark:text-white">
        WellBlog
      </span>
    </div>
  );
};

export default AppLogo;
