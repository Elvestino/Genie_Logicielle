"use client"; // Pour utiliser les hooks dans un composant client

import React, { useEffect, useState } from "react"; // Importer useEffect et useState
import Image from "next/image";
import axios from "axios"; // Importer axios

const CarteStatistique = () => {
  const [stats, setStats] = useState([]); // État pour stocker les statistiques
  const [loading, setLoading] = useState(true); // État de chargement

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:3001/stats');
        console.log(response.data); // Vérifiez ce qui est récupéré
        setStats(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des statistiques :", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchStats();
  }, []);
  

  if (loading) {
    return <p>Chargement des statistiques...</p>; // Message pendant le chargement
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          return (
            <div
              key={stat.id}
              className="bg-white shadow-xl rounded-xl p-4 flex items-center transform transition-transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out max-w-md"
            >
              <div className="mr-4">
                <Image 
                  src={stat.icon} 
                  alt={stat.title} 
                  width={80}  
                  height={80} 
                  className="rounded-full border-2 border-gray-200 shadow-md" 
                />
              </div>
              <div className="text-center w-full">
                <p className="text-4xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-lg font-medium text-gray-600">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CarteStatistique;
