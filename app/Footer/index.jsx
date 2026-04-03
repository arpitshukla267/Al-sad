"use client";

import Image from "next/image";
import { FaFacebookSquare } from "react-icons/fa";
import { LuInstagram } from "react-icons/lu";
import logoLight from "../../public/assets/logo-light.svg";

import PrimaryBtn from "../shared/Buttons/PrimaryBtn";
import FooterList from "./FooterList";
import { NAV_ITEMS } from "../Header";

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
    <footer className="w-full bg-primary pt-10 pb-14 sm:pt-[64px] sm:pb-[80px]">
      {/* Container to maintain max-width on desktop while spanning full width */}
      <div className="w-full px-6 md:px-16 lg:px-24 mx-auto">
        
        {/* MOBILE LAYOUT - Matches Mobile Screenshot */}
        <div className="flex flex-col gap-12 sm:hidden">
          {/* Top: Links in 2 columns */}
          <div className="grid grid-cols-2 gap-8">
            <FooterList 
              heading={FOOTER_NAV_ITEMS[0].heading} 
              items={FOOTER_NAV_ITEMS[0].items} 
            />
            <FooterList 
              heading={FOOTER_NAV_ITEMS[2].heading} 
              items={FOOTER_NAV_ITEMS[2].items} 
            />
          </div>

          {/* Bottom: Split row for Identity and Action/Contact */}
          <div className="flex justify-between items-end">
            {/* Identity Column (Left) */}
            <div className="flex flex-col gap-4">
              <Image 
                src={logoLight} 
                alt="Logo" 
                className="h-[80px] w-[110px]" 
              />
              <p className="text-[10px] text-[#A0AABA] font-secondary leading-none">
                &copy; 2023 &mdash; Copyright
              </p>
            </div>

            {/* Actions/Contact Column (Right) */}
            <div className="flex flex-col items-end gap-5">
              <PrimaryBtn
                title="Book a Consultant"
                styles="bg-[#04724d] hover:bg-[#035a3d] text-white text-[14px] font-semibold px-5 py-2.5 rounded-full"
                onClick={() => {}}
              />
              <div className="flex gap-5">
                <FaFacebookSquare className="text-white size-6 cursor-pointer" />
                <LuInstagram className="text-white size-6 cursor-pointer" />
              </div>
              <div className="text-right space-y-0.5">
                <p className="text-[13px] text-white font-secondary">+1 891 989-11-91</p>
                <p className="text-[13px] text-white font-secondary">info@logoipsum.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* DESKTOP LAYOUT - Matches Original Desktop Design */}
        <div className="hidden sm:flex justify-between gap-8 sm:gap-24 h-full w-full">
          {/* Desktop Col 1: Identity & Socials */}
          <div className="flex flex-col justify-between items-start min-h-[300px]">
            <Image src={logoLight} alt="Logo" className="h-[115px] w-[155px]" />
            <div className="flex items-center gap-10">
              <FaFacebookSquare className="text-white size-8 cursor-pointer hover:opacity-80 transition-opacity" />
              <LuInstagram className="text-white size-8 cursor-pointer hover:opacity-80 transition-opacity" />
            </div>
          </div>

          {/* Desktop Col 2: Navigation & Contact/Copyright */}
          <div className="flex flex-col justify-between gap-4 w-full min-h-[300px]">
            {/* Top row: Nav links and Button */}
            <div className="flex justify-around items-start w-full">
               <div className="flex gap-16 lg:gap-24">
                  {FOOTER_NAV_ITEMS.map((nav, idx) => (
                    <div className={`${nav.isHidden ? "hidden lg:block" : ""}`} key={idx}>
                      <FooterList heading={nav.heading} items={nav.items} />
                    </div>
                  ))}
               </div>
               <PrimaryBtn
                title="Book a Consultant"
                styles="bg-[#04724d] hover:bg-[#035a3d] text-white text-base font-semibold px-8 py-3 rounded-full"
                onClick={() => {}}
              />
            </div>

            {/* Bottom row: Contact and Copyright */}
            <div className="flex items-end justify-between relative w-full pt-8 border-t border-white/10">
              {/* Decorative Green Line */}
              <div className="absolute -top-[1px] left-0 w-11 h-[2px] bg-primary-green" />
              
              <div className="flex items-end justify-between w-full">
                <div className="space-y-1">
                  <p className="text-sm text-white font-secondary">+1 891 989-11-91</p>
                  <p className="text-sm text-white font-secondary font-medium">info@logoipsum.com</p>
                </div>
                <p className="text-xs font-secondary text-[#D3D8DE]">
                  &copy; 2023 &mdash; Copyright
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
