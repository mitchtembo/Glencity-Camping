import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import accommodations from '../data/accommodations.json';

const ChaletPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const chalet = accommodations.find((acc) => acc.id === parseInt(id));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!chalet) {
    return <div>Chalet not found</div>;
  }

  const handleBookNow = () => {
    navigate(`/booking/${id}`);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % chalet.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + chalet.images.length) % chalet.images.length);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <h1 className="text-4xl font-bold mb-4">{chalet.name}</h1>
          <div className="relative">
            <img src={chalet.images[currentImageIndex]} alt={`${chalet.name} ${currentImageIndex + 1}`} className="w-full h-auto rounded-lg mb-4" />
            <button onClick={prevImage} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full">‹</button>
            <button onClick={nextImage} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full">›</button>
          </div>
          <div className="flex space-x-2 overflow-x-auto">
            {chalet.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${chalet.name} ${index + 1}`}
                className={`w-24 h-24 object-cover rounded-lg cursor-pointer ${index === currentImageIndex ? 'border-2 border-blue-500' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="sticky top-24">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">About This Chalet</h2>
            <p className="text-lg leading-relaxed">{chalet.description}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
            <ul className="grid grid-cols-2 gap-4">
              {chalet.amenities.map((amenity, index) => (
                <li key={index} className="flex items-center">
                  <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  {amenity}
                </li>
              ))}
            </ul>
          </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Guest Reviews</h2>
              <div>
                <p className="text-lg italic">"A wonderful place for a family getaway. The kids loved it!"</p>
                <p className="text-right font-semibold">- The Moyo Family</p>
              </div>
            </div>
            <button
              onClick={handleBookNow}
              className="w-full bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChaletPage;
