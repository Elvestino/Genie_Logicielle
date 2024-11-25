import Profilbar from "../../../components/profilbar/profilbar";
import Navbar from "../../../components/navbar/navbar";
import Statistic from "../../../components/statistic/statistic";
import Active from "./Active";

export default function index() {
    return (
      <>
        <main className="bg-white w-full h-screen flex overflow-hidden" >
        <Navbar />
            <section className="w-full h-full flex flex-col">
            <Profilbar />
              <div className='w-full h-full background_color flex justify-center items-center overflow-auto custom-scrollbar'>
                <div className="flex flex-col w-full h-full p-4 ml-[300px] text-black ">
                <Statistic />
                <Active />
                </div>
              </div>
            </section>
          </main>
      </>
    );
  }