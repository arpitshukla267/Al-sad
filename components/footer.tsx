"use client";

import Image from "next/image";

import { FaFacebookSquare } from "react-icons/fa";

import { LuInstagram } from "react-icons/lu";

import logoLight from "../public/assets/logo-light.svg";

import PrimaryBtn from "./shared/Buttons/PrimaryBtn";

import FooterList from "./footer-list";

import { NAV_ITEMS } from "./header";

const FOOTER_NAV_ITEMS = [
  {
    heading: "Products",
    items: [
      { name: "Architectural fittings", path: "" },
      { name: "Fittings", path: "" },
      { name: "Tools", path: "" },
      { name: "Building Accessories", path: "" },
      { name: "Storage", path: "" },
      { name: "Adhesive", path: "" },
      { name: "Special Components", path: "" },
    ],
  },
  {
    heading: "Services",
    items: [
      { name: "Trading, Import", path: "" },
      { name: "Export Capabilities", path: "" },
      { name: "Trading, Import/Export Capabilities", path: "" },
    ],
    isHidden: true,
  },
  {
    heading: "Pages",
    items: NAV_ITEMS,
  },
];

const Footer = () => {
  return (
    <footer className="w-full bg-primary sm:pt-[64px] sm:pb-[80px]">
      <div className="flex justify-between gap-8 sm:gap-24 h-full w-full flex-wrap md:flex-nowrap px-6 md:px-16 lg:px-24">
        <div className="flex flex-col justify-between w-full items-start gap-5 sm:gap-0">
          <Image src={logoLight} alt="Logo" className="h-[115px] w-[155px]" />
          <div className="flex items-center gap-3 sm:gap-10">
            <FaFacebookSquare className="border-1 p-3 rounded-full size-12" />
            <LuInstagram className="border-1 p-3 rounded-full size-12" />
            <PrimaryBtn
              title="Get a consultation"
              styles="font-normal text-sm sm:hidden"
              onClick={() => {}}
            />
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 w-full">
          <div className="grid grid-flow-col auto-cols-auto gap-10 sm:gap-24">
            {FOOTER_NAV_ITEMS.map((nav, idx) => (
              <div className={`${nav.isHidden && "hidden sm:block"}`} key={idx}>
                <FooterList heading={nav.heading} items={nav.items} />
              </div>
            ))}
            <PrimaryBtn
              title="Get a consultation"
              styles="font-normal text-sm hidden sm:block"
              onClick={() => {}}
            />
          </div>
          <div className="flex items-end justify-between relative w-full">
            <div className="absolute -top-5 inset-0 w-11 h-[1px] bg-primary-green" />
            <div className="flex items-end justify-between w-full pr-10">
              <div className="space-y-1">
                <p className="text-sm">+1 891 989-11-91</p>
                <p>info@logoipsum.com</p>
              </div>
              <p className="text-xs font-secondary text-[#D3D8DE]">
                &copy; 2023 - Copyright
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
