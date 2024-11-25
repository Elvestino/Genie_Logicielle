import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Importer le style de react-datepicker
import { FiFilter } from "react-icons/fi"; // Icône de filtrage
import { BsCalendar } from "react-icons/bs"; // Icône de calendrier

export default function FiltreAvance({ onFilterChange }) {
  const [startDate, setStartDate] = useState(null); // Date avec calendrier
  const [category, setCategory] = useState("All");
  
  // Fonction pour gérer le changement de filtre
  const handleFilterChange = () => {
    const formattedDate = startDate ? startDate.toLocaleDateString("en-US", { day: 'numeric', month: 'long', year: 'numeric' }) : "";
    onFilterChange({ date: formattedDate, category });
  };

  return (
    <div className="flex items-center space-x-2 p-2">
      {/* Filtre par plage de dates avec calendrier */}
      <div className="flex items-center space-x-2">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="dd MMMM, yyyy"
          placeholderText="Select a date"
          className="border border-gray-300 p-2 rounded-lg text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        />
      </div>

     

      {/* Bouton pour appliquer le filtre */}
      <button 
        onClick={handleFilterChange} 
        className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg text-base shadow-md transition-all duration-200 ease-in-out transform hover:scale-105"
      >
        Appliquer
      </button>
    </div>
  );
}
