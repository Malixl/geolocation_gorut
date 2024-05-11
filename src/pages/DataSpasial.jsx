/* eslint-disable import/no-unresolved */
import React from 'react';
import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';
import { Marker } from 'react-leaflet/Marker';
import { Popup } from 'react-leaflet/Popup';
import { GeoJSON } from 'react-leaflet';
import JaringanIri from '../geojson/jaringanIri.json';
import 'leaflet/dist/leaflet.css';

const center = [0.8701328918542846, 122.75682938246875];

function DataSpasial() {
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
        <GeoJSON
          data={JaringanIri}
          style={() => ({ color: '#ff0000', weight: 2, opacity: 1 })}
        />
      </MapContainer>
      <aside className="bg-white h-screen w-80" />
    </div>

  );
}

export default DataSpasial;
