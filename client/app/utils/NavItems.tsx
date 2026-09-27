// utils/NavItems.tsx
import Link from "next/link";
import React from "react";

export const navItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Policy",
    url: "/policy",
  },
  {
    name: "FAQ",
    url: "/faq",
  },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex">
        {navItemsData &&
          navItemsData.map((i, index) => (
            <Link href={`${i.url} `} key={index} passHref>
              <span
                className={`${
                  activeItem === index
                    ? "dark:text-[#37a39a] text-[crimson]" /* 👈 Fixed Colors */
                    : "dark:text-white text-black"
                } text-[18px] px-6 font-Poppins font-[400]`}
              >
                {i.name}
              </span>
            </Link>
          ))}
      </div>
      
      {/* Mobile Navigation */}
      {isMobile && (
        <div className="800px:hidden mt-5">
          <div className="w-full text-center py-6">
              <Link href={"/"} passHref>
              </Link>
          </div>
            {navItemsData &&
              navItemsData.map((i, index) => (
                <Link href={i.url} key={index} passHref>
                  <span
                    className={`${
                      activeItem === index
                        ? "dark:text-[#37a39a] text-[crimson]" 
                        : "dark:text-white text-black"
                    } block text-[18px] px-6 py-5 font-Poppins font-[400]`}
                  >
                    {i.name}
                  </span>
                </Link>
              ))}
        </div>
      )}
    </>
  );
};

export default NavItems;