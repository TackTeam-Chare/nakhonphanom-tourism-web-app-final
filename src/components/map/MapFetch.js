'use client';
import React, { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import * as L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapFetch = () => {
    const [position, setPosition] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setPosition([latitude, longitude]);
                },
                (error) => {
                    console.error("Error getting geolocation: ", error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0,
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, []);

    return (
        <div className="md:container md:mx-auto">
            <h3 className="text-3xl text-center font-black mt-10">Your Current Location</h3>
            <div style={{ width: '100%', height: '500px', marginTop: "70px", marginBottom: "100px" }}>
                {position ? (
                    <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={position}>
                            <Popup>
                                Your current location.
                            </Popup>
                        </Marker>
                    </MapContainer>
                ) : (
                    <p>Loading your location...</p>
                )}
            </div>
        </div>
    );
};

export default MapFetch;
