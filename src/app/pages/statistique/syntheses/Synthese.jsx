"use client";

import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const Synthese = () => {
  const [chartData, setChartData] = useState(null);
  const [kpiData, setKpiData] = useState({
    totalSortants: 0,
    totalDureeSejour: 0,
    totalEntrant: 0,
  });
  const [month, setMonth] = useState('2024-01'); // Mois par défaut
  const [data, setData] = useState([]);

  useEffect(() => {
    // Récupérer les données à partir de JSON Server
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3001/hospitalData?month=${month}`);
      const result = await response.json();
      if (result.length > 0) {
        const { totalEntrant, totalSortants, totalDureeSejour, mothers, newborns } = result[0];

        // Mise à jour des KPI
        setKpiData({ totalEntrant, totalSortants, totalDureeSejour });

        // Configuration des options et des séries pour le graphique
        const options = {
          chart: {
            type: 'bar',
            height: 400,
          },
          title: {
            text: 'Statistiques d\'hospitalisation',
          },
          xaxis: {
            categories: [
              'Lits Disponibles',
              'Hospitalisations fin mois précédent',
              'Total Admissions',
              'Sortants Normaux',
              'Sortants Évadés',
              'Sortants sur Demande',
              'Référés au Niveau Supérieur',
              'Décédés',
              'Transférés Interservices',
              'Journées Effectives d\'Hospitalisation',
            ],
          },
          yaxis: {
            title: {
              text: 'Nombre',
            },
          },
          dataLabels: {
            enabled: true,
          },
        };

        const series = [
          {
            name: 'Mères',
            data: mothers,
          },
          {
            name: 'Nouveaux-nés',
            data: newborns,
          },
        ];

        setChartData({ options, series });
      }
    };

    fetchData();
  }, [month]);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">KPI</h2>

      {/* Filtre pour sélectionner le mois */}
      <div className="mb-4">
        <label htmlFor="month" className="block text-gray-700 mb-2">Sélectionner le mois:</label>
        <select
          id="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="2024-01">Janvier 2024</option>
          <option value="2024-02">Février 2024</option>
          {/* Ajoutez d'autres options de mois ici */}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-50 p-6 shadow-lg rounded-lg transition-transform transform hover:scale-105 flex items-center justify-between relative overflow-hidden">
          <div>
            <h3 className="text-xl font-semibold text-blue-700">Total Entrant</h3>
            <p className="text-4xl font-bold text-blue-600">{kpiData.totalEntrant}</p>
          </div>
          <FaArrowUp className="text-blue-600 text-3xl" />
          <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-blue-200 rounded-full opacity-30"></div>
        </div>

        <div className="bg-yellow-50 p-6 shadow-lg rounded-lg transition-transform transform hover:scale-105 flex items-center justify-between relative overflow-hidden">
          <div>
            <h3 className="text-xl font-semibold text-yellow-700">Durée de Séjour</h3>
            <p className="text-4xl font-bold text-yellow-600">{kpiData.totalDureeSejour} jours</p>
          </div>
          <FaArrowDown className="text-red-500 text-3xl" />
          <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-yellow-200 rounded-full opacity-30"></div>
        </div>

        <div className="bg-green-50 p-6 shadow-lg rounded-lg transition-transform transform hover:scale-105 flex items-center justify-between relative overflow-hidden">
          <div>
            <h3 className="text-xl font-semibold text-green-700">Total Sortants</h3>
            <p className="text-4xl font-bold text-green-600">{kpiData.totalSortants}</p>
          </div>
          <FaArrowUp className="text-green-600 text-3xl" />
          <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-green-200 rounded-full opacity-30"></div>
        </div>
      </div>

      <Chart options={chartData.options} series={chartData.series} type="bar" height={400} />
    </div>
  );
};

export default Synthese;
