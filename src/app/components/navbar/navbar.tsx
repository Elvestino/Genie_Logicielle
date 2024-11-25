"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { IoList, IoMenuSharp, IoPersonAddOutline } from 'react-icons/io5';
import { MdOutlineBedroomParent, MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowRight, MdOutlineViewAgenda } from 'react-icons/md';
import { AiOutlineDashboard, AiOutlineFileAdd, AiOutlineLineChart } from 'react-icons/ai';
import { BsBarChart } from 'react-icons/bs';
import { FiActivity, FiArchive } from 'react-icons/fi';
import { LiaCalendarPlusSolid, LiaDoorOpenSolid, LiaFileMedicalAltSolid, LiaUserInjuredSolid } from 'react-icons/lia';
import { GoFile } from 'react-icons/go';
import { GrInProgress } from 'react-icons/gr';

export default function Navbar() {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

    const toggleMenu = (menu: string): void => {
        setActiveMenu(activeMenu === menu ? null : menu);
    };

    const toggleMobileMenu = (): void => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        if (activeMenu) setActiveMenu(null);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            if (event.target instanceof Node) {
                const menuElement = document.getElementById('mobile-menu');
                const menuButton = document.getElementById('mobile-menu-button');
                if (menuElement && !menuElement.contains(event.target) && !menuButton?.contains(event.target)) {
                    setIsMobileMenuOpen(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className='className="w-full fixed z-10'>
                  <div className="w-full md:px-10 px-2 py-8 bg-white flex justify-between items-center">
        <h1 className="text-black text-3xl font-bold hidden md:block">Clinick</h1>
        <button 
          id="mobile-menu-button"
          className="md:hidden block text-3xl px-2" 
          onClick={toggleMobileMenu}
        >
          <IoMenuSharp />
        </button>
      </div>
            <div className='hidden md:flex md:w-72 md:px-3 md:py-5 md:flex-col md:items-center md:gap-2 md:h-screen md:bg-white md:relative'>
                <button className={`w-full px-4 py-2 text-left flex justify-between items-center gap-4 text-xl ${activeMenu === 'dashboard' ? 'bleu_color' : 'text-black'}`} onClick={() => toggleMenu('dashboard')}>
                <AiOutlineDashboard className='text-2xl'/>
          Dashboard
          {activeMenu === 'dashboard' ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowRight />}
                </button>
                {activeMenu === 'dashboard' && (
          <div className="w-full px-10 py-2 text-left text-black flex flex-col gap-2 text-xl bg-gray-100">
            <Link href="/pages/statistique/synthese" className="w-full px-4 py-2 text-left flex items-center gap-4 bleu_color">
              <AiOutlineLineChart />
              Statistiques
            </Link>
            <Link href="/pages/rapport" className="w-full px-4 py-2 text-left flex items-center gap-4 bleu_color">
              <BsBarChart />
              Rapport
            </Link>
          </div>
        )}

        <button 
          className={`w-full px-4 py-2 text-left flex justify-between items-center gap-4  text-xl ${activeMenu === 'patient' ? 'bleu_color' : 'text-black'}`}
          onClick={() => toggleMenu('patient')}
        >
          <LiaUserInjuredSolid className='text-3xl' />
          Patient
          {activeMenu === 'patient' ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowRight />}
        </button>

        {activeMenu === 'patient' && (
          <div className="w-full px-10 py-2 text-left text-black flex flex-col gap-2 text-xl bg-gray-100">
            <Link href="/liste-patient" className="w-full px-4 py-2 text-left flex items-center gap-4 bleu_color">
              <IoList />
              Liste
            </Link>
            <Link href="/ajout-patient" className="w-full px-4 py-2 text-left flex items-center gap-4 bleu_color">
              <IoPersonAddOutline />
              Ajout
            </Link>
          </div>
        )}
                <button 
          className={`w-full px-4 py-2 text-left flex justify-between items-center gap-4 text-xl ${activeMenu === 'consultation' ? 'bleu_color' : 'text-black'}`}
          onClick={() => toggleMenu('consultation')}
        >
          <GoFile className='text-2xl'/>
          Consultation
          {activeMenu === 'consultation' ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowRight />}
        </button>

        {activeMenu === 'consultation' && (
          <div className="w-full px-10 py-2 text-left text-black flex flex-col gap-2 text-xl bg-gray-100">
            <Link href="/liste-consultation" className="w-full px-4 py-2 text-left flex items-center gap-4 bleu_color">
              <IoList />
              Liste
            </Link>
            <Link href="/ajout-consultation" className="w-full px-4 py-2 text-left flex items-center gap-4 bleu_color">
              <AiOutlineFileAdd />
              Ajout
            </Link>
            <Link href="/archive-consultation" className="w-full px-4 py-2 text-left flex items-center gap-4 bleu_color">
              <FiArchive />
              Archive
            </Link>
          </div>
        )}

        <button 
          className={`w-full px-4 py-2 text-left flex justify-between items-center gap-4 text-xl ${activeMenu === 'rendezvous' ? 'bleu_color' : 'text-black'}`}
          onClick={() => toggleMenu('rendezvous')}
        >
          <LiaCalendarPlusSolid className='text-3xl'/>
          Rendez-vous
          {activeMenu === 'rendezvous' ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowRight />}
        </button>

        {activeMenu === 'rendezvous' && (
          <div className="w-full px-10 py-2 text-left text-black flex flex-col gap-2 text-xl bg-gray-100">
            <Link href="/agenda" className="w-full px-4 py-2 text-left flex items-center gap-4 bleu_color">
              <MdOutlineViewAgenda />
              Agenda
            </Link>
            <Link href="/activite" className="w-full px-4 py-2 text-left flex items-center gap-4 bleu_color">
              <FiActivity />
              Activité
            </Link>
            <Link href="/archive-rendez-vous" className="w-full px-4 py-2 text-left flex items-center gap-4 bleu_color">
              <FiArchive />
              Archive
            </Link>
          </div>
        )}

        <button 
          className={`w-full px-4 py-2 text-left flex justify-between items-center gap-4 text-xl ${activeMenu === 'prescription' ? 'bleu_color' : 'text-black'}`}
          onClick={() => toggleMenu('prescription')}
        >
          <LiaFileMedicalAltSolid className='text-2xl'/>
          Prescription
          {activeMenu === 'prescription' ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowRight />}
        </button>

        {activeMenu === 'prescription' && (
          <div className="w-full px-10 py-2 text-left text-black flex flex-col gap-2 text-xl bg-gray-100">
            <Link href="/liste-prescription" className="w-full px-4 py-2 text-left flex items-center gap-4 bleu_color">
              <IoList />
              Liste
            </Link>
            <Link href="/ajout-prescription" className="w-full px-4 py-2 text-left flex items-center gap-4 bleu_color">
              <AiOutlineFileAdd />
              Ajout
            </Link>
            <Link href="/archive-prescription" className="w-full px-4 py-2 text-left flex items-center gap-4 bleu_color">
              <FiArchive />
              Archive
            </Link>
          </div>
        )}

<button 
          className={`w-full px-4 py-2 text-left flex justify-between items-center gap-4 text-xl ${activeMenu === 'salle' ? 'bleu_color' : 'text-black'}`}
          onClick={() => toggleMenu('salle')}
        >
          <MdOutlineBedroomParent className='text-2xl' />
          Salle
          {activeMenu === 'salle' ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowRight />}
        </button>

        {activeMenu === 'salle' && (
          <div className="w-full px-10 py-2 text-left text-black flex flex-col gap-2 text-xl bg-gray-100">
            <Link href="/liste-salle" className="w-full px-4 py-2 text-left flex items-center gap-4 bleu_color">
              <IoList className='text-2xl' />
              Liste
            </Link>
            <Link href="/ajout-salle" className="w-full px-4 py-2 text-left flex items-center gap-4 bleu_color">
              <LiaDoorOpenSolid className='text-2xl' />
              Occupation
            </Link>
            <Link href="/archive-salle" className="w-full px-4 py-2 text-left flex items-center gap-4 bleu_color">
              <GrInProgress />
              En Cours
            </Link>
            <Link href="/archive-salle" className="w-full px-4 py-2 text-left flex items-center gap-4 bleu_color">
              <FiArchive />
              Archive
            </Link>
          </div>
        )}
            </div>
        </nav>
    );
}