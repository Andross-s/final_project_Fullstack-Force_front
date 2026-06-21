"use client";

// Хук визначає, чи пристрій є мобільним або планшетом
import { useEffect, useState } from "react";

export default function useIsMobileOrTablet() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    check();
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}
