"use client";

import Image from "next/image";
import React from "react";
import logo from "../../../public/assets/logo-light.svg";
import SimpleVerticalTimeline from "./SimpleTimeline";
import people from "../../../public/assets/images/people.webp";

const BrandValues = () => {
  return (
    <div
      className="flex flex-col items-center p-10 bg-gradient-to-b from-primary via-light-blue to-light-blue"
    >
      <div id="brand-value">
        <Image
          src={logo}
          alt="Logo White"
          className="object-cover h-[120px] w-[133px] md:h-[287px] md:w-[343px]"
        />
      </div>
      <div className="space-y-10">
        <SimpleVerticalTimeline />
        <div className="flex flex-col items-center space-y-8 pb-[60px]">
          <Image
            src={people}
            alt="People"
            className="h-[139px] md:h-[554px] w-[316px] md:w-[1250px] rounded-sm object-fill"
          />
          <p className="sm:max-w-[997px] text-center w-full text-sm md:text-lg font-secondary">
            Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa
            mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien
            fringilla, mattis ligula consectetur, ultrices mauris. Maecenas
            vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor
            ornare leo, non suscipit magna interdum eu. Curabitur pellentesque
            nibh nibh, at maximus ante fermentum sit amet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BrandValues;
