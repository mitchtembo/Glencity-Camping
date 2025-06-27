import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import accommodationsData from '../data/accommodations.json';

const BookingPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const { checkIn, checkOut } = location.state || {};

  const [accommodation, setAccommodation] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    const selectedAccommodation = accommodationsData.find(acc => acc.id === parseInt(id));
    setAccommodation(selectedAccommodation);
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails(prev => ({ ...prev, [name]: value }));
  };

  const calculateNights = (dateIn, dateOut) => {
    if (!dateIn || !dateOut) return 0;
    const dIn = new Date(dateIn);
    const dOut = new Date(dateOut);
    const diffTime = Math.abs(dOut - dIn);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1; // Ensure at least 1 night if dates are same
  };

  const nights = calculateNights(checkIn, checkOut);
  const totalPrice = accommodation ? accommodation.price * nights : 0;

  const handleConfirmBooking = () => {
    // Basic validation
    if (!bookingDetails.name || !bookingDetails.email) {
      alert('Please fill in your name and email.');
      return;
    }
    // In a real app, this would involve API calls to payment gateway and backend
    console.log('Booking confirmed for:', accommodation, 'Dates:', checkIn, '-', checkOut, 'Details:', bookingDetails, 'Total:', totalPrice);
    setIsConfirmed(true);
    // TODO: Update accommodations.json or backend to reflect new booking
  };

  if (!accommodation) {
    return (
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 text-center">
        <p>Loading accommodation details...</p>
      </main>
    );
  }

  if (isConfirmed) {
    return (
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-xl p-6 md:p-8 text-center">
          <h2 className="text-3xl font-bold text-green-600 mb-4">Booking Confirmed!</h2>
          <p className="text-gray-700 mb-2">Thank you for booking <strong>{accommodation.name}</strong>.</p>
          <p className="text-gray-600 mb-2">Check-in: {checkIn || 'Not specified'}</p>
          <p className="text-gray-600 mb-2">Check-out: {checkOut || 'Not specified'}</p>
          <p className="text-gray-600 mb-2">Total Price: ${totalPrice}</p>
          <p className="text-gray-600 mb-4">A confirmation email has been sent to {bookingDetails.email}.</p>
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Your Booking QR Code:</h4>
            {/* Placeholder for QR Code - In a real app, generate this */}
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BookingID-123-Acc-${accommodation.id}-From-${checkIn}-To-${checkOut}`}
              alt="Booking QR Code"
              className="mx-auto border p-2 rounded-md"
            />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Complete Your Booking</h2>
          <p className="mt-4 text-lg leading-6 text-gray-600">
            You're booking <strong>{accommodation.name}</strong> from <strong>{checkIn || 'N/A'}</strong> to <strong>{checkOut || 'N/A'}</strong> ({nights} night{nights === 1 ? '' : 's'}).
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Accommodation Details & Price Summary */}
          <div>
            <section className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Accommodation Details</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <img src={accommodation.image} alt={accommodation.name} className="w-full h-48 object-cover rounded-md mb-4" />
                <h4 className="text-xl font-bold text-gray-900">{accommodation.name}</h4>
                <p className="text-gray-600">{accommodation.type} - Up to {accommodation.capacity} guests</p>
                <p className="text-lg font-semibold text-[#b2d7e5] mt-2">${accommodation.price} <span className="text-sm font-normal text-gray-500">/ night</span></p>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Price Summary</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-700">{accommodation.price} x {nights} night{nights === 1 ? '' : 's'}</p>
                  <p className="text-gray-900 font-semibold">${accommodation.price * nights}</p>
                </div>
                {/* Add other fees like service fee, taxes if applicable */}
                <hr className="my-2"/>
                <div className="flex justify-between items-center font-bold text-lg">
                  <p className="text-gray-800">Total</p>
                  <p className="text-[#19abe5]">${totalPrice}</p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: User Details & Payment */}
          <div>
            <section className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Your Details</h3>
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input type="text" name="name" id="name" value={bookingDetails.name} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#19abe5] focus:border-[#19abe5] sm:text-sm h-10 px-3" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input type="email" name="email" id="email" value={bookingDetails.email} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#19abe5] focus:border-[#19abe5] sm:text-sm h-10 px-3" required />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number (Optional)</label>
                  <input type="tel" name="phone" id="phone" value={bookingDetails.phone} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#19abe5] focus:border-[#19abe5] sm:text-sm h-10 px-3" />
                </div>
              </div>
            </section>

            <section className="mb-8"> {/* Changed from Payment Section for now */}
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Payment</h3>
              {/* Placeholder for payment form */}
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700">Payment gateway integration will be here.</p>
                <p className="text-sm text-gray-500 mt-2">For now, clicking "Confirm and Book" will simulate a successful booking.</p>
              </div>
            </section>

            <div className="mt-8 text-center">
              <button
                onClick={handleConfirmBooking}
                className="w-full px-8 py-3 bg-[#19abe5] hover:bg-[#138ac2] text-white text-lg font-semibold rounded-lg transition-colors"
              >
                Confirm and Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookingPage;
