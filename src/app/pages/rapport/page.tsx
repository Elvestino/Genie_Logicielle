import Navbar from "../../components/navbar/navbar";
import Profilbar from "../../components/profilbar/profilbar";
import Filtre from "./Filtre";
import TableauComplexe from "./TableauComplexe";
import Tables from "./Tables";


export default function report() {
    return (
      <>
        <main className="bg-white w-full h-screen flex overflow-hidden">
            <Navbar />
            <section className="w-full h-full flex flex-col">
              <Profilbar />
              <div className='w-full h-full background_color flex justify-center items-center '>
                <div className="flex flex-col w-full h-full p-4 ml-[300px] text-black overflow-auto custom-scrollbar ">
                 <Tables />
                 {/*
                 <Filtre />
                 <TableauComplexe />
    */}
                </div>
              </div>
            </section>
          </main>
      </>
    );
  }