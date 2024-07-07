import React from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import * as L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapID = ({ tourist_entity }) => {
    if (!tourist_entity) {
        return <p>Loading...</p>;
    }

    const { latitude, longitude, name } = tourist_entity;
    const position = [latitude, longitude];

    return (
        <div className="md:container md:mx-auto">
            <h1 className="text-3xl text-center font-black mt-10">Location of {name}</h1>
            <div style={{ width: '100%', height: '500px', marginTop: "50px" }}>
                <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                        <Popup>
                            <strong>{name}</strong><br />
                            {/* You can add more details here if needed */}
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    );
};

export default MapID;
