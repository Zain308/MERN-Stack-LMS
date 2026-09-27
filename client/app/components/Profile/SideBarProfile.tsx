import Image from "next/image";
import React, { FC } from "react";
import avatarDefault from "../../../public/assets/avatar.jpg";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Link from "next/link";

type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logOutHandler: any;
};

const SideBarProfile: FC<Props> = ({
  user,
  active,
  avatar,
  setActive,
  logOutHandler,
}) => {
  const imageSrc =
    user.avatar || avatar ? user.avatar.url || avatar : avatarDefault;

  return (
    <div className="w-full">
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 1 ? "dark:bg-[#ffffff1d] bg-white" : "bg-transparent"} hover:bg-[#ffffff1d] rounded-[5px]`}
        onClick={() => setActive(1)}
      >
        <div className="relative w-[30px] h-[30px] shrink-0">
          <Image
            src={imageSrc}
            alt="avatar"
            width={30}
            height={30}
            className="w-[30px] h-[30px] cursor-pointer rounded-full object-cover"
          />
        </div>
        {/* Changed from 800px:block hidden to block so it shows up for testing */}
        <h5 className="pl-2 block font-Poppins dark:text-white text-black text-base whitespace-nowrap">
          My Account
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer rounded-[5px] ${
          active === 2 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        } hover:bg-[#ffffff1d]`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine
          size={20}
          className="dark:text-white text-black shrink-0"
        />
        <h5 className="pl-2 block font-Poppins dark:text-white text-black whitespace-nowrap">
          Change Password
        </h5>
      </div>

      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer rounded-[5px] ${
          active === 3 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        } hover:bg-[#ffffff1d]`}
        onClick={() => setActive(3)}
      >
        <SiCoursera size={20} className="dark:text-white text-black shrink-0" />
        <h5 className="pl-2 block font-Poppins dark:text-white text-black whitespace-nowrap">
          Enrolled Courses
        </h5>
      </div>

      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer rounded-[5px] ${
          active === 3 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        } hover:bg-[#ffffff1d]`}
        onClick={() => setActive(3)}
      >
        <SiCoursera size={20} className="dark:text-white text-black shrink-0" />
        <h5 className="pl-2 block font-Poppins dark:text-white text-black whitespace-nowrap">
          Enrolled Courses
        </h5>
      </div>

      {
        user.role === "admin" && (
          <Link
            className={`w-full flex items-center px-3 py-4 cursor-pointer rounded-[5px] ${
              active === 6 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
            } hover:bg-[#ffffff1d]`}
            href={"/admin"}
          >
            <MdOutlineAdminPanelSettings
              size={20}
              className="dark:text-white text-black shrink-0"
            />
            <h5 className="pl-2 block font-Poppins dark:text-white text-black whitespace-nowrap">
              Admin Dashboard
            </h5>
          </Link>
        )
      }

      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer rounded-[5px] ${
          active === 4 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        } hover:bg-[#ffffff1d]`}
        onClick={() => logOutHandler()}
      >
        <AiOutlineLogout
          size={20}
          className="dark:text-white text-black shrink-0"
        />
        <h5 className="pl-2 block font-Poppins dark:text-white text-black whitespace-nowrap">
          Log Out
        </h5>
      </div>
    </div>
  );
};

export default SideBarProfile;
