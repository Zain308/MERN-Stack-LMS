import Image from "next/image";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";

import bannerImg from "../../public/assets/quirky.webp";
import profile1 from "../../public/assets/Black and White Doodle Style Abstract LinkedIn Profile Picture.png";
import profile2 from "../../public/assets/Pink Modern Facebook Profile Picture.png";
import profile3 from "../../public/assets/Red Circular Frame Modern Woman Facebook Profile Picture.png";

export default function Hero() {
  return (
    <section className="flex min-h-[calc(100vh-80px)] w-full flex-col items-center overflow-hidden lg:flex-row">
      {/* Left column */}
      <div className="relative z-10 flex w-full items-center justify-center pt-16 lg:w-1/2 lg:pt-0">
        <div className="hero_animation absolute h-[320px] w-[320px] rounded-full sm:h-[450px] sm:w-[450px] xl:h-[650px] xl:w-[650px]" />

        <Image
          src={bannerImg}
          alt="Learning Banner"
          priority
          sizes="(max-width: 1024px) 90vw, 50vw"
          className="relative z-10 h-auto w-[90%] max-w-[650px] object-contain"
        />
      </div>

      {/* Right column */}
      <div className="z-10 flex w-full flex-col items-center px-6 pb-16 pt-10 text-center lg:w-1/2 lg:items-start lg:px-12 lg:py-0 lg:text-left">
        <h1 className="font-Josefin text-4xl font-bold leading-tight text-[#000000c7] dark:text-white sm:text-5xl xl:text-6xl xl:leading-[70px]">
          Improve Your Online
          <br className="hidden lg:block" />
          Learning Experience
          <br className="hidden lg:block" />
          Better Instantly
        </h1>

        <p className="mt-4 mb-8 max-w-[650px] font-Josefin text-base font-medium text-[#000000ac] dark:text-[#edfff4]">
          We have 40K+ online courses and 500K+ registered students.
          Find your desired courses from them.
        </p>

        {/* Search bar */}
        <div className="relative mb-10 flex h-[50px] w-full max-w-[600px] items-center">
          <input
            type="search"
            placeholder="Search Courses..."
            aria-label="Search courses"
            className="h-full w-full rounded-l-md border border-gray-300 bg-white px-4 font-Josefin text-black outline-none placeholder:text-gray-500 focus:border-[#39c1f1] dark:border-none dark:bg-[#333333] dark:text-white dark:placeholder:text-[#ffffff80]"
          />

          <button
            type="button"
            aria-label="Search"
            className="flex h-full w-[60px] items-center justify-center rounded-r-md bg-[#39c1f1] transition-colors hover:bg-[#2fa3cc]"
          >
            <BiSearch className="text-white" size={24} />
          </button>
        </div>

        {/* Social proof */}
        <div className="flex items-center">
          <div className="flex shrink-0">
            <Image
              src={profile1}
              alt="Student 1"
              className="h-10 w-10 rounded-full border-2 border-[#1a1a24] object-cover"
            />

            <Image
              src={profile2}
              alt="Student 2"
              className="-ml-[15px] h-10 w-10 rounded-full border-2 border-[#1a1a24] object-cover"
            />

            <Image
              src={profile3}
              alt="Student 3"
              className="-ml-[15px] h-10 w-10 rounded-full border-2 border-[#1a1a24] object-cover"
            />
          </div>

          <p className="pl-4 font-Josefin text-sm font-semibold text-[#000000b3] dark:text-[#edfff4] sm:text-base">
            500K+ people already trust us.{" "}
            <Link
              href="/courses"
              className="text-[#20b837] hover:underline"
            >
              View Courses
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}