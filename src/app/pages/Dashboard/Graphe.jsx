"use client"; // Indique que ce fichier est un composant React client

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios"; // Pour faire des requêtes HTTP

// Charger ApexCharts de manière dynamique (évite les erreurs côté serveur)
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const Graphe = () => {
  const [lineData, setLineData] = useState(null); // Stocker les données du graphique en ligne
  const [barData, setBarData] = useState(null);  // Stocker les données de l'histogramme

  // Utiliser useEffect pour récupérer les données au démarrage du composant
  useEffect(() => {
    // Fonction pour récupérer les données depuis JSON Server
    const fetchData = async () => {
      try {
        const lineResponse = await axios.get("http://localhost:3001/lineData");
        const barResponse = await axios.get("http://localhost:3001/barData");

        setLineData(lineResponse.data);
        setBarData(barResponse.data);
      } catch (error) {
        console.error("Erreur lors du chargement des données", error);
      }
    };

    fetchData();
  }, []);

  // Si les données ne sont pas encore chargées, on affiche un message de chargement
  if (!lineData || !barData) {
    return <div>Chargement des données...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Deux graphiques affichés côte à côte */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Graphique en ligne (2 colonnes) */}
        <div className="col-span-2 bg-white shadow-lg rounded-lg p-6">
          <ApexCharts
            options={{
              chart: { type: 'area', height: 350, toolbar: { show: false } },
              dataLabels: { enabled: false },
              xaxis: { categories: lineData.categories },
              yaxis: { labels: { show: true } },
              title: { text: 'Évolution des Patients', align: 'center' },
              legend: { show: true }
            }}
            series={lineData.series}
            type="area"
            height={350}
          />
        </div>

        {/* Histogramme inversé (1 colonne) */}
        <div className="col-span-1 bg-white shadow-lg rounded-lg p-6">
          <ApexCharts
            options={{
              chart: { type: 'bar', height: 350, toolbar: { show: false } },
              plotOptions: { bar: { horizontal: true } },
              xaxis: { categories: barData.categories },
              title: { text: 'Patients par Année', align: 'center' },
            }}
            series={barData.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default Graphe;
