"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Statistic() {
  const [activeButton, setActiveButton] = useState('syntheses');

  useEffect(() => {
    const savedButton = localStorage.getItem("activeButton");
    if (savedButton) {
      setActiveButton(savedButton);
    }
  }, []);

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
    localStorage.setItem("activeButton", buttonName);
  };

  const buttons = [
    { name: 'synthese', label: 'Synthese hospitalisation', href: '/pages/statistique/syntheses' },
    { name: 'diagnostique', label: 'Diagnostique', href: '/pages/statistique/diagnostique' },
    { name: 'activite', label: 'Activite Maternite', href: '/pages/statistique/activite' },
  ];

  return (
    <header className="w-full h-screen flex items-center justify-center ">
      <nav className="flex space-x-8">
        {buttons.map((button) => (
          <div key={button.name} className="relative">
            <Link href={button.href}>
              <button 
                className={`font-semibold transform transition duration-300 px-6 py-3 rounded-md text-lg hover:scale-105
                  ${activeButton === button.name 
                    ? 'text-white bg-blue-600 shadow-md' 
                    : 'text-blue-100 hover:bg-blue-500 hover:text-white'
                  }`}
                onClick={() => handleButtonClick(button.name)}>
                {button.label}
              </button>
            </Link>
            {activeButton === button.name && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-white rounded-full"></div>
            )}
          </div>
        ))}
      </nav>
    </header>
  );
}
