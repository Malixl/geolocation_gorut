import React, { useState } from 'react';
import {
  MapContainer, TileLayer, Marker, Popup, GeoJSON,
} from 'react-leaflet';
import JaringanIri from '../geojson/jaringanIri.json';
import PerbatasanKab from '../geojson/perbatasanKabupaten.json';
import PerbatasanKec from '../geojson/perbatasanKecamatan.json';
import 'leaflet/dist/leaflet.css';

const center = [0.8701328918542846, 122.75682938246875];

function getRandomColor() {
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  return randomColor;
}

function DataSpasial() {
  const { features } = JaringanIri;

  const jaringanFeatures = features.map((feature, index) => (
    <GeoJSON
      key={index.id}
      data={feature}
      style={() => ({ color: getRandomColor(), weight: 2, opacity: 1 })}
    />
  ));

  const [showJaringanIri, setShowJaringanIri] = useState(false);
  const [showPerbatasanKab, setShowPerbatasanKab] = useState(true);
  const [showPerbatasanKec, setShowPerbatasanKec] = useState(true);

  const toggleJaringanIri = () => {
    setShowJaringanIri(!showJaringanIri);
  };

  const togglePerbatasanKab = () => {
    setShowPerbatasanKab(!showPerbatasanKab);
  };

  const togglePerbatasanKec = () => {
    setShowPerbatasanKec(!showPerbatasanKec);
  };

  return (
    <div className="map h-full flex ">
      <MapContainer
        center={center}
        zoom={10}
        scrollWheelZoom={false}
        className="flex-auto"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup.
            {' '}
            <br />
            {' '}
            Easily customizable.
          </Popup>
        </Marker>
        {showJaringanIri && (
          jaringanFeatures
        )}
        {showPerbatasanKab && (
          <GeoJSON
            data={PerbatasanKab}
            style={() => ({ color: 'blue', weight: 2, opacity: 0.3 })}
          />
        )}
        {showPerbatasanKec && (
          <GeoJSON
            data={PerbatasanKec}
            style={() => ({ color: 'red', weight: 2, opacity: 0.3 })}
          />
        )}
      </MapContainer>
      <aside className="bg-white h-screen w-80">
        <p className="text-center p-4 font-bold text-xl">
          WebGIS Gorut
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
        <div className="flex pl-10 gap-3">
          <input
            type="checkbox"
            name="jaringanIriCheckbox"
            id="jaringanIriCheckbox"
            checked={showJaringanIri}
            onChange={toggleJaringanIri}
          />
          <label htmlFor="jaringanIriCheckbox">Jaringan Irigasi</label>
        </div>
      </aside>
    </div>
  );
}

export default DataSpasial;
