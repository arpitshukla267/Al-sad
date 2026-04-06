"use client";

import React, { useState, useEffect, useRef } from "react";
import { LuPhone, LuMail, LuClock, LuMapPin } from "react-icons/lu";
import "leaflet/dist/leaflet.css";
import Image from "next/image";

import branch1 from "../../public/assets/images/timeline-1.webp";
import branch2 from "../../public/assets/images/timeline-3.webp";
import branch3 from "../../public/assets/images/timeline-4.webp";
import branch4 from "../../public/assets/images/timeline-5.webp";
import branch5 from "../../public/assets/images/timeline-6.webp";

const locations = [
  {
    name: "Dubai Marina",
    coordinates: [25.0772, 55.1351], // [lat, lng] for Leaflet
    projects: 15,
    description: "Luxury residential and commercial projects in Dubai Marina",
    isHighlighted: true,
  },
  {
    name: "Downtown Dubai",
    coordinates: [25.1972, 55.2708],
    projects: 8,
    description: "Iconic projects including Burj Khalifa and Dubai Mall",
  },
  {
    name: "Business Bay",
    coordinates: [25.1833, 55.2667],
    projects: 12,
    description: "Modern business district with commercial towers",
  },
  {
    name: "Sharjah",
    coordinates: [25.3573, 55.4033],
    projects: 6,
    description: "Cultural and residential developments in Sharjah",
  },
  {
    name: "Ajman",
    coordinates: [25.4052, 55.5136],
    projects: 4,
    description: "Coastal development projects in Ajman",
  },
  {
    name: "Al Aweer",
    coordinates: [25.1167, 55.4167],
    projects: 3,
    description: "Industrial and logistics projects",
  },
  {
    name: "Falaj Al Mualla",
    coordinates: [25.3333, 55.8333],
    projects: 2,
    description: "Agricultural and rural development",
  },
  {
    name: "Al Dhaid",
    coordinates: [25.2833, 55.9167],
    projects: 5,
    description: "Agricultural and commercial projects",
  },
  {
    name: "Palm Jumeirah",
    coordinates: [25.1167, 55.1167],
    projects: 3,
    description: "Artificial island development projects",
  },
  {
    name: "The World Islands",
    coordinates: [25.0833, 55.0833],
    projects: 1,
    description: "Exclusive island development projects",
  },
];

const branches = [
  {
    id: 1,
    name: "Branch 1",
    company: "Al Sad Building Material LLC",
    address: "Al Sabkha St, Deira Dubai - UAE",
    workingHours: "8:00am - 1:00pm / 4:00pm - 8:00pm",
    days: "Monday - Saturday",
    phone: "1800 - 83785 82733",
    email: "support@clarity.com",
    image: branch1,
  },
  {
    id: 2,
    name: "Branch - 2",
    company: "Al Sad Building Material LLC,Br",
    address: "Nakheel St, Naif Road Deira Dubai - UAE",
    workingHours: "8:00am - 1:00pm / 4:00pm - 8:00pm",
    days: "Monday - Saturday",
    phone: "1800 - 83785 82733",
    email: "support@clarity.com",
    image: branch2,
  },
  {
    id: 3,
    name: "Branch - 3",
    company: "Al Sad Building Material LLC,Br",
    address: "Al Quoz Industrial Area 3",
    workingHours: "8:00am - 1:00pm / 4:00pm - 8:00pm",
    days: "Monday - Saturday",
    phone: "800 - 83785 82733",
    email: "support@clarity.com",
    image: branch3,
  },
  {
    id: 4,
    name: "Branch - 4",
    company: "Al Sad Al Jadid Building Material LLC",
    address: "Al Quoz Industrial Area 4",
    workingHours: "8:00am - 1:00pm / 4:00pm - 8:00pm",
    days: "Monday - Saturday",
    phone: "1800 - 83785 82733",
    email: "support@clarity.com",
    image: branch4,
  },
  {
    id: 5,
    name: "Branch - 5",
    company: "Al Sad Al Arabi Building Material LLC",
    address: "Dubai Investment Park 2",
    workingHours: "8:00am - 1:00pm / 4:00pm - 8:00pm",
    days: "Monday - Saturday",
    phone: "1800 - 83785 82733",
    email: "support@clarity.com",
    image: branch5,
  },
];

