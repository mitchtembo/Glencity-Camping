import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import BookingWidget from '../components/BookingWidget';
import accommodations from '../data/accommodations.json';

const HomePage = () => {
  const navigate = useNavigate();

  const handleSearch = (criteria) => {
    const { checkIn, checkOut, guests } = criteria;
    const available = accommodations.filter(acc => {
      const isBooked = acc.bookings.some(booking => {
        const bookingStart = new Date(booking.from);
        const bookingEnd = new Date(booking.to);
        const searchStart = new Date(checkIn);
        const searchEnd = new Date(checkOut);
        return (searchStart < bookingEnd && searchEnd > bookingStart);
      });
      return acc.capacity >= guests && !isBooked;
    });

    if (available.length > 0) {
      navigate('/accommodation', { state: { results: available } });
    } else {
      alert('No accommodations available for the selected dates.');
    }
  };

  return (
    <main className="flex-1">
      <section className="relative">
        <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
        <div className="min-h-[560px] flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat p-8 relative z-10" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1671832757677-40b3480cc169?q=80&w=1487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")'}}>
          <div className="flex flex-col gap-4 text-center max-w-3xl">
            <h1 className="text-white text-5xl font-black leading-tight tracking-[-0.033em] md:text-6xl">Escape to Glencity Camping Site</h1>
            <p className="text-white text-base font-light leading-relaxed md:text-lg">Experience the tranquility of nature with our luxurious chalet rentals. Book your stay today and create unforgettable memories.</p>
          </div>
          <div className="w-full flex justify-center items-center mt-8">
            <div className="bg-white bg-opacity-95 rounded-2xl shadow-2xl w-full max-w-md md:max-w-3xl px-4 py-5 md:px-8 md:py-8">
              <BookingWidget onSearch={handleSearch} />
            </div>
          </div>
        </div>
      </section>
      <section className="px-6 md:px-10 lg:px-20 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[#0e171b] text-3xl font-bold leading-tight tracking-[-0.015em] mb-8 text-center">Browse Accommodations and Activities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link to="/accommodation" className="flex flex-col gap-4 rounded-xl overflow-hidden shadow-lg bg-white transition-transform hover:scale-105 duration-300">
              <div className="w-full bg-center bg-no-repeat aspect-video bg-cover" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCJlYcjcDVticP6136L03ATlgL0BHXYf41uAeuWzAUobAABZLNTaYN4m6U1uEEg2ebuwZ2MuEYs-qC6TEMMvm7MsaRJynhtq9g1qB_RWwVpUnOlbSwIFr2MafS-Vg7IzuCpxdMpr55ELDkuYvK2zAefL41Vg98cSyOsJs5EA9UKIOniVXdz0mWOE72fP_1mu5ut4xiTrrFSj03IFG5zx1sii3fYvIDKxSTZDbGLWCLX2i6QXZCU0wXhfo6lIFUd5vb_SPmaHpJMICii")'}}></div>
              <div className="p-5">
                <h3 className="text-[#0e171b] text-lg font-semibold leading-normal mb-1">Mountain View Chalet</h3>
                <p className="text-[#4e8397] text-sm font-normal leading-relaxed">Wake up to breathtaking mountain vistas in this charming chalet, perfect for nature lovers.</p>
                <span className="mt-3 inline-block text-[#19abe5] text-sm font-medium">View Details</span>
              </div>
            </Link>
            <Link to="/accommodation" className="flex flex-col gap-4 rounded-xl overflow-hidden shadow-lg bg-white transition-transform hover:scale-105 duration-300">
              <div className="w-full bg-center bg-no-repeat aspect-video bg-cover" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBHX_Ldp7g3ehAJtXx99VgVHf58m932cF3PYOcgBiT_QTLtwo6sgWuVoYAR-5g9nClHXzBuz4PEu1x4Z6LLKjm7d_Ji1qXwOU9L0ZaqKFNr5CuVmRKRL-0eZozWBEVhoZVVHW720j4yYI2E5_8mfH3TzccZf64Pcn-eWTumX71OXGSUTvUUeVwLWqCf51PplIYYNdfzTOYp_SWc4_TAeqXmw_xJ4sdTrWPwSc-wCU5KxjBoYYMJX8u07vXVspbGbMAxHls467jVLycr")'}}></div>
              <div className="p-5">
                <h3 className="text-[#0e171b] text-lg font-semibold leading-normal mb-1">Shared Dormitory</h3>
                <p className="text-[#4e8397] text-sm font-normal leading-relaxed">Affordable and social, our dorms are great for solo travelers or groups on a budget.</p>
                <span className="mt-3 inline-block text-[#19abe5] text-sm font-medium">View Details</span>
              </div>
            </Link>
            <Link to="/activities" className="flex flex-col gap-4 rounded-xl overflow-hidden shadow-lg bg-white transition-transform hover:scale-105 duration-300">
              <div className="w-full bg-center bg-no-repeat aspect-video bg-cover" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBHX_Ldp7g3ehAJtXx99VgVHf58m932cF3PYOcgBiT_QTLtwo6sgWuVoYAR-5g9nClHXzBuz4PEu1x4Z6LLKjm7d_Ji1qXwOU9L0ZaqKFNr5CuVmRKRL-0eZozWBEVhoZVVHW720j4yYI2E5_8mfH3TzccZf64Pcn-eWTumX71OXGSUTvUUeVwLWqCf51PplIYYNdfzTOYp_SWc4_TAeqXmw_xJ4sdTrWPwSc-wCU5KxjBoYYMJX8u07vXVspbGbMAxHls467jVLycr")'}}></div>
              <div className="p-5">
                <h3 className="text-[#0e171b] text-lg font-semibold leading-normal mb-1">Quad Biking</h3>
                <p className="text-[#4e8397] text-sm font-normal leading-relaxed">Explore rugged trails and scenic landscapes on our thrilling quad bike adventures.</p>
                <span className="mt-3 inline-block text-[#19abe5] text-sm font-medium">View Details</span>
              </div>
            </Link>
          </div>
        </div>
      </section>
      <section className="px-6 md:px-10 lg:px-20 py-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[#0e171b] text-3xl font-bold leading-tight tracking-[-0.015em] mb-8 text-center">Special Offers</h2>
          <div className="space-y-8">
            <div className="flex flex-col lg:flex-row items-center bg-white rounded-xl shadow-lg overflow-hidden">
              <img src="https://plus.unsplash.com/premium_photo-1670152411569-7cbc00946857?q=80&w=1615&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Early Bird Discount" className="w-full lg:w-1/2 h-64 lg:h-auto object-cover" />
              <div className="w-full lg:w-1/2 p-6 lg:p-8">
                <h3 className="text-[#0e171b] text-xl font-bold leading-tight tracking-[-0.015em] mb-2">Early Bird Discount</h3>
                <p className="text-[#4e8397] text-base font-normal leading-relaxed mb-4">Book your stay at least 30 days in advance and receive a 15% discount on your total booking.</p>
                <button className="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-[#19abe5] text-white text-sm font-medium leading-normal hover:bg-[#138ac2] transition-colors">
                  <span className="truncate">Learn More</span>
                </button>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row items-center bg-white rounded-xl shadow-lg overflow-hidden">
              <img src="https://images.unsplash.com/photo-1586294310498-2f435576fc4b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Weekend Getaway Package" className="w-full lg:w-1/2 h-64 lg:h-auto object-cover lg:order-last" />
              <div className="w-full lg:w-1/2 p-6 lg:p-8 lg:order-first">
                <h3 className="text-[#0e171b] text-xl font-bold leading-tight tracking-[-0.015em] mb-2">Weekend Getaway Package</h3>
                <p className="text-[#4e8397] text-base font-normal leading-relaxed mb-4">Enjoy a 3-night stay with complimentary breakfast and a guided nature walk.</p>
                <button className="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-[#19abe5] text-white text-sm font-medium leading-normal hover:bg-[#138ac2] transition-colors">
                  <span className="truncate">Learn More</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
