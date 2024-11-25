"use client";

import React, { useState } from 'react';
import { FaDownload, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CSVLink } from 'react-csv';
import axios from 'axios';

const Tables = () => {
  const [availableIndicators, setAvailableIndicators] = useState([]);
  const [selectedIndicators, setSelectedIndicators] = useState([]);
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [isSelectorVisible, setIsSelectorVisible] = useState(false);
  const [selectedTableType, setSelectedTableType] = useState("");
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelectTableType = async (type) => {
    setSelectedTableType(type);
    let url = '';

    if (type === "synthese") {
      url = 'http://localhost:3001/syntheseIndicators';
    } else if (type === "diagnostic") {
      url = 'http://localhost:3001/diagnosticIndicators';
    }

    try {
      const response = await axios.get(url);
      setAvailableIndicators(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des indicateurs :", error);
    }

    setSelectedIndicators([]);
    setIsSelectorVisible(true);
    setIsTableVisible(false);
  };

  const handleSelectIndicator = (indicator) => {
    setSelectedIndicators([...selectedIndicators, indicator]);
    setAvailableIndicators(availableIndicators.filter(ind => ind.indicateur !== indicator.indicateur));
  };

  const handleDeselectIndicator = (indicator) => {
    setAvailableIndicators([...availableIndicators, indicator]);
    setSelectedIndicators(selectedIndicators.filter(ind => ind.indicateur !== indicator.indicateur));
  };

  const handleSelectAll = () => {
    setSelectedIndicators([...availableIndicators]);
    setAvailableIndicators([]);
  };

  const handleDeselectAll = () => {
    setAvailableIndicators([...availableIndicators, ...selectedIndicators]);
    setSelectedIndicators([]);
  };

  const handleValidateSelection = () => {
    if (selectedIndicators.length > 0) {
      setIsTableVisible(true);
      setIsSelectorVisible(false);
    } else {
      alert("Veuillez sélectionner au moins un indicateur avant de valider.");
    }
  };

  const handleCancelSelection = () => {
    setSelectedIndicators([]);
    setAvailableIndicators([]);
    setIsSelectorVisible(false);
    setIsTableVisible(false);
  };

  const handleDeleteTable = () => {
    handleCancelSelection(); // Réinitialiser les sélections
    setIsTableVisible(false); // Cacher le tableau
  };

  const handleExportToPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Indicateur', 'Mères (H/F)', 'Nouveau-nés (H/F)', 'Total']],
      body: selectedIndicators.map(indicator => [indicator.indicateur, indicator.meres, indicator.nouveauNes, indicator.total]),
    });
    doc.save('tableau_synthese.pdf');
  };

  const csvData = selectedIndicators.map(indicator => ({
    Indicateur: indicator.indicateur,
    Mères: indicator.meres,
    NouveauNes: indicator.nouveauNes,
    Total: indicator.total,
  }));

  const filteredIndicators = availableIndicators.filter(indicator =>
    indicator.indicateur.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-center mb-6">Creer un rapport</h2>

      {!isSelectorVisible && !isTableVisible && (
        <>
          <div className="text-center mb-4">
            <p className="text-gray-700">Veuillez choisir le type de tableau que vous souhaitez créer.</p>
          </div>
          <div className="flex justify-center space-x-6 mb-6">
            <button
              onClick={() => handleSelectTableType("synthese")}
              className="bg-green-500 text-white px-5 py-3 rounded-lg transition duration-300 hover:bg-green-600 shadow-md"
            >
              Tableau de Synthèse
            </button>
            <button
              onClick={() => handleSelectTableType("diagnostic")}
              className="bg-blue-500 text-white px-5 py-3 rounded-lg transition duration-300 hover:bg-blue-600 shadow-md"
            >
              Tableau de Diagnostic
            </button>
          </div>
        </>
      )}

      {isSelectorVisible && (
        <>
          <div className="flex justify-between mb-4">
            <button
              onClick={handleCancelSelection}
              className="bg-gray-400 text-white px-5 py-2 rounded-lg shadow-md transition duration-300 hover:bg-gray-500"
            >
              Annuler la sélection
            </button>
            <button
              onClick={handleValidateSelection}
              className="bg-green-500 text-white px-5 py-2 rounded-lg shadow-md transition duration-300 hover:bg-green-600"
            >
              Valider la sélection
            </button>
          </div>

          <div className="text-center mb-4">
            <p className="text-gray-600">Sélectionnez les indicateurs en utilisant les options ci-dessous.</p>
          </div>

          <div className="flex items-center mb-4">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-700 mb-2">Indicateurs Disponibles</h3>
              <div className="overflow-auto h-64 p-2 bg-white rounded-md border shadow-lg">
                <input
                  type="text"
                  placeholder="Rechercher un indicateur..."
                  className="w-full p-2 border rounded-lg mb-4"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <ul>
                  {filteredIndicators.map((indicator, index) => (
                    <li
                      key={index}
                      className="p-2 cursor-pointer hover:bg-gray-200 rounded-md transition duration-300"
                      onClick={() => handleSelectIndicator(indicator)}
                    >
                      {indicator.indicateur}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col items-center mx-4">
              <FaArrowRight className="text-gray-500 mb-2 cursor-pointer hover:text-gray-700" onClick={handleSelectAll} />
              <FaArrowLeft className="text-gray-500 mb-2 cursor-pointer hover:text-gray-700" onClick={handleDeselectAll} />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-gray-700 mb-2">Indicateurs Sélectionnés</h3>
              <div className="overflow-auto h-64 p-2 bg-white rounded-md border shadow-lg">
                <ul>
                  {selectedIndicators.map((indicator, index) => (
                    <li
                      key={index}
                      className="p-2 cursor-pointer hover:bg-gray-200 rounded-md transition duration-300"
                      onClick={() => handleDeselectIndicator(indicator)} // Désélectionne l'indicateur par clic
                    >
                      {indicator.indicateur}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}

      {isTableVisible && (
        <div className="mt-6">
          <div className="mb-4 flex justify-end space-x-4">
            <button
              onClick={handleDeleteTable}
              className="bg-red-500 text-white px-5 py-2 rounded-lg transition duration-300 hover:bg-red-600 shadow-md"
            >
              Supprimer le tableau
            </button>
            <button
              onClick={handleExportToPDF}
              className="bg-gray-700 text-white px-5 py-2 rounded-lg transition duration-300 hover:bg-gray-800 shadow-md"
            >
              Exporter PDF
            </button>
            <CSVLink
              data={csvData}
              filename={"tableau_synthese.csv"}
              className="bg-gray-700 text-white px-5 py-2 rounded-lg transition duration-300 hover:bg-gray-800 shadow-md"
            >
              Exporter CSV
            </CSVLink>
          </div>

          <table className="min-w-full bg-gray-200 border border-gray-300">
            <thead>
              <tr className={`border ${selectedTableType === 'synthese' ? 'bg-gray-500 text-white' : 'bg-blue-500 text-white'}`}>
                <th className="border px-2 py-2">Indicateur</th>
                <th className="border px-2 py-2">Mères</th>
                <th className="border px-2 py-2">Nouveau-nés</th>
                <th className="border px-2 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {selectedIndicators.map((indicator, index) => (
                <tr key={index} className="border">
                  <td className="border px-2 py-1">{indicator.indicateur}</td>
                  <td className="border px-2 py-1">{indicator.meres}</td>
                  <td className="border px-2 py-1">{indicator.nouveauNes}</td>
                  <td className="border px-2 py-1">{indicator.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Tables;