const ContactUs = () => {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    details: "",
  });
  const mapContainer = useRef(null);
  const map = useRef(null);
  const mapInitializing = useRef(false);
  const markersRef = useRef([]);
  const leafletRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(null);

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  useEffect(() => {
    if (map.current || mapInitializing.current) return; // initialize map only once

    if (!mapContainer.current) return;

    mapInitializing.current = true;

    // Dynamically import Leaflet only on client side
    const initMap = async () => {
      try {
        const L = (await import("leaflet")).default;
        if (map.current) return;
        leafletRef.current = L; 

        // Double check container hasn't been initialized by another parallel call
        if (mapContainer.current._leaflet_id) return;

        // Fix for default marker icons in Next.js
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
          iconUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
          shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
        });

        // Initialize Leaflet map
        map.current = L.map(mapContainer.current, {
          center: [25.1972, 55.2708], // [lat, lng] - Dubai center
          zoom: 10,
          zoomControl: true,
        });

        // Add tile layer - using OpenStreetMap standard tiles (most reliable)
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map.current);

        // Map loaded successfully
        map.current.whenReady(() => {
          setMapLoaded(true);
          setMapError(null);
        });

        // Create custom marker icon
        const createCustomIcon = (isSelected) => {
          return L.divIcon({
            className: "custom-marker",
            html: `<div style="
              width: 24px;
              height: 24px;
              border-radius: 50%;
              background-color: ${isSelected ? "#10b981" : "#374151"};
              border: 2px solid white;
              box-shadow: 0 2px 4px rgba(0,0,0,0.2);
              cursor: pointer;
            "></div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12],
          });
        };

        // Add markers for each location
        markersRef.current = locations.map((location) => {
          const isSelected = selectedLocation.name === location.name;
          const marker = L.marker(location.coordinates, {
            icon: createCustomIcon(isSelected),
          }).addTo(map.current);

          // Add popup with location info
          marker.bindPopup(`
            <div style="padding: 8px;">
              <h3 style="margin: 0 0 4px 0; font-weight: 600;">${location.name}</h3>
              <p style="margin: 0; font-size: 14px; color: #666;">${location.description}</p>
              <p style="margin: 4px 0 0 0; font-size: 12px; color: #999;">Projects: ${location.projects}</p>
            </div>
          `);

          // Handle marker click
          marker.on("click", () => {
            handleMarkerClick(location);
          });

          return marker;
        });

        // Fit map to show all markers
        if (markersRef.current.length > 0) {
          const group = new L.featureGroup(markersRef.current);
          map.current.fitBounds(group.getBounds().pad(0.1));
        }
      } catch (error) {
        console.error("Failed to initialize map:", error);
        setMapError(
          "Failed to load map. Please check your internet connection and try again."
        );
        mapInitializing.current = false;
      }
    };

    initMap();

    // Cleanup function
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      mapInitializing.current = false;
      markersRef.current = [];
    };
  }, []); // Only run once on mount

  // Update marker styles when selectedLocation changes
  useEffect(() => {
    if (!map.current || markersRef.current.length === 0 || !leafletRef.current)
      return;

    const L = leafletRef.current;

    markersRef.current.forEach((marker, index) => {
      const location = locations[index];
      const isSelected = selectedLocation.name === location.name;

      // Create new icon with updated style
      const createCustomIcon = (isSelected) => {
        return L.divIcon({
          className: "custom-marker",
          html: `<div style="
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background-color: ${isSelected ? "#10b981" : "#374151"};
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            cursor: pointer;
          "></div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });
      };

      marker.setIcon(createCustomIcon(isSelected));

      // Pan to selected location
      if (isSelected) {
        map.current.setView(location.coordinates, 12, {
          animate: true,
          duration: 0.5,
        });
        marker.openPopup();
      }
    });
  }, [selectedLocation]);

  return (
    <div className="min-h-screen bg-white pt-[63px] md:pt-[83px]">
      {/* Header Section */}
      <div className="bg-[#0E2143] py-8 md:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white">Contact Us</h1>
        </div>
      </div>

      {/* Map Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-[600px] rounded-lg overflow-hidden">
            <div
              ref={mapContainer}
              className="w-full h-full z-0"
              style={{ minHeight: "600px" }}
            />

            {/* Loading indicator */}
            {!mapLoaded && !mapError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading map...</p>
                </div>
              </div>
            )}

            {/* Error message */}
            {mapError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="text-center p-4">
                  <div className="text-red-500 text-4xl mb-4">⚠️</div>
                  <p className="text-red-600 mb-2">{mapError}</p>
                  <p className="text-sm text-gray-500">
                    Make sure you have a valid Mapbox access token
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Branch Information Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {branches.map((branch) => (
              <div
                key={branch.id}
                className="flex flex-col bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-[#e5e5e5]"
              >
                <div className="p-6 flex-1 flex flex-col space-y-4">
                  <h3 className="text-[20px] font-primary font-bold text-black uppercase tracking-tight">
                    {branch.name}
                  </h3>

                  <div className="space-y-4 flex-1">
                    {/* Address Section */}
                    <div className="flex items-start space-x-3 group/item">
                      <LuMapPin
                        className="mt-1 text-[#04724D] flex-shrink-0"
                        size={18}
                      />
                      <div className="text-black text-sm leading-relaxed">
                        <p className="font-semibold">{branch.company}</p>
                        <p className="text-gray-600">{branch.address}</p>
                      </div>
                    </div>

                    {/* Working Hours Section */}
                    <div className="flex items-start space-x-3 group/item">
                      <LuClock
                        className="mt-1 text-[#04724D] flex-shrink-0"
                        size={18}
                      />
                      <div className="text-black text-sm">
                        <p className="font-semibold">{branch.days}</p>
                        <p className="text-gray-600 font-medium">
                          {branch.workingHours}
                        </p>
                      </div>
                    </div>

                    {/* Communication Info */}
                    <div className="pt-4 border-t border-gray-100 flex flex-col space-y-3">
                      <a
                        href={`tel:${branch.phone.replace(/\s+/g, "")}`}
                        className="flex items-center space-x-3 group/contact hover:text-[#04724D] transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-[#04724D]/10 flex items-center justify-center group-hover/contact:bg-[#04724D] transition-colors">
                          <LuPhone
                            size={16}
                            className="text-[#04724D] group-hover/contact:text-white"
                          />
                        </div>
                        <span className="text-black text-sm font-semibold">
                          {branch.phone}
                        </span>
                      </a>

                      <a
                        href={`mailto:${branch.email}`}
                        className="flex items-center space-x-3 group/contact hover:text-[#04724D] transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-[#04724D]/10 flex items-center justify-center group-hover/contact:bg-[#04724D] transition-colors">
                          <LuMail
                            size={16}
                            className="text-[#04724D] group-hover/contact:text-white"
                          />
                        </div>
                        <span className="text-black text-sm italic">
                          {branch.email}
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="bg-[#0E2143] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8">
            Have an enquiry? Reach out!
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6" suppressHydrationWarning>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-white rounded-lg bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  suppressHydrationWarning
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Example@email.com"
                  className="w-full px-4 py-3 border border-white rounded-lg bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  suppressHydrationWarning
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Phone no.
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter 10 digit phone number"
                  className="w-full px-4 py-3 border border-white rounded-lg bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  suppressHydrationWarning
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Subject of inquiry
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 border border-white rounded-lg bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  suppressHydrationWarning
                />
              </div>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Details
              </label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleInputChange}
                rows={4}
                placeholder="Describe your query in detail to help us better propose an ideal solution"
                className="w-full px-4 py-3 border border-white rounded-lg bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                suppressHydrationWarning
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200"
                suppressHydrationWarning
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
