/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-redundant-roles */
import React from 'react';
import { useNavigate } from 'react-router-dom';

const people = [
  {
    name: 'Abdul Malik Matoha',
    role: 'Frontend Developer',
    imageUrl: '/teams/malik.png',
  },
  {
    name: 'Moh. Rafiq Daud',
    role: 'Frontend Developer',
    imageUrl: '/teams/rafiq.jpg',
  },
  {
    name: 'Agung Saputra',
    role: 'Designer',
    imageUrl: '/teams/agung.png',
  },
  {
    name: 'Syifa nurafni hidayat',
    role: 'Copywriter',
    imageUrl: '/teams/syifa.png',
  },
  {
    name: 'Cakra Yudha Pratama',
    role: 'Designer',
    imageUrl: '/teams/cakra.png',
  },
];

function Team() {
  const navigate = useNavigate();

  return (
    <div className="bg-white py-24 sm:py-32 flex flex-col items-center justify-center min-h-screen">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Tim WebGIS Gorut</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Selamat datang di halaman tim WebGIS Gorontalo Utara! Di sini, Anda dapat mengenal lebih dekat orang-orang yang bekerja keras di belakang layar untuk membawa Anda pengalaman WebGIS yang luar biasa.
          </p>
        </div>
        <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          {people.map((person) => (
            <li key={person.name}>
              <div className="flex items-center gap-x-6">
                <img className="w-16 h-16 rounded-full" src={person.imageUrl} alt="" />
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                  <p className="text-sm font-semibold leading-6 text-indigo-600">{person.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        onClick={() => navigate('/')}
        className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white rounded-full bg-blue-500 mt-8"
      >
        Kembali
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
      </button>
    </div>
  );
}

export default Team;
