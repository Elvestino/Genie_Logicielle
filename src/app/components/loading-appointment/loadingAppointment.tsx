import Image from "next/image";

export default function LoadingAppointment(){
    return(
        <>
            <div className='w-full h-full flex flex-col items-center justify-center gap-3'>
                <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 bleu_border"></div>
                <h1 className='text-xl text-black'>
                   Preparation des données...
                </h1>
            </div>
        </>
    );
}