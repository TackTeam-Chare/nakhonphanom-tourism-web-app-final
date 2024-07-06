// src/components/nearby/[id]/NearbyTourismDetails.js

import React from 'react';

const NearbyTourismDetails = ({ tourismData, nearbyEntities }) => {
  if (!nearbyEntities || nearbyEntities.length === 0) {
    return <p>ไม่พบสถานที่ท่องเที่ยวใกล้เคียง</p>;
  }

  return (
    <div>
      <h1>สถานที่ตามไอดี</h1>
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
      <h2 className="text-xl font-semibold mb-4">สถานที่ท่องเที่ยวใกล้เคียง</h2>
      <ul>
        {nearbyEntities.map(entity => (
          <li key={entity.id}>
            <p>{entity.name}</p>
            {/* Display more details if needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NearbyTourismDetails;
