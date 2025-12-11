"use client";

import React, { useState, useEffect, useRef } from "react";
import { LuPhone } from "react-icons/lu";
import { LuMail } from "react-icons/lu";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

const locations = [
  {
    name: "Dubai Marina",
    coordinates: [55.1351, 25.0772],
    projects: 15,
    description: "Luxury residential and commercial projects in Dubai Marina",
    isHighlighted: true,
  },
  {
    name: "Downtown Dubai",
    coordinates: [55.2708, 25.1972],
    projects: 8,
    description: "Iconic projects including Burj Khalifa and Dubai Mall",
  },
  {
    name: "Business Bay",
    coordinates: [55.2667, 25.1833],
    projects: 12,
    description: "Modern business district with commercial towers",
  },
  {
    name: "Sharjah",
    coordinates: [55.4033, 25.3573],
    projects: 6,
    description: "Cultural and residential developments in Sharjah",
  },
  {
    name: "Ajman",
    coordinates: [55.5136, 25.4052],
    projects: 4,
    description: "Coastal development projects in Ajman",
  },
  {
    name: "Al Aweer",
    coordinates: [55.4167, 25.1167],
    projects: 3,
    description: "Industrial and logistics projects",
  },
  {
    name: "Falaj Al Mualla",
    coordinates: [55.8333, 25.3333],
    projects: 2,
    description: "Agricultural and rural development",
  },
  {
    name: "Al Dhaid",
    coordinates: [55.9167, 25.2833],
    projects: 5,
    description: "Agricultural and commercial projects",
  },
  {
    name: "Palm Jumeirah",
    coordinates: [55.1167, 25.1167],
    projects: 3,
    description: "Artificial island development projects",
  },
  {
    name: "The World Islands",
    coordinates: [55.0833, 25.0833],
    projects: 1,
    description: "Exclusive island development projects",
  },
];

const branches = [
  {
    id: 1,
    address:
      "3rd Floor, Elphinstone Chambers Horniman Circle, Fort Mumbai 400001, India",
    workingHours: "10:30am-5:30pm / Monday - Friday",
    phone: "1800 - 83785 82733",
    email: "support@clarity.com",
  },
  {
    id: 2,
    address:
      "3rd Floor, Elphinstone Chambers Horniman Circle, Fort Mumbai 400001, India",
    workingHours: "10:30am-5:30pm / Monday - Friday",
    phone: "1800 - 83785 82733",
    email: "support@clarity.com",
  },
  {
    id: 3,
    address:
      "3rd Floor, Elphinstone Chambers Horniman Circle, Fort Mumbai 400001, India",
    workingHours: "10:30am-5:30pm / Monday - Friday",
    phone: "1800 - 83785 82733",
    email: "support@clarity.com",
  },
  {
    id: 4,
    address:
      "3rd Floor, Elphinstone Chambers Horniman Circle, Fort Mumbai 400001, India",
    workingHours: "10:30am-5:30pm / Monday - Friday",
    phone: "1800 - 83785 82733",
    email: "support@clarity.com",
  },
  {
    id: 5,
    address:
      "3rd Floor, Elphinstone Chambers Horniman Circle, Fort Mumbai 400001, India",
    workingHours: "10:30am-5:30pm / Monday - Friday",
    phone: "1800 - 83785 82733",
    email: "support@clarity.com",
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
  const [lng, setLng] = useState(55.2708);
  const [lat, setLat] = useState(25.1972);
  const [zoom, setZoom] = useState(9);
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
    if (map.current) return; // initialize map only once

    // Check if Mapbox GL is loaded
    if (!window.mapboxgl) {
      console.error("Mapbox GL JS not loaded");
      return;
    }

    try {
      map.current = new window.mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: [lng, lat],
        zoom: zoom,
        accessToken:
          process.env.NEXT_PUBLIC_MAPBOX_TOKEN ||
          "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
      });

      map.current.on("load", () => {
        console.log("Map loaded successfully");
        setMapLoaded(true);
        setMapError(null);
      });

      map.current.on("error", (e) => {
        console.error("Map error:", e);
        setMapError(
          "Failed to load map. Please check your internet connection and try again."
        );
      });
    } catch (error) {
      console.error("Failed to initialize map:", error);
    }

    // Add geocoder
    const geocoder = new window.MapboxGeocoder({
      accessToken:
        process.env.NEXT_PUBLIC_MAPBOX_TOKEN ||
        "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
      mapboxgl: window.mapboxgl,
      placeholder: "Search for locations...",
      bbox: [54.0, 24.0, 56.0, 26.0], // UAE bounding box
      proximity: { longitude: 55.2708, latitude: 25.1972 },
      countries: "ae",
      types: "place,locality,neighborhood,address",
    });

    map.current.addControl(geocoder);

    // Add markers for each location
    locations.forEach((location) => {
      const el = document.createElement("div");
      el.className = "marker";
      el.style.width = "24px";
      el.style.height = "24px";
      el.style.borderRadius = "50%";
      el.style.backgroundColor =
        selectedLocation.name === location.name ? "#10b981" : "#374151";
      el.style.border = "2px solid white";
      el.style.cursor = "pointer";
      el.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";

      el.addEventListener("click", () => handleMarkerClick(location));

      new window.mapboxgl.Marker(el)
        .setLngLat(location.coordinates)
        .addTo(map.current);
    });

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, [selectedLocation, setLng, setLat, setZoom]);

  return (
    <div className="min-h-screen bg-white pt-[75px] sm:pt-[85px]">
      {/* Header Section */}
      <div className="bg-[#0E2143] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white">Contact Us</h1>
        </div>
      </div>

      {/* Map Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-[600px] rounded-lg overflow-hidden">
            <div ref={mapContainer} className="w-full h-full" />

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

            {/* Info Box */}
            <div className="absolute bottom-4 left-4 bg-[#04724D] text-white p-4 rounded-lg max-w-xs">
              <h3 className="text-lg font-bold mb-2">
                {selectedLocation.name}
              </h3>
              <p className="text-green-100 text-xs">
                {selectedLocation.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Branch Information Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {branches.map((branch) => (
              <div key={branch.id} className="space-y-3">
                <h3 className="text-2xl text-black">BRANCH - {branch.id}</h3>
                <div className="text-black text-sm space-y-1">
                  <p>3rd Floor, Elphinstone Chambers</p>
                  <p>Horniman Circle, Fort</p>
                  <p>Mumbai 400001, India</p>
                </div>
                <p className="text-black text-sm">{branch.workingHours}</p>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <LuPhone size={16} className="text-[#04724D]" />
                    <span className="text-black text-sm">{branch.phone}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <LuMail size={16} className="text-[#04724D]" />
                    <span className="text-black text-sm">{branch.email}</span>
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

          <form onSubmit={handleSubmit} className="space-y-6">
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
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200"
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
