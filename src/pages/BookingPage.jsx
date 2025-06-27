import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import QRCode from 'qrcode.react';
import accommodationsData from '../data/accommodations.json'; // We'll need to update this data source
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// Helper function to simulate updating booking data (temporary)
// In a real app, this would be a backend API call.
const updateAccommodationBookings = (accommodationId, newBooking) => {
  // NOTE: This is a client-side simulation and does not persist changes
  // or handle concurrent bookings properly. A backend is required for a real system.
  console.warn("Simulating booking update. Data is not persisted and may lead to inconsistencies.");
  const accommodation = accommodationsData.find(acc => acc.id === parseInt(accommodationId));
  if (accommodation) {
    accommodation.bookings.push(newBooking);
  }
};


const BookingPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [accommodation, setAccommodation] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    const selectedAccommodation = accommodationsData.find(acc => acc.id === parseInt(id));
    setAccommodation(selectedAccommodation);

    if (location.state) {
      setCheckIn(location.state.checkIn || '');
      setCheckOut(location.state.checkOut || '');
    }
  }, [id, location.state]);

  const handlePayment = (e) => {
    e.preventDefault();
    if (!guestName || !guestEmail) {
      alert("Please enter your name and email.");
      return;
    }
    if (!checkIn || !checkOut) {
        alert("Check-in and Check-out dates are required.");
        return;
    }

    // Simulate payment success
    console.log("Simulating payment processing...");

    const newBooking = { from: checkIn, to: checkOut };
    updateAccommodationBookings(id, newBooking); // Simulate updating the bookings

    const details = {
      accommodationName: accommodation.name,
      guestName,
      guestEmail,
      checkIn,
      checkOut,
      totalPrice: accommodation.price * ((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)), // Basic price calculation
    };
    setBookingDetails(details);
    setIsBooked(true);
  };

  if (!accommodation) {
    return <div className="text-center py-10">Accommodation not found.</div>;
  }

  if (isBooked && bookingDetails) {
    const qrCodeValue = `Booking Confirmed for: ${bookingDetails.accommodationName}\nGuest: ${bookingDetails.guestName}\nCheck-in: ${bookingDetails.checkIn}\nCheck-out: ${bookingDetails.checkOut}\nPrice: $${bookingDetails.totalPrice}`;
    return (
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-xl p-6 md:p-8">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight text-center mb-6">Booking Confirmed!</h2>
          <div className="text-center mb-6">
            <QRCode value={qrCodeValue} size={128} level="H" />
          </div>
          <div className="space-y-3">
            <p><strong>Accommodation:</strong> {bookingDetails.accommodationName}</p>
            <p><strong>Name:</strong> {bookingDetails.guestName}</p>
            <p><strong>Email:</strong> {bookingDetails.guestEmail}</p>
            <p><strong>Check-in:</strong> {bookingDetails.checkIn}</p>
            <p><strong>Check-out:</strong> {bookingDetails.checkOut}</p>
            <p><strong>Total Price:</strong> ${bookingDetails.totalPrice.toFixed(2)}</p>
            <p className="text-sm text-gray-600 mt-4">A confirmation email (simulated) has been sent to {bookingDetails.guestEmail}.</p>
          </div>
          <Button onClick={() => navigate('/')} className="w-full mt-8 h-11 bg-[#19abe5] hover:bg-[#138ac2] text-white">
            Back to Home
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-xl rounded-xl p-6 md:p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Book Your Stay</h2>
            <p className="mt-2 text-lg text-gray-600">You are booking: <strong>{accommodation.name}</strong></p>
          </div>

          <form onSubmit={handlePayment} className="space-y-6">
            <div>
              <img src={accommodation.image} alt={accommodation.name} className="w-full h-64 object-cover rounded-lg mb-4" />
              <p className="text-lg font-semibold text-[#b2d7e5]">${accommodation.price} <span className="text-sm font-normal text-gray-500">/ night</span></p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="check-in" className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</Label>
                <Input
                  id="check-in"
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  required
                  className="w-full h-12 rounded-md border-gray-300"
                />
              </div>
              <div>
                <Label htmlFor="check-out" className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</Label>
                <Input
                  id="check-out"
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  required
                  className="w-full h-12 rounded-md border-gray-300"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="guest-name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</Label>
              <Input
                id="guest-name"
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                required
                className="w-full h-12 rounded-md border-gray-300"
                placeholder="Your Name"
              />
            </div>

            <div>
              <Label htmlFor="guest-email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</Label>
              <Input
                id="guest-email"
                type="email"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                required
                className="w-full h-12 rounded-md border-gray-300"
                placeholder="your.email@example.com"
              />
            </div>

            <div className="pt-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Payment Details</h3>
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <p className="text-gray-600">Payment gateway integration is not yet implemented.</p>
                <p className="text-sm text-gray-500">Clicking "Confirm & Pay" will simulate a successful booking.</p>
              </div>
            </div>

            <Button type="submit" className="w-full h-12 px-8 bg-[#19abe5] hover:bg-[#138ac2] text-white text-lg font-semibold">
              Confirm & Pay
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default BookingPage;
