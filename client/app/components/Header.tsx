"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import NavItems from "../utils/NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import CustomModal from "../utils/CustomModel";

import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Verification from "./Auth/Verification";

import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import Image from "next/image";
import avatar from "../../public/assets/avatar.jpg";
import { useSession } from "next-auth/react";
import { useLogOutQuery, useSocialAuthMutation } from "../../redux/features/auth/authApi";
import toast from "react-hot-toast";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

export default function Header({
  activeItem,
  open,
  setOpen,
  route,
  setRoute,
}: Props) {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  // 2. Extract user from Redux state
  const { user } = useSelector((state: any) => state.auth);
  const { data } = useSession();
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
  const [logout,setLogout] = useState(false);
  
      const {} = useLogOutQuery(undefined,{
          skip: !logout ? true : false,
      });
      
  useEffect(() => {
    if (!user && data) {
      socialAuth({
        email: data?.user?.email,
        name: data?.user?.name,
        avatar: data?.user?.image,
      });
    }
    if(data === null){
      setLogout(true);
    }
  }, [data, user, socialAuth,setLogout]);

  useEffect(() => {
    if(data === null){
      if (isSuccess ) {
        toast.success("Login Successfully");
      }
  }
  }, [isSuccess]);

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleCloseSidebar = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setOpenSidebar(false);
    }
  };

  const openLoginModal = () => {
    setOpenSidebar(false);
    setRoute("Login");
    setOpen(true);
  };

  return (
    <header className="relative h-[80px] w-full">
      <div
        className={`left-0 top-0 z-[80] h-[80px] w-full border-b transition-all duration-500 dark:border-[#ffffff1c] ${
          active
            ? "fixed bg-white/90 shadow-xl backdrop-blur-md dark:bg-gray-900/90"
            : "absolute bg-white dark:bg-black"
        }`}
      >
        <div className="flex h-full w-full items-center justify-between px-4">
          <Link
            href="/"
            className="font-Poppins text-[25px] font-medium text-black dark:text-white"
          >
            ELearning
          </Link>

          <div className="flex items-center gap-4">
            {/* Desktop navigation */}
            <div className="hidden md:block">
              <NavItems activeItem={activeItem} isMobile={false} />
            </div>

            <ThemeSwitcher />

            {/* Mobile menu button */}
            <button
              type="button"
              aria-label="Open navigation menu"
              className="text-black dark:text-white md:hidden"
              onClick={() => setOpenSidebar(true)}
            >
              <HiOutlineMenuAlt3 size={27} />
            </button>

            {/* User Avatar or Login Icon */}
            {user ? (
              <Link href="/profile">
                <Image
                  src={user.avatar?.url || user.avatar || avatar}
                  alt="User Avatar"
                  width={30}
                  height={30}
                  className="cursor-pointer rounded-full object-cover"
                  style={{border:activeItem === 5 ? "2px solid #37a39a" : "none"}}
                />
              </Link>
            ) : (
              <HiOutlineUserCircle
                size={27}
                className="hidden md:block cursor-pointer text-black dark:text-white"
                onClick={() => {
                  setRoute("Login");
                  setOpen(true);
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      {openSidebar && (
        <div
          className="fixed inset-0 z-[999] bg-black/40"
          onClick={handleCloseSidebar}
        >
          <aside className="fixed right-0 top-0 z-[1000] h-screen w-[70%] max-w-[350px] bg-white shadow-xl dark:bg-gray-900">
            <NavItems activeItem={activeItem} isMobile />

            <button
              type="button"
              aria-label="Open login"
              className="ml-6 mt-4 text-black dark:text-white"
              onClick={openLoginModal}
            >
              <HiOutlineUserCircle size={27} />
            </button>

            <p className="absolute bottom-8 left-6 text-base text-black dark:text-white">
              Copyright © 2026 ELearning
            </p>
          </aside>
        </div>
      )}

      {/* Authentication modals */}
      {open && route === "Login" && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Login}
        />
      )}

      {open && route === "Sign-Up" && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={SignUp}
        />
      )}

      {open && route === "Verification" && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Verification}
        />
      )}
    </header>
  );
}
