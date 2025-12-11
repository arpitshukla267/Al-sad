"use client";

import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const locations = [
  {
    name: "Saudi Arabia",
    coordinates: [45.0792, 23.8859],
    projects: 45,
    description:
      "We have completed over 45 successful projects across the country and are currently working on many more",
    isHighlighted: true,
  },
  {
    name: "Iraq",
    coordinates: [43.6793, 33.2232],
    projects: 12,
    description:
      "Active construction projects in major cities including Baghdad and Basra",
  },
  {
    name: "Turkey",
    coordinates: [35.2433, 38.9637],
    projects: 8,
    description:
      "Engineering and infrastructure development projects across the region",
  },
  {
    name: "Iran",
    coordinates: [53.688, 32.4279],
    projects: 15,
    description:
      "Industrial and commercial construction projects in key economic zones",
  },
  {
    name: "India",
    coordinates: [78.9629, 20.5937],
    projects: 22,
    description:
      "Large-scale infrastructure projects including highways and commercial developments",
  },
];

const Locations = () => {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
  };

  return (
    <section className="py-10 sm:py-16 max-h-screen bg-white">
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDelay {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .animate-fade-in-delay {
          animation: fadeInDelay 0.5s ease-out 0.2s both;
        }
      `}</style>
      <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-18 bg-white">
        <div className="flex justify-between items-start ">
          <h2 className="text-2xl sm:text-4xl md:text-[48px] font-bold text-gray-900 leading-tight sm:max-w-[380px] md:max-w-[480px]">
            Growing Steadily With Finesse
          </h2>
          <p className="text-gray-900 font-medium hidden sm:inline-flex">
            Store locator
          </p>
        </div>

        <div className="relative">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 500,
              center: [55, 28],
            }}
            width={800}
            height={400}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const p = geo.properties || {};

                  // Try ISO codes first, then country names
                  const iso =
                    p.ISO_A3 || p.iso_a3 || p.ADM0_A3 || p.ISO_A3_EH || null;
                  const name = p.NAME || p.name || p.ADMIN || null;

                  const colorByIso = {
                    SAU: "#4C4C4C",
                    IRQ: "#4C4C4C",
                    TUR: "#4C4C4C",
                    IRN: "#4C4C4C",
                    EGY: "#4C4C4C",
                    JOR: "#4C4C4C",
                    SYR: "#4C4C4C",
                    LBN: "#4C4C4C",
                    ISR: "#4C4C4C",
                    PSE: "#4C4C4C",
                    KWT: "#4C4C4C",
                    BHR: "#4C4C4C",
                    QAT: "#4C4C4C",
                    ARE: "#4C4C4C",
                    OMN: "#4C4C4C",
                    YEM: "#4C4C4C",
                  };

                  const colorByName = {
                    "Saudi Arabia": "#4C4C4C",
                    Iraq: "#4C4C4C",
                    Turkey: "#4C4C4C",
                    Iran: "#4C4C4C",
                    Egypt: "#4C4C4C",
                    Jordan: "#4C4C4C",
                    Syria: "#4C4C4C",
                    Lebanon: "#4C4C4C",
                    Israel: "#4C4C4C",
                    Palestine: "#4C4C4C",
                    Kuwait: "#4C4C4C",
                    Bahrain: "#4C4C4C",
                    Qatar: "#4C4C4C",
                    "United Arab Emirates": "#4C4C4C",
                    Oman: "#4C4C4C",
                    Yemen: "#4C4C4C",
                  };

                  const fillColor =
                    (iso && colorByIso[iso]) ||
                    (name && colorByName[name]) ||
                    "#C7C7C7";

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      stroke="#e5e7eb"
                      strokeWidth={1}
                      style={{
                        default: { fill: fillColor, outline: "none" },
                        hover: { fill: fillColor, outline: "none" },
                        pressed: { fill: fillColor, outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>

            {locations.map((location, index) => (
              <Marker key={index} coordinates={location.coordinates}>
                <circle
                  r={8}
                  fill="#1f2937"
                  stroke={
                    selectedLocation.name === location.name
                      ? "#10b981"
                      : "#374151"
                  }
                  strokeWidth={selectedLocation.name === location.name ? 3 : 2}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleMarkerClick(location)}
                />
              </Marker>
            ))}
          </ComposableMap>

          {/* Fade Effect Overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                linear-gradient(180deg, rgba(255, 255, 255, 0) 70.67%, #FFFFFF 95.19%),
                linear-gradient(180deg, #FFFFFF 12.98%, rgba(255, 255, 255, 0) 42.79%),
                linear-gradient(270deg, #FFFFFF 6.54%, rgba(255, 255, 255, 0) 17.04%),
                linear-gradient(270deg, rgba(255, 255, 255, 0) 81.07%, #FFFFFF 93.56%)
              `,
            }}
          />

          {/* Dynamic Info Box */}
          <div className="relative sm:absolute bottom-0 sm:bottom-8 sm:left-4 sm:translate-x-0 bg-primary-green text-white p-4 rounded-lg w-full sm:max-w-xs transition-all duration-500 ease-in-out z-10">
            <h3 className="text-xl font-bold mb-2 animate-fade-in">
              {selectedLocation.name}
            </h3>
            <p className="text-green-100 text-sm sm:text-xs animate-fade-in-delay">
              {selectedLocation.description ||
                `We have completed over ${selectedLocation.projects} successful projects across the country and are currently working on many more`}
            </p>
          </div>
        </div>

        <p className="text-center underline text-black font-medium mt-3 sm:hidden">
          Store locator
        </p>
      </div>
    </section>
  );
};

export default Locations;
