import { FiArrowRight, FiCompass, FiZap, FiGift, FiHome } from 'react-icons/fi';
import { BsTwitter } from 'react-icons/bs';
import buidldspace from '../assets/buildspace.svg';
import tec from '../assets/tec.svg';
import position1 from '../assets/position-1.svg';
import position2 from '../assets/position-2.svg';
import position3 from '../assets/position-3.svg';
import position4 from '../assets/position-4.svg';
import user from '../assets/user.svg';
import miniWeek from '../assets/mini-week.svg';
import weekCard from '../assets/week-card.svg';
import path from '../assets/path.svg';
import userMiniCard1 from '../assets/user-mini-card-1.svg';
import userMiniCard2 from '../assets/user-mini-card-2.svg';
import userMiniCard3 from '../assets/user-mini-card-3.svg';
import stats from '../assets/stats.svg';

import React from 'react';

import { Form } from '../Form';
import { Link } from 'react-router-dom';
import { Gradient } from '../components/ui/Gradient';
import { Logo } from '../components/ui/Logo';
import { useGetProfile } from '../hooks/useGetProfile';
// TODO: Add SDKs for Firebase products that you want to use

function Landing() {
  const { data, error, isLoading } = useGetProfile();

  const renderButtonsNavbar = () => {
    if (!data?.success) {
      return (
        <Link to={'/signup'} className="btn btn-ghost space-x-2">
          <FiZap size={24} />
          <span>Registrate</span>
        </Link>
      );
    } else if (data?.success) {
      return (
        <Link to={'/home'} className="btn btn-ghost space-x-2">
          <FiHome size={24} />
          <span>Inicio</span>
        </Link>
      );
    }
  };
  return (
    <div className="scroll-smooth	">
      {/* Navbar */}
      <div className="sticky top-0 z-30 backdrop-blur bg-base-100 bg-opacity-40 rounded-b-3xl">
        <div className="max-w-6xl m-auto">
          <div className="navbar">
            <div className="flex-1">
              <a
                className="btn btn-ghost normal-case text-xl gap-2 "
                href="#top"
              >
                <Logo />
              </a>
            </div>
            <div className="flex-none">{renderButtonsNavbar()}</div>
          </div>
        </div>
      </div>
      {/* Hero */}
      <div className="min-h-screen h-screen static" id="top">
        <div className="flex justify-start items-center h-full max-w-6xl mx-auto ">
          <div className="max-w-2xl ">
            <div>
              <h1 className="text-6xl font-bold">
                Optimiza y administra el proceso de contratación de tu empresa
              </h1>
              <p className="py-6 max-w-4xl">
                Hacemos que el proceso de contratación sea más{' '}
                <span className="font-bold">fácil</span> y{' '}
                <span className="font-bold">eficiente</span>. <br /> Te ayudamos
                a <span className="font-bold">gestionar</span>,
                <span className="font-bold">documentar</span>, y{' '}
                <span className="font-bold">sincronizar</span> tu talento.
              </p>
              <Link to={'/signup'} className="btn btn-primary shadow-2xl gap-2">
                Empieza tu prueba gratis
                <FiArrowRight size={24} />
              </Link>
            </div>
          </div>
        </div>
        <div className="h-screen absolute -top-20 -z-20  skew-y-3 rounded-b-3xl overflow-hidden">
          <Gradient />
        </div>
      </div>
      {/* Partners */}
      <div className="pt-40">
        <div className="max-w-6xl m-auto">
          <div className="font-bold text-center pb-8">
            Ellos confían en nosotros
          </div>
          <div className="flex justify-center">
            <div className="inline-flex justify-center items-center gap-8">
              <img
                className="h-12 w-auto text-red-700 fill-current"
                src={buidldspace}
              />
              <img
                className="h-12 w-auto text-red-700 fill-current"
                src={tec}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Introduction */}
      <div className="pt-80 max-w-6xl m-auto">
        <div className="flex flex-row space-x-12">
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <p className="text-lg font-bold">Plataforma completa</p>
              <h2 className="text-5xl font-bold">
                Un software integrado para tu proceso de contratación
              </h2>
            </div>

            <p>
              Administra tus posiciones en un solo lugar, dale seguimiento a tus
              candidatos y sincroniza a tu equipo mientras seleccionas al mejor
              talento para tu empresa.
            </p>
            <p>
              Somos una solución integral para todos tus procesos de
              contratación, desde la publicación de vacantes hasta la selección
              de los candidatos. Nuestra plataforma te permite publicar y
              administrar tus vacantes y sus currículums, calificar a los
              postulantes, programar entrevistas, crear y compartir comentarios
              entre los miembros de tu equipo y mucho más.
            </p>
          </div>
          <div className="flex-1 ">
            <div className="grid grid-cols-2 gap-4 mt-12">
              <img
                src={position1}
                className="shadow-2xl hover:scale-105 duration-300 transition-all"
              />
              <img
                src={position2}
                className="shadow-2xl hover:scale-105 duration-300 transition-all"
              />
              <img
                src={position3}
                className="shadow-2xl hover:scale-105 duration-300 transition-all"
              />
              <img
                src={position4}
                className="shadow-2xl hover:scale-105 duration-300 transition-all"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Features */}
      <div className="pt-80 max-w-6xl m-auto">
        <div className="space-y-4 max-w-2xl">
          <p className="text-lg font-bold">Soluciones a tu medida</p>
          <h2 className="text-5xl font-bold">
            Da seguimiento a tus candidatos y mantén a tu equipo sincronizado
          </h2>
        </div>
        <div className="flex flex-row space-x-20 pt-20">
          <div className="flex-1 space-y-20">
            <div className="p-12 bg-slate-700 rounded-2xl space-y-12 select-none">
              <p className="text-slate-300 text-3xl font-bold">
                <span className="text-white">Visualiza tus candidatos.</span>{' '}
                Haz anotaciones y asignalos a sus diferentes procesos de
                entrevista.
              </p>
              <img
                src={user}
                className="m-auto shadow-2xl hover:scale-105 duration-300 transition-all"
              />
            </div>
            <div className="p-12 bg-slate-700 rounded-2xl space-y-12 select-none">
              <p className="text-slate-300 text-3xl font-bold">
                <span className="text-white">Nos ajustamos a tu proceso.</span>{' '}
                Modifica las etapas de entrevista de acuerdo a las necesidades
                de tu empresa y equipo.
              </p>
              <img
                src={path}
                className="m-auto shadow-2xl hover:scale-105 duration-300 transition-all"
              />
            </div>
          </div>
          <div className="flex-1 space-y-20">
            <div className="p-12 bg-slate-700 rounded-2xl space-y-12">
              <p className="text-slate-300 text-3xl font-bold">
                <span className="text-white">
                  Programa tus entrevistas y llamadas.
                </span>{' '}
                Organiza el calendario de tu equipo y candidatos en un solo
                lugar.
              </p>
              <img
                src={miniWeek}
                className="m-auto shadow-2xl hover:scale-105 duration-300 transition-all"
              />
              <img
                src={weekCard}
                className="m-auto shadow-2xl hover:scale-105 duration-300 transition-all"
              />
            </div>
            <div className="p-12 bg-slate-700 rounded-2xl space-y-12">
              <p className="text-slate-300 text-3xl font-bold">
                <span className="text-white">
                  Administra a tu equipo en tiempo real.
                </span>{' '}
                Obtén notificaciones de los avances realizados y sincroniza a tu
                equipo en un solo lugar.
              </p>
              <img
                src={userMiniCard1}
                className="m-auto shadow-2xl hover:scale-105 duration-300 transition-all"
              />
              <img
                src={userMiniCard2}
                className="m-auto shadow-2xl hover:scale-105 duration-300 transition-all"
              />
              <img
                src={userMiniCard3}
                className="m-auto shadow-2xl hover:scale-105 duration-300 transition-all"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Why Us */}
      <div className="pt-80 max-w-6xl m-auto">
        <div className="space-y-4 max-w-3xl">
          <p className="text-lg font-bold">Por qué nosotros</p>
          <h2 className="text-5xl font-bold">
            Agilizamos una tarea clave para el éxito de tu empresa y analizamos
            los resultados
          </h2>
          <p>
            Nuestras herramientas te permiten analizar tus datos y obtener
            información valiosa para mejorar la eficiencia de tu proceso de
            contratación. Nuestra solución te ayuda a centralizar tu proceso de
            contratación, mientras tomas decisiones informadas al elegir al
            candidato correcto para tu empresa.
          </p>
        </div>
        <img src={stats} className="pt-20 m-auto" />
      </div>
      {/* Form */}
      <Form />
      <div className="mt-80 bg-slate-900 flex flex-col justify-center items-center py-8 space-y-4">
        <a
          className="btn btn-ghost normal-case text-xl gap-2 text-white"
          href="#top"
        >
          <FiCompass size={24} />
          recluta
        </a>
        <div>
          <a
            className="btn btn-outline space-x-2"
            href="https://twitter.com/recluta_app"
          >
            <BsTwitter className="text-blue-400" size={24} />{' '}
            <span className="text-white">Síguenos en Twitter</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Landing;
