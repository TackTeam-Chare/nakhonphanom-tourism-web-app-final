import React from 'react';

const HistoryComponent = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
            ประวัติความเป็นมา จังหวัดนครพนม
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            จังหวัดนครพนม ตั้งอยู่ทางภาคตะวันออกเฉียงเหนือของประเทศไทย ริมฝั่งแม่น้ำโขงที่แบ่งเขตแดนระหว่างประเทศไทยและประเทศลาว มีความสำคัญทางประวัติศาสตร์และวัฒนธรรมอย่างยิ่ง มีที่ตั้งเป็นแหล่งท่องเที่ยวที่น่าสนใจ
            เนื่องจากเป็นจังหวัดที่มีความหลากหลายทางวัฒนธรรม ศิลปะ และประเพณีท้องถิ่นที่น่าสนใจมากมาย
          </p>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">ประวัติศาสตร์</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              จังหวัดนครพนมมีประวัติศาสตร์ยาวนานย้อนหลังไปถึงสมัยก่อนประวัติศาสตร์ หลายแหล่งโบราณคดีที่สำคัญถูกค้นพบในพื้นที่นี้ เช่น เมืองเก่านครพนมที่มีการค้นพบหลักฐานการอยู่อาศัยของมนุษย์มาตั้งแต่สมัยก่อนประวัติศาสตร์
              ในสมัยกรุงศรีอยุธยา นครพนมเป็นศูนย์กลางการค้าและวัฒนธรรมที่สำคัญของภาคตะวันออกเฉียงเหนือ เนื่องจากมีการเชื่อมโยงการค้ากับประเทศลาวและประเทศเวียดนาม
            </p>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">วัฒนธรรมและประเพณี</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              นครพนมเป็นจังหวัดที่มีความหลากหลายทางวัฒนธรรม เนื่องจากมีประชากรหลากหลายชนเผ่าอาศัยอยู่ร่วมกันอย่างกลมกลืน มีการอนุรักษ์และส่งเสริมประเพณีและวัฒนธรรมท้องถิ่น
              เช่น ประเพณีบั้งไฟพญานาค ประเพณีบุญบั้งไฟ ประเพณีสงกรานต์ และประเพณีบูชาพญานาคที่น่าสนใจ
            </p>
          </div>
          <div className="text-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Nakhon_Phanom_Clock_Tower.jpg/800px-Nakhon_Phanom_Clock_Tower.jpg"
              alt="Nakhon Phanom Clock Tower"
              className="w-full max-w-md mx-auto rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
            />
            <p className="mt-4 text-sm text-gray-500">หอนาฬิกา จังหวัดนครพนม</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryComponent;
