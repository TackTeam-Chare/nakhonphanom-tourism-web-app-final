import React from 'react';

const NearbyTourismListComponent = ({ tourismData, nearbyEntities }) => {
  if (!nearbyEntities || nearbyEntities.length === 0) {
    return <p>ไม่พบสถานที่ท่องเที่ยวใกล้เคียง</p>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">{tourismData.name}</h1>
      <p className="mb-4">{tourismData.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <img src={tourismData.image_path} alt={tourismData.name} className="w-full h-auto rounded-lg shadow-md" />
        <div>
          <h2 className="text-xl font-semibold mb-2">รายละเอียด</h2>
          <p><strong>หมวดหมู่:</strong> {tourismData.category_name}</p>
          <p><strong>เขต:</strong> {tourismData.district_name}</p>
          {/* เพิ่มข้อมูลอื่นๆ ตามที่ต้องการ */}
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-4">สถานที่ท่องเที่ยวใกล้เคียง</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {nearbyEntities.map((entity, index) => (
          <div key={`${entity.id}-${index}`} className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-start">
            <img src={entity.image_path} alt={entity.name} className="w-full h-32 object-cover mb-4 rounded-md" />
            <h3 className="text-lg font-semibold mb-2">Id: {entity.id}</h3>
            <h3 className="text-lg font-semibold mb-2">{entity.name}</h3>
            <p className="text-gray-700 mb-1"><strong>หมวดหมู่:</strong> {entity.category_name}</p>
            <p className="text-gray-700 mb-1"><strong>เขต:</strong> {entity.district_name}</p>
            <p className="text-gray-700 mb-1"><strong>ระยะทาง:</strong> {entity.distance} เมตร</p>
            <p className="text-gray-700 mb-1"><strong>เวลาทำการ:</strong> {entity.opening_time} - {entity.closing_time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyTourismListComponent;
