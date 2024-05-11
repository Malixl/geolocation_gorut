import React from 'react';
import { HiMapPin } from 'react-icons/hi2';
import { NavLink } from 'react-router-dom';

function LandingPage() {
  return (
    <main className="">

      <section className="bg-white relative isolate">
        <div className="backgorund-image -z-10 w-full h-full absolute" />
        <div
          className="grid max-w-screen-xl min-h-screen px-8 py-8  mx-auto lg:gap-8 xl:gap-0 items-center justify-center lg:grid-cols-12 h-full"
        >
          <div className="mr-auto place-self-center lg:col-span-6">
            <h1 className="max-w-2xl text-slate-900 mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
              GIS Pemetaan Lahan Pertanian Kab.Gorut
            </h1>
            <p className="max-w-2xl mb-6 font-light text-slate-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Sistem
              Informasi Geografis Pemetaan Lahan Pertanian Kabupaten Gorontalo Utara
            </p>
            <div className="flex">
              <NavLink
                href="asdas"
                className="inline-flex  items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-full bg-color-primary-500 hover:bg-color-primary-600"
                to="/DataSpasial"
              >
                Data Spasial
                <svg
                  className="w-5 h-5 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </NavLink>
              <NavLink
                href="asdas"
                className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white rounded-full hover:bg-color-danger-600 bg-color-danger-500"
                to="/DataTabular"
              >
                Data Tabular
              </NavLink>
            </div>
          </div>
          <div className=" lg:mt-0 lg:col-span-6 lg:flex items-center justify-center relative">
            <img src="/hero/heroimage.png" alt="heroimage" className="w-3/5 drop-shadow-lg" />
            <div className="flex items-center gap-x-2 ps-2 pe-8 py-2 bg-color-primary-500 rounded-full rounded-br-none absolute top-32 left-0">
              <div className="p-4 bg-white rounded-full">
                <HiMapPin className="w-6 h-6 text-color-primary-500" />
              </div>
              <div className="flex flex-col text-white">
                <p className="font-semibold">Lahan Pertanian</p>
                <span>123km/segi</span>
              </div>
            </div>
            <div className="flex flex-row-reverse items-center gap-x-2 pe-2 ps-8 py-2 bg-color-warning-500 rounded-full rounded-bl-none absolute right-0">
              <div className="p-4 bg-white rounded-full">
                <HiMapPin className="w-6 h-6 text-color-warning-500" />
              </div>
              <div className="flex flex-col text-white">
                <p className="font-semibold">Lahan Pertanian</p>
                <span>123km/segi</span>
              </div>
            </div>
            <div className="flex items-center gap-x-2 ps-2 pe-8 py-2 bg-color-danger-500 rounded-full rounded-br-none absolute bottom-56 left-0">
              <div className="p-4 bg-white rounded-full">
                <HiMapPin className="w-6 h-6 text-color-danger-500" />
              </div>
              <div className="flex flex-col text-white">
                <p className="font-semibold">Lahan Pertanian</p>
                <span>123km/segi</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

  );
}

export default LandingPage;
