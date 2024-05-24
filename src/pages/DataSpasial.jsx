/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapContainer, TileLayer, GeoJSON, LayersControl,
} from 'react-leaflet';
import { BiLeftArrowCircle } from 'react-icons/bi';
import dataSawah from '../geojson/dataSawah.json';
import JaringanIrigasi from '../geojson/jaringanIri.json';
import PerbatasanKab from '../geojson/perbatasanKabupaten.json';
import PerbatasanKec from '../geojson/perbatasanKecamatan.json';
import 'leaflet/dist/leaflet.css';

const center = [0.8701328918542846, 122.75682938246875];

function DataSpasial() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const { features } = dataSawah;

  const [kecamatanFeatures, setKecamatanFeatures] = useState([]);
  const [showPerbatasanKab, setShowPerbatasanKab] = useState(true);
  const [showPerbatasanKec, setShowPerbatasanKec] = useState(true);
  const [showJaringanIrigasi, setShowJaringanIrigasi] = useState(false);

  useEffect(() => {
    const kecamatanMap = new Map();

    features.forEach((feature) => {
      const kecamatan = feature.properties.KECAMATAN;
      if (!kecamatanMap.has(kecamatan)) {
        kecamatanMap.set(kecamatan, { visible: false });
      }
    });

    setKecamatanFeatures(Array.from(kecamatanMap));
  }, [features]);

  const togglePerbatasanKab = () => {
    setShowPerbatasanKab(!showPerbatasanKab);
  };

  const togglePerbatasanKec = () => {
    setShowPerbatasanKec(!showPerbatasanKec);
  };

  const toggleJaringanIrigasi = () => {
    setShowJaringanIrigasi(!showJaringanIrigasi);
  };

  const toggleKecamatanVisibility = (kecamatan) => {
    setKecamatanFeatures((prevFeatures) => prevFeatures.map((feature) => {
      if (feature[0] === kecamatan) {
        return [kecamatan, { ...feature[1], visible: !feature[1].visible }];
      }
      return feature;
    }));
  };
  return (
    <div className="map h-full w-full flex isolate">
      <div className="bg-white h-screen flex">
        <div className={` ${open ? 'w-72' : 'w-20 '} bg-dark-purple h-screen p-5 pt-8 relative duration-300`}>
          <div className="flex gap-x-4 items-center py-2">
            <img
              src="/hero/weblogo.png"
              width="50"
              className={`cursor-pointer duration-500 ${
                open && 'rotate-[360deg]'
              }`}
            />
            <h1
              className={`text-center p-4 text-black origin-left font-bold text-xl duration-200 ${
                !open && 'scale-0'
              }`}
            >
              WebGIS Gorut
            </h1>
          </div>
          <BiLeftArrowCircle
            className={`absolute cursor-pointer -right-3 top-24 w-7 bg-blue-300 border-2 rounded-full ${!open && 'rotate-180'}`}
            onClick={() => setOpen(!open)}
          />
          {open && (
          <div className="flex gap-x-4 flex-col items-center">
            <div className="mb-1">
              <h3 className="font-bold text-black">Batas Administarasi</h3>
              <div className="flex gap-3">
                <input
                  type="checkbox"
                  name="PerbatasanKabCheckbox"
                  id="PerbatasanKabCheckbox"
                  checked={showPerbatasanKab}
                  onChange={togglePerbatasanKab}
                />
                <label htmlFor="PerbatasanKabCheckbox" className="text-black">Batas Kabupaten</label>
              </div>
              <div className="flex gap-3">
                <input
                  type="checkbox"
                  name="PerbatasanKecCheckbox"
                  id="PerbatasanKecCheckbox"
                  checked={showPerbatasanKec}
                  onChange={togglePerbatasanKec}
                />
                <label htmlFor="PerbatasanKecCheckbox" className="text-black">Batas Kecamatan</label>
              </div>
            </div>
            <div className="mb-1">
              <h3 className="font-bold text-black">Lahan Sawah</h3>
              {kecamatanFeatures.map(([kecamatan, { visible }]) => (
                <div key={`kecamatan-checkbox-${kecamatan}`} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={visible}
                    onChange={() => toggleKecamatanVisibility(kecamatan)}
                  />
                  <label className="text-black">{kecamatan}</label>
                </div>
              ))}
            </div>
            <div className="mb-1 pr-10">
              <h3 className="font-bold text-black">Lahan Irigasi</h3>
              <div className="flex gap-3">
                <input
                  type="checkbox"
                  name="JaringanIrigasi"
                  id="JaringanIrigasi"
                  checked={showJaringanIrigasi}
                  onChange={toggleJaringanIrigasi}
                />
                <label htmlFor="JaringanIrigasi" className="text-black">Tolinggula</label>
              </div>
            </div>
            <div className="wrapper mt-5 flex justify-center">
              <button
                onClick={() => navigate('/')}
                type="button"
                className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-full bg-blue-500"
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
          </div>
          )}
        </div>
      </div>
      <MapContainer
        center={center}
        zoom={10}
        minZoom={10}
        className="flex-auto -z-10"
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satellite View">
            <TileLayer
              url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}"
              minZoom={0}
              maxZoom={20}
              attribution='&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              ext="jpg"
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        {kecamatanFeatures.map(([kecamatan, { visible }]) => (
          visible && (
            <GeoJSON
              key={`kecamatan-${kecamatan}`}
              data={features.filter((feature) => feature.properties.KECAMATAN === kecamatan)}
              style={() => ({ weight: 2, opacity: 1, color: 'green' })}
            />
          )
        ))}
        {showJaringanIrigasi && (
          <GeoJSON
            data={JaringanIrigasi}
            style={() => ({ color: 'blue', weight: 2, opacity: 1 })}
          />
        )}
        {showPerbatasanKab && (
          <GeoJSON
            data={PerbatasanKab}
            style={() => ({ color: 'gray', weight: 2, opacity: 1 })}
          />
        )}
        {showPerbatasanKec && (
          <GeoJSON
            data={PerbatasanKec}
            style={() => ({ color: 'black', weight: 2, opacity: 1 })}
          />
        )}
      </MapContainer>
    </div>
  );
}

export default DataSpasial;
