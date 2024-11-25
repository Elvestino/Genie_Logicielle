"use client";

import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

const Diagnostic = () => {
  // États pour les données du graphique et le filtre année
  const [chartData, setChartData] = useState({
    series: [
      { name: 'Hommes', data: [] },
      { name: 'Femmes', data: [] }
    ],
    options: {
      chart: {
        type: 'bar',
        height: 400,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
          columnWidth: '55%',
        },
      },
      dataLabels: { enabled: false },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ],
      },
      yaxis: {
        title: {
          text: 'Nombre de Diagnostics',
        },
      },
      fill: { opacity: 1 },
      legend: {
        position: 'top',
        horizontalAlign: 'center',
      },
      colors: ['#1f77b4', '#ff7f0e'],
    },
  });

  const [selectedYear, setSelectedYear] = useState('2024'); // État pour l'année sélectionnée

  // Fonction pour changer l'année dans le filtre
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  // Fonction pour charger les données depuis le serveur
  const fetchData = async (year) => {
    try {
      const response = await axios.get(`http://localhost:3001/diagnostics?year=${year}`);
      if (response.data && response.data.length > 0) {
        const data = response.data[0];
        setChartData((prevData) => ({
          ...prevData,
          series: [
            { name: 'Hommes', data: data.hommes },
            { name: 'Femmes', data: data.femmes }
          ],
        }));
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };

  // Appel de l'API à chaque fois que l'année est modifiée
  useEffect(() => {
    fetchData(selectedYear);
  }, [selectedYear]);

  return (
    <div className="w-full p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Nombre de Diagnostics par Mois - Hommes vs Femmes</h2>
      
      {/* Filtre Année */}
      <div className="mb-6">
        <label className="text-gray-600 font-semibold">Année</label>
        <select
          value={selectedYear}
          onChange={handleYearChange}
          className="ml-2 mt-1 block w-full max-w-xs border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900"
        >
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
      </div>

      {/* Graphique */}
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={400}
      />
    </div>
  );
};

export default Diagnostic;
