/* eslint-disable react/button-has-type */
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../components/Table';
import dataSawah from '../geojson/dataSawah.json';

function DataTabular() {
  const navigate = useNavigate();
  const geoJSON = dataSawah;
  const features = useMemo(
    () => (geoJSON
      ? geoJSON.features
        .map((feature) => feature.properties)
        .filter(
          (value, index, self) => self.findIndex((t) => t.DESA === value.DESA) === index,
        )
      : []),
    [geoJSON],
  );
  return (
    <section className="bg-color-primary-500 text-white">
      <div className="container mx-auto px-4 py-8 max-w-screen-lg flex flex-col gap-y-4 justify-center items-center min-h-screen">
        <h1 className="text-center text-3xl font-bold uppercase">
          webgis lahan pertanian
        </h1>
        <h2 className="my-2 text-center text-lg font-bold uppercase">
          dinas pertanian kabupaten gorontalo utara
        </h2>
        <Table data={features} />
        <button
          onClick={() => navigate('/')}
          className="inline-flex  items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-color-primary-500 rounded-full bg-white"
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
    </section>
  );
}

export default DataTabular;
