/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import {
  MapContainer, TileLayer, Marker, Popup, GeoJSON,
} from 'react-leaflet';
import JaringanIri from '../geojson/jaringanIri.json';
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
      key={index}
      data={feature}
      style={() => ({ color: getRandomColor(), weight: 2, opacity: 1 })}
    />
  ));

  const [showJaringanIri, setShowJaringanIri] = useState(false);

  const toggleJaringanIri = () => {
    setShowJaringanIri(!showJaringanIri);
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
      </MapContainer>
      <aside className="bg-white h-screen w-80">
        <p className="text-center p-4 font-bold text-xl">
          WebGIS Gorut
        </p>
        <div className="list pl-4 gap-3 flex">
          <input className="" type="checkbox" name="" id="" />
          <label htmlFor="">Batas Wilayah</label>
        </div>
        <div className="list flex pl-10 gap-3">
          <input
            type="checkbox"
            name="jaringanIriCheckbox"
            id="jaringanIriCheckbox"
            onChange={toggleJaringanIri}
          />
          <label htmlFor="jaringanIriCheckbox">Jaringan Irigasi</label>
        </div>
      </aside>
    </div>
  );
}

export default DataSpasial;
