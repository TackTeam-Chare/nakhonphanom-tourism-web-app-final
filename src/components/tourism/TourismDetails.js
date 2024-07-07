
'use client';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Map_ID from '@/components/map/MapID';
const TourismDetailsByIdComponent = ({ tourismData }) => {
  if (!tourismData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{tourismData.name}</h1>
      <p className="mb-4">{tourismData.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <img src={tourismData.image_path} alt={tourismData.name} className="w-full h-auto rounded-lg shadow-md" />
        <div>
          <h2 className="text-xl font-semibold">Details</h2>
          <p><strong>Category:</strong> {tourismData.category_name}</p>
          <p><strong>District:</strong> {tourismData.district_name}</p>
          {/* Add more fields as needed */}
        </div>
      </div>

      {/* Leaflet Map */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Location on Map</h2>
        <MapContainer center={[tourismData.latitude, tourismData.longitude]} zoom={15} style={{ height: '400px' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[tourismData.latitude, tourismData.longitude]}>
            <Popup>{tourismData.name}</Popup>
          </Marker>
        </MapContainer>
      </div>
      <Map_ID tourist_entities={tourismData[0]} />
    </div>
  );
};

export default TourismDetailsByIdComponent;
