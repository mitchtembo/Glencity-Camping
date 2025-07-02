import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const ChaletPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { checkIn, checkOut } = location.state || {};
  const { isAuthenticated } = useAuth();
  const [chalet, setChalet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchChalet = async () => {
      if (!id || id === 'undefined') {
        setError('Invalid chalet ID');
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5000/api/accommodations/${id}`);
        setChalet(res.data);
      } catch (err) {
        setError('Chalet not found');
      } finally {
        setLoading(false);
      }
    };

    fetchChalet();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!chalet) {
    return <div>Chalet not found</div>;
  }

  const handleBookNow = () => {
    if (isAuthenticated) {
      navigate(`/booking/${id}`, { state: { checkIn, checkOut } });
    } else {
      // Store booking data before redirecting to login
      const bookingData = {
        accommodationId: id,
        checkIn,
        checkOut,
        accommodationName: chalet.name
      };
      localStorage.setItem('pendingBookingData', JSON.stringify(bookingData));
      navigate(`/login?redirect=/booking/${id}`);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % chalet.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + chalet.images.length) % chalet.images.length);
  };

  const amenityIcons = {
    "Geysers": <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-500" fill="currentColor" viewBox="0 0 1024 1024"><g><g><path d="M513.35,436.41c-31.97,0-61.24-15.08-78.85-40.84c-11.85-17.33-16.77-36.76-14.21-56.19c1.33-10.12,4.38-19.73,7.34-29.02    c1.27-3.99,2.58-8.12,3.71-12.14c4.28-15.33,4.71-26.9,1.37-36.42c-1.06-3.03-0.08-6.4,2.44-8.38c2.52-1.98,6.02-2.15,8.72-0.4    l1.06,0.69c9.19,4.64,16.3,12.52,20.42,21.71c0.96-4.52,1.5-9.19,1.88-13.79c0.12-1.5,0.24-3.01,0.35-4.53    c0.98-12.81,1.98-26.06,8.45-38.14c6.62-12.37,19.22-22.89,34.57-28.87c2.83-1.1,6.04-0.39,8.14,1.8c2.1,2.19,2.67,5.43,1.45,8.21    c-6.38,14.5,2.08,31.02,6.02,37.44c4.23,6.91,9.4,13.19,14.88,19.84c4.47,5.43,9.09,11.04,13.21,17.08    c3.36,4.93,6.8,10.89,9.36,17.51c0.87-7.03,0.36-14.22-1.64-21.02c-0.99-3.38,0.5-6.99,3.58-8.69c3.09-1.7,6.94-1.02,9.25,1.63    c25.4,29.01,35.39,68.16,26.09,102.19c-7.1,25.93-25.64,48.88-49.59,61.42c-10.33,5.41-21.86,8.38-34.25,8.83    C515.85,436.39,514.6,436.41,513.35,436.41z M449.89,278.2c-0.3,9.06-2.26,17.48-4.1,24.06c-1.2,4.29-2.55,8.54-3.86,12.66    c-2.89,9.06-5.61,17.62-6.76,26.42c-2.07,15.71,1.98,31.54,11.71,45.77c15.38,22.48,41.42,35.29,69.67,34.25    c10.14-0.37,19.51-2.77,27.85-7.13c20.32-10.64,36.05-30.11,42.07-52.09c5.87-21.47,2.69-45.44-8.18-66.67    c-1.7,11.47-6.27,22.53-13.42,31.71c-2.2,2.82-6.08,3.7-9.28,2.1c-3.2-1.6-4.82-5.25-3.87-8.7c3.97-14.4-4.46-29.78-9.83-37.67    c-3.73-5.48-7.94-10.59-12.39-15.99c-5.56-6.76-11.32-13.74-16.09-21.54c-7.04-11.49-10.6-23.34-10.49-34.28    c-5.94,4.22-10.68,9.35-13.67,14.94c-4.97,9.29-5.82,20.42-6.72,32.2c-0.12,1.55-0.24,3.09-0.36,4.63    c-1.2,14.36-3.99,30.76-15.65,43.6c-2.3,2.52-6.01,3.18-9.03,1.6c-3.02-1.58-4.6-5.01-3.83-8.33    C455.35,292.49,453.77,284.65,449.89,278.2z" /></g><g><g><path d="M512,682.25c-29.88,0-54.18-24.3-54.18-54.18s24.31-54.18,54.18-54.18s54.18,24.31,54.18,54.18S541.88,682.25,512,682.25     z M512,588.89c-21.6,0-39.18,17.58-39.18,39.18c0,21.6,17.58,39.18,39.18,39.18c21.6,0,39.18-17.58,39.18-39.18     C551.18,606.47,533.6,588.89,512,588.89z" /></g><g><rect x="518.45" y="598.57" transform="matrix(0.7073 -0.7069 0.7069 0.7073 -272.1359 554.8897)" width="31.12" height="15" /></g></g><g><g><rect x="466.41" y="722.26" width="27.24" height="15" /></g><g><rect x="530.35" y="722.26" width="27.24" height="15" /></g></g><g><path d="M710.93,796.36H313.07c-36.81,0-66.76-29.94-66.76-66.75V160.35c0-36.81,29.94-66.75,66.75-66.75h397.87    c36.81,0,66.75,29.94,66.75,66.75v569.26C777.68,766.42,747.74,796.36,710.93,796.36z M313.06,108.6    c-28.54,0-51.75,23.21-51.75,51.75v569.26c0,28.54,23.22,51.75,51.76,51.75h397.86c28.54,0,51.75-23.21,51.75-51.75V160.35    c0-28.54-23.21-51.75-51.75-51.75H313.06z" /></g><g><path d="M612.06,862.28h-200.1c-11.57,0-22.92-4-31.94-11.26l-69.93-56.32c-2.48-2-3.43-5.33-2.37-8.33s3.89-5.01,7.07-5.01    h394.44c3.18,0,6.02,2.01,7.07,5.01s0.11,6.34-2.37,8.33L644,851.02C634.98,858.28,623.63,862.28,612.06,862.28z M336.06,796.36    l53.36,42.98c6.37,5.12,14.37,7.94,22.54,7.94h200.1c8.17,0,16.17-2.82,22.54-7.94l53.36-42.98H336.06z" /></g><g><path d="M627.36,796.36H396.64c-4.14,0-7.5-3.36-7.5-7.5v-212.4c0-32.17,26.17-58.34,58.34-58.34h129.04    c32.17,0,58.34,26.17,58.34,58.34v212.4C634.86,793,631.5,796.36,627.36,796.36z M404.14,781.36h215.72v-204.9    c0-23.9-19.44-43.34-43.34-43.34H447.48c-23.9,0-43.34,19.44-43.34,43.34V781.36z" /></g><g><path d="M476.84,895.25H426.3c-4.14,0-7.5-3.36-7.5-7.5v-32.96c0-4.14,3.36-7.5,7.5-7.5h50.54c4.14,0,7.5,3.36,7.5,7.5v32.96    C484.34,891.89,480.98,895.25,476.84,895.25z M433.8,880.25h35.54v-17.96H433.8V880.25z" /></g><g><path d="M464.21,930.4h-25.27c-4.14,0-7.5-3.36-7.5-7.5v-35.16c0-4.14,3.36-7.5,7.5-7.5h25.27c4.14,0,7.5,3.36,7.5,7.5v35.16    C471.71,927.04,468.35,930.4,464.21,930.4z M446.44,915.4h10.27v-20.16h-10.27V915.4z" /></g><g><path d="M597.7,895.25h-50.54c-4.14,0-7.5-3.36-7.5-7.5v-32.96c0-4.14,3.36-7.5,7.5-7.5h50.54c4.14,0,7.5,3.36,7.5,7.5v32.96    C605.2,891.89,601.84,895.25,597.7,895.25z M554.66,880.25h35.54v-17.96h-35.54V880.25z" /></g><g><path d="M585.06,930.4h-25.27c-4.14,0-7.5-3.36-7.5-7.5v-35.16c0-4.14,3.36-7.5,7.5-7.5h25.27c4.14,0,7.5,3.36,7.5,7.5v35.16    C592.56,927.04,589.21,930.4,585.06,930.4z M567.29,915.4h10.27v-20.16h-10.27V915.4z" /></g><g><rect x="318.28" y="270.29" width="15" height="174.69" /></g><g><rect x="318.28" y="211.6" width="15" height="29.67" /></g></g></svg>,
    "Solar Power": <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-12.66l-.7.7M4.04 19.96l-.7.7M21 12h-1M4 12H3m15.66 8.66l-.7-.7M4.04 4.04l-.7-.7" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18a6 6 0 100-12 6 6 0 000 12z" /></svg>,
    "Gas Cooker": <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S3 11.687 3 15a9 9 0 009 9c3.313 0 7.657-4.343 7.657-4.343z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14a2 2 0 100-4 2 2 0 000 4z" /></svg>,
    "Wi-Fi": <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.556A5.5 5.5 0 0112 15a5.5 5.5 0 013.889 1.556M12 12v.01" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.89 12.444A9.5 9.5 0 0112 10a9.5 9.5 0 017.11 2.444" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 20s3.5-6 10-6 10 6 10 6" /></svg>,
    "Private Patio": <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
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
                  {amenityIcons[amenity] || <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>}
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
