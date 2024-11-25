"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/navbar/navbar";
import Profilbar from "./components/profilbar/profilbar";
import CarteStatistique from "./pages/Dashboard/CarteStatistique";
import Graphe from "./pages/Dashboard/Graphe";
import FiltreAvance from "./pages/Dashboard/FiltreAvance"; // Assurez-vous que ce composant existe
import { FiClock } from 'react-icons/fi'; // Icône de montre

export default function Home() {
  const [username, setUsername] = useState("John Doe");
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [filters, setFilters] = useState({}); // État pour stocker les filtres

  // Fonction pour obtenir la date formatée
  useEffect(() => {
    const today = new Date();

    // Jours de la semaine en français
    const daysOfWeek = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const dayOfWeek = daysOfWeek[today.getDay()];

    // Mois en français
    const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    const month = months[today.getMonth()];

    // Formatage de la date
    const formattedDate = `Aujourd'hui, c'est ${dayOfWeek} ${today.getDate()} ${month}`;
    setCurrentDate(formattedDate);

    // Fonction pour mettre à jour l'heure actuelle
    const updateCurrentTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const formattedTime = `${hours}:${minutes}`;
      setCurrentTime(formattedTime);
    };

    updateCurrentTime();
    const intervalId = setInterval(updateCurrentTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Fonction pour gérer les changements dans le filtrage
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters); // Mettre à jour les filtres avec les nouveaux critères sélectionnés
  };

  return (
    <>
      <main className="bg-white w-full h-screen flex overflow-hidden">
        <Navbar />
        <section className="w-full h-full flex flex-col">
          <Profilbar />
          <div className="w-full h-full background_color flex justify-center items-center overflow-auto custom-scrollbar">
            <div className="flex flex-col w-full h-full p-4 ml-[300px] text-black">
              <h2 className="font-montserrat text-3xl font-bold">Tableau de bord</h2>
              <p className="font-montserrat text-lg text-gray-500">
                <span>{currentDate}</span>
              </p>

              {/* Aligner la montre à gauche et le filtre à droite */}
              <div className="flex justify-between items-center w-full mt-4">
                {/* Montre à gauche */}
                <div className="flex items-center space-x-2 text-gray-500 p-4">
                  <FiClock className="text-lg" /> {/* Icône de montre */}
                  <span className="text-lg">{currentTime}</span> {/* Heure actuelle */}
                </div>

                {/* Filtre à droite */}
                <div>
                  <FiltreAvance onFilterChange={handleFilterChange} />
                </div>
              </div>

              <div className="p-4">
                {/* Section des cartes et graphiques */}
                <CarteStatistique /> {/* Ajout des filtres */}
                <Graphe /> {/* Ajout des filtres */}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
