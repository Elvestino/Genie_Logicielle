// src/app/pages/statistiques/Statistiques.jsx
"use client";

import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

const Active = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [dataMere, setDataMere] = useState({
    series: [],
    options: {
      chart: {
        type: 'bar',
        stacked: true,
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
        },
      },
      xaxis: { 
        categories: [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ],
      },
      colors: ['#4CAF50', '#00BCD4', '#FF9800', '#F44336'],
      dataLabels: { enabled: false },
      legend: { position: 'top' },
      title: { text: 'Statistiques des Accouchements et Avortements', align: 'left' },
    },
  });
  
  const [dataNouveauNe, setDataNouveauNe] = useState({
    series: [],
    options: {
      chart: {
        type: 'bar',
        stacked: true,
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
        },
      },
      xaxis: { 
        categories: [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ],
      },
      colors: ['#2196F3', '#FFC107', '#9E9E9E'],
      dataLabels: { enabled: false },
      legend: { position: 'top' },
      title: { text: 'Statistiques des Nouveau-nés', align: 'left' },
    },
  });

  // Fonction pour récupérer les données en fonction de l'année
  const fetchData = async (year) => {
    try {
      const response = await axios.get(`http://localhost:3001/statistiques?year=${year}`);
      if (response.data && response.data.length > 0) {
        const data = response.data[0];
        
        setDataMere((prev) => ({
          ...prev,
          series: [
            { name: 'Accouchements Normaux', data: data.maternite.accouchementNormal },
            { name: 'Accouchements Césarien', data: data.maternite.cesarien },
            { name: 'Avortements', data: data.maternite.avortement },
            { name: 'Décès Maternels', data: data.maternite.decesMaternel }
          ]
        }));

        setDataNouveauNe((prev) => ({
          ...prev,
          series: [
            { name: 'Nouveau-nés Vivants', data: data.nouveauNe.vivant },
            { name: 'Nouveau-nés avec Complications', data: data.nouveauNe.complication },
            { name: 'Mort-nés', data: data.nouveauNe.mortNe }
          ]
        }));
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };

  // Requête API chaque fois que l'année est modifiée
  useEffect(() => {
    fetchData(year);
  }, [year]);

  return (
    <div className="p-5 space-y-6">
      <h1 className="text-2xl font-bold">Statistiques Maternité et Nouveau-né</h1>

      <div className="mb-5">
        <label className="text-gray-600 font-semibold">Année :</label>
        <select value={year} onChange={(e) => setYear(e.target.value)} className="border rounded p-2 ml-2">
          {[...Array(10)].map((_, index) => {
            const yearValue = new Date().getFullYear() - index;
            return <option key={yearValue} value={yearValue}>{yearValue}</option>;
          })}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Graphique empilé pour les statistiques des mères */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <Chart options={dataMere.options} series={dataMere.series} type="bar" height={350} />
        </div>

        {/* Graphique empilé pour les statistiques des nouveau-nés */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <Chart options={dataNouveauNe.options} series={dataNouveauNe.series} type="bar" height={350} />
        </div>
      </div>
    </div>
  );
};

export default Active;
