"use client";

import { HiBell } from "react-icons/hi";
import Image from 'next/image';

export default function Profilbar() {

    return (
        <>
            <section className="w-full p-10 flex justify-end items-center gap-5">{/* bg-white w-full h-[60px] fixed top-0 left-0 shadow-md z-50 */}
                <button>
                    <HiBell className="bleu_color" size={30} />
                </button>
                <div className="px-6 h-10 border-l-8 gray_border flex justify-center items-center gap-3">
                    <p className="text-black text-base">nom prenoms</p>
                    <Image
                    src="/images/profil.jpg"
                    alt="Profile Picture"
                    width={60}
                    height={60}
                    className="rounded-full"
                    />
                </div>
            </section>
        </>
    );
}