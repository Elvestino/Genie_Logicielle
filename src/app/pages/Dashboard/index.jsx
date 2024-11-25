import Navbar from "./components/navbar/navbar";
import Profilbar from "./components/profilbar/profilbar";
import CarteStatistique from "./pages/Dashboard/CarteStatistique";
import Graphe from "./pages/Dashboard/Graphe";


export default function index() {
    return (
      <>
        <main className="bg-white w-full h-screen flex overflow-auto" >
            <Navbar />
            <section className="w-full h-full flex flex-col">
              <Profilbar />
              <div className='w-full h-full background_color flex justify-center items-center'>
                <div className="flex flex-col w-full h-full p-4 ml-[300px] text-black overflow-auto">
                 <h3>Tableau de bord</h3>
                 < CarteStatistique />
                 < Graphe />
                </div>
              </div>
            </section>
          </main>
      </>
    );
  }