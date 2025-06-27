import React from 'react';

const ContactPage = () => {
  return (
    <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Contact Us</h2>
          <p className="mt-4 text-lg leading-6 text-gray-600">
            Your paradise is just a short drive away @ GlenCity Camping Retreat 40km from Harare CBD
          </p>
        </div>
        <div className="bg-white shadow-xl rounded-xl p-6 md:p-8 mb-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 tracking-tight mb-4">Make your booking</h3>
          <p className="text-lg text-gray-600 mb-2">
            Call or App: <a href="tel:+263719445110" className="text-[#b2d7e5] hover:underline">+263 719 445 110</a>
          </p>
          <p className="text-lg text-gray-600">
            Email: <a href="mailto:glencitysda@gmail.com" className="text-[#b2d7e5] hover:underline">glencitysda@gmail.com</a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
