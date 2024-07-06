import React from 'react';

const TourismByDistrict = ({ tourismData }) => {
  if (!tourismData || tourismData.length === 0) {
    return <p>ไม่พบสถานที่ท่องเที่ยวในอำเภอนี้</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">สถานที่ท่องเที่ยวในอำเภอ {tourismData[0]?.district_name || 'ไม่ทราบ'}</h1>
      <ul>
        {tourismData.map((place) => (
          <li key={place.id} className="mb-4 p-4 border rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{place.name}</h2>
            <p>{place.description}</p>
            <p><strong>Location:</strong> {place.location}</p>
            <p><strong>Category:</strong> {place.category_name}</p>

            {place.images && (
              <div className="image-gallery">
                <p><strong>Images:</strong></p>
                {place.images.split(',').map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={place.name}
                    className="w-full h-auto rounded-lg shadow-md mb-2"
                  />
                ))}
              </div>
            )}

            {place.seasons && (
              <p className="text-sm text-gray-500">
                <strong>ฤดูกาลที่เหมาะสม:</strong> {place.seasons.split(',').join(', ')}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TourismByDistrict;
