"use client";

import Products from "./home/Products";
import Categories from "./home/Categories";
import Stats from "./home/Stats";
import Values from "./home/Values";
import Services from "./home/Services";
import Testimonials from "./home/Testimonials";
import NewsAndArticles from "./home/NewsAndArticles";
import ProductFullWidth from "./home/ProductFullWidth";
import Locations from "./home/Locations";
import { useState, useEffect } from "react";

export default function Home() {
  const [showSplash, setShowSplash] = useState(false);
  const [showHeader, setShowHeader] = useState(false);

  // Check sessionStorage to see if splash has been shown in this session
  useEffect(() => {
    const splashShown = sessionStorage.getItem("splashShown");

    if (!splashShown) {
      // First time in this session - show splash
      setShowSplash(true);
      // Mark splash as shown in this session
      sessionStorage.setItem("splashShown", "true");

      // Hide splash screen after 3 seconds (matching CSS animation duration)
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      // Splash already shown in this session - skip it
      setShowSplash(false);
    }
  }, []);

  return (
    <>
      <main className="flex flex-col flex-1 justify-start items-center relative min-h-screen overflow-x-hidden">
        {/* Splash screen - shown first for 3 seconds, covers everything */}
        {showSplash && (
          <div className="masked h-screen w-full fixed top-0 left-0 z-[10]" />
        )}

        {/* Categories component - shown after splash animation completes, animates cards sliding up */}
        {!showSplash && (
          <div className="w-full mx-auto h-full">
            <Categories onAnimationComplete={setShowHeader} />
            {showHeader && (
              <>
                <Products />
                <Values />
                <Stats />
                <Services />
                <Locations />
                <Testimonials />
                <NewsAndArticles />
                <ProductFullWidth />
              </>
            )}
          </div>
        )}
      </main>
    </>
  );
}
