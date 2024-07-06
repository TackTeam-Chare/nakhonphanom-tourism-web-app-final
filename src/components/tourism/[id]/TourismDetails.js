
'use client';
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
    </div>

  );
};

export default TourismDetailsByIdComponent;
