import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { AlertTriangle, Check } from 'lucide-react';
import accommodationsData from '../data/accommodations.json'; // We'll need to update this data source
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  validateBookingDates, 
  getTodayDate, 
  getTomorrowDate,
  calculateNights,
  formatValidationErrors 
} from '../utils/dateValidation';

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
  const [validationErrors, setValidationErrors] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Get today's date in YYYY-MM-DD format
  const today = getTodayDate();

  useEffect(() => {
    const selectedAccommodation = accommodationsData.find(acc => acc.id === parseInt(id));
    setAccommodation(selectedAccommodation);

    if (location.state) {
      setCheckIn(location.state.checkIn || '');
      setCheckOut(location.state.checkOut || '');
    }
  }, [id, location.state]);

  const handleDateChange = (type, value) => {
    if (type === 'checkIn') {
      setCheckIn(value);
      // Auto-adjust checkout if it's before or equal to new check-in
      if (checkOut && value >= checkOut) {
        const nextDay = new Date(value);
        nextDay.setDate(nextDay.getDate() + 1);
        setCheckOut(nextDay.toISOString().split('T')[0]);
      }
    } else {
      setCheckOut(value);
    }
    
    // Clear errors when user makes changes
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  const validateForm = () => {
    const errors = [];
    
    // Validate guest information
    if (!guestName.trim()) {
      errors.push("Guest name is required");
    }
    if (!guestEmail.trim()) {
      errors.push("Email address is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestEmail)) {
      errors.push("Please enter a valid email address");
    }
    
    // Validate dates
    const dateValidation = validateBookingDates(checkIn, checkOut);
    if (!dateValidation.isValid) {
      errors.push(...dateValidation.errors);
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      nights: dateValidation.isValid ? dateValidation.nights : 0
    };
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Validate form
    const validation = validateForm();
    
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      setIsProcessing(false);
      return;
    }

    // Clear any previous errors
    setValidationErrors([]);

    // Simulate payment processing delay
    setTimeout(() => {
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
        nights: validation.nights,
        totalPrice: accommodation.price * validation.nights,
      };
      
      setBookingDetails(details);
      setIsBooked(true);
      setIsProcessing(false);
    }, 1500); // 1.5 second delay to simulate processing
  };

  if (!accommodation) {
    return <div className="text-center py-10">Accommodation not found.</div>;
  }

  if (isBooked && bookingDetails) {
    const qrCodeValue = `Booking Confirmed for: ${bookingDetails.accommodationName}\nGuest: ${bookingDetails.guestName}\nCheck-in: ${bookingDetails.checkIn}\nCheck-out: ${bookingDetails.checkOut}\nNights: ${bookingDetails.nights}\nPrice: $${bookingDetails.totalPrice.toFixed(2)}`;
    return (
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-xl p-6 md:p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Booking Confirmed!</h2>
            <p className="text-gray-600 mt-2">Your reservation has been successfully processed</p>
          </div>
          
          <div className="text-center mb-6">
            <QRCodeSVG value={qrCodeValue} size={128} level="H" />
          </div>
          
          <div className="space-y-3 bg-gray-50 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Accommodation</p>
                <p className="font-semibold">{bookingDetails.accommodationName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Guest Name</p>
                <p className="font-semibold">{bookingDetails.guestName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Check-in</p>
                <p className="font-semibold">{bookingDetails.checkIn}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Check-out</p>
                <p className="font-semibold">{bookingDetails.checkOut}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="font-semibold">{bookingDetails.nights} night{bookingDetails.nights !== 1 ? 's' : ''}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Price</p>
                <p className="font-semibold text-[#19abe5]">${bookingDetails.totalPrice.toFixed(2)}</p>
              </div>
            </div>
            <div className="border-t pt-4 mt-4">
              <p className="text-sm text-gray-600">Confirmation sent to: <span className="font-medium">{bookingDetails.guestEmail}</span></p>
            </div>
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
            {/* Display validation errors */}
            {validationErrors.length > 0 && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div className="text-sm text-red-700">
                    <div className="font-medium mb-2">Please fix the following issues:</div>
                    <ul className="list-disc list-inside space-y-1">
                      {validationErrors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <div>
              <img src={accommodation.image} alt={accommodation.name} className="w-full h-64 object-cover rounded-lg mb-4" />
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold text-[#b2d7e5]">${accommodation.price} <span className="text-sm font-normal text-gray-500">/ night</span></p>
                {checkIn && checkOut && validationErrors.length === 0 && (
                  <p className="text-sm text-gray-600">
                    {calculateNights(checkIn, checkOut)} night{calculateNights(checkIn, checkOut) !== 1 ? 's' : ''} = 
                    <span className="font-semibold text-[#19abe5] ml-1">
                      ${(accommodation.price * calculateNights(checkIn, checkOut)).toFixed(2)}
                    </span>
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="check-in" className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</Label>
                <Input
                  id="check-in"
                  type="date"
                  value={checkIn}
                  onChange={(e) => handleDateChange('checkIn', e.target.value)}
                  min={today}
                  required
                  className={`w-full h-12 rounded-md border-gray-300 ${
                    validationErrors.some(error => error.toLowerCase().includes('check-in')) 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                      : ''
                  }`}
                />
              </div>
              <div>
                <Label htmlFor="check-out" className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</Label>
                <Input
                  id="check-out"
                  type="date"
                  value={checkOut}
                  onChange={(e) => handleDateChange('checkOut', e.target.value)}
                  min={checkIn || getTomorrowDate()}
                  required
                  className={`w-full h-12 rounded-md border-gray-300 ${
                    validationErrors.some(error => error.toLowerCase().includes('check-out')) 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                      : ''
                  }`}
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
                className={`w-full h-12 rounded-md border-gray-300 ${
                  validationErrors.some(error => error.toLowerCase().includes('name')) 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                    : ''
                }`}
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
                className={`w-full h-12 rounded-md border-gray-300 ${
                  validationErrors.some(error => error.toLowerCase().includes('email')) 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                    : ''
                }`}
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

            <Button 
              type="submit" 
              disabled={isProcessing}
              className="w-full h-12 px-8 bg-[#19abe5] hover:bg-[#138ac2] disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-lg font-semibold transition-colors"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing...
                </div>
              ) : (
                'Confirm & Pay'
              )}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default BookingPage;
