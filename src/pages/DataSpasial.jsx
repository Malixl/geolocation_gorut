import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapContainer, TileLayer, GeoJSON, LayersControl,
} from 'react-leaflet';
import dataSawah from '../geojson/dataSawah.json';
import PerbatasanKab from '../geojson/perbatasanKabupaten.json';
import PerbatasanKec from '../geojson/perbatasanKecamatan.json';
import 'leaflet/dist/leaflet.css';

const center = [0.8701328918542846, 122.75682938246875];

function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function DataSpasial() {
  const navigate = useNavigate();
  const { features } = dataSawah;

  const [desaFeatures, setDesaFeatures] = useState([]);
  const [kecamatanFeatures, setKecamatanFeatures] = useState([]);
  const [showPerbatasanKab, setShowPerbatasanKab] = useState(true);
  const [showPerbatasanKec, setShowPerbatasanKec] = useState(true);

  useEffect(() => {
    const desaMap = new Map();
    const kecamatanMap = new Map();

    features.forEach((feature) => {
      const desa = feature.properties.DESA;
      const kecamatan = feature.properties.KECAMATAN;
      if (!desaMap.has(desa)) {
        desaMap.set(desa, { visible: false, color: getRandomColor() });
      }
      if (!kecamatanMap.has(kecamatan)) {
        kecamatanMap.set(kecamatan, { visible: false, color: getRandomColor() });
      }
    });

    setDesaFeatures(Array.from(desaMap));
    setKecamatanFeatures(Array.from(kecamatanMap));
  }, [features]);

  // const toggleDesaVisibility = (desa) => {
  //   setDesaFeatures((prevFeatures) => prevFeatures.map((feature) => {
  //     if (feature[0] === desa) {
  //       return [desa, { ...feature[1], visible: !feature[1].visible }];
  //     }
  //     return feature;
  //   }));
  // };

  const togglePerbatasanKab = () => {
    setShowPerbatasanKab(!showPerbatasanKab);
  };

  const togglePerbatasanKec = () => {
    setShowPerbatasanKec(!showPerbatasanKec);
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
    <div className="map h-full flex isolate">
      <MapContainer
        center={center}
        zoom={10}
        className="flex-auto -z-10"
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer checked={false} name="Satellite View">
            <TileLayer
              url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}"
              minZoom={0}
              maxZoom={20}
              attribution='&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              ext="jpg"
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        {desaFeatures.map(([desa, { visible, color }]) => (
          visible && (
            <GeoJSON
              key={`desa-${desa}`}
              data={features.filter((feature) => feature.properties.DESA === desa)}
              style={() => ({ color, weight: 2, opacity: 1 })}
            />
          )
        ))}
        {kecamatanFeatures.map(([kecamatan, { visible, color }]) => (
          visible && (
            <GeoJSON
              key={`kecamatan-${kecamatan}`}
              data={features.filter((feature) => feature.properties.KECAMATAN === kecamatan)}
              style={() => ({ color, weight: 2, opacity: 1 })}
            />
          )
        ))}
        {showPerbatasanKab && (
          <GeoJSON
            data={PerbatasanKab}
            style={() => ({ color: 'gray', weight: 2, opacity: 1 })}
          />
        )}
        {showPerbatasanKec && (
          <GeoJSON
            data={PerbatasanKec}
            style={() => ({ color: 'black', weight: 2, opacity: 3 })}
          />
        )}
      </MapContainer>
      <aside className="bg-white h-screen w-80 overflow-y-auto">
        <p className="text-center p-4 font-bold text-xl">
          Lahan Pertanian Gorut
        </p>
        <div className="flex flex-col pl-4 mb-1">
          <div className="flex gap-3">
            <input
              type="checkbox"
              name="PerbatasanKabCheckbox"
              id="PerbatasanKabCheckbox"
              checked={showPerbatasanKab}
              onChange={togglePerbatasanKab}
            />
            <label htmlFor="PerbatasanKabCheckbox">Batas Kabupaten</label>
          </div>
          <div className="flex gap-3">
            <input
              type="checkbox"
              name="PerbatasanKecCheckbox"
              id="PerbatasanKecCheckbox"
              checked={showPerbatasanKec}
              onChange={togglePerbatasanKec}
            />
            <label htmlFor="PerbatasanKecCheckbox">Batas Kecamatan</label>
          </div>
        </div>
        <div className="pl-10 mb-1">
          <h3>Kecamatan</h3>
          {kecamatanFeatures.map(([kecamatan, { visible, color }]) => (
            <div key={`kecamatan-checkbox-${kecamatan}`} className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={visible}
                onChange={() => toggleKecamatanVisibility(kecamatan)}
              />
              <label style={{ color }}>{kecamatan}</label>
            </div>
          ))}
        </div>
        {/* <div className="pl-10 mb-1">
            <h3>Desa</h3>
            {desaFeatures.map(([desa, { visible, color }]) => (
              <div key={`desa-checkbox-${desa}`} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={visible}
                  onChange={() => toggleDesaVisibility(desa)}
                />
                <label style={{ color }}>{desa}</label>
              </div>
            ))}
          </div> */}
        <div className="wrapper mt-5 flex items-center">
          <button onClick={() => navigate('/')} type="button" className="inline-flex  items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-full bg-blue-500">
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
      </aside>
    </div>
  );
}

export default DataSpasial;
