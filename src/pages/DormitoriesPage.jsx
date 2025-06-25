import React from 'react';

const DormitoriesPage = () => {
  return (
    <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Book Your Dormitory Stay</h2>
          <p className="mt-4 text-lg leading-6 text-gray-600">
            Experience the camaraderie of shared living spaces, perfect for groups and budget-conscious travelers.
          </p>
        </div>
        <div className="bg-white shadow-xl rounded-xl p-6 md:p-8 mb-12">
          <form className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <label className="flex flex-col">
              <p className="text-gray-800 text-sm font-semibold mb-1">Check-in Date</p>
              <div className="relative">
                <span className="material-icons-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"> calendar_today </span>
                <input className="form-input pl-10 flex w-full rounded-lg text-gray-900 border-gray-300 focus:border-[#b2d7e5] focus:ring focus:ring-[#b2d7e5]/50 h-12 placeholder:text-gray-400 text-base" placeholder="Select date" type="date"/>
              </div>
            </label>
            <label className="flex flex-col">
              <p className="text-gray-800 text-sm font-semibold mb-1">Check-out Date</p>
              <div className="relative">
                <span className="material-icons-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"> calendar_today </span>
                <input className="form-input pl-10 flex w-full rounded-lg text-gray-900 border-gray-300 focus:border-[#b2d7e5] focus:ring focus:ring-[#b2d7e5]/50 h-12 placeholder:text-gray-400 text-base" placeholder="Select date" type="date"/>
              </div>
            </label>
            <label className="flex flex-col">
              <p className="text-gray-800 text-sm font-semibold mb-1">Number of Beds</p>
              <div className="relative">
                <span className="material-icons-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"> bed </span>
                <select className="form-select pl-10 flex w-full rounded-lg text-gray-900 border-gray-300 focus:border-[#b2d7e5] focus:ring focus:ring-[#b2d7e5]/50 h-12 placeholder:text-gray-400 text-base">
                  <option disabled="" selected="" value="">Select beds</option>
                  <option value="1">1 Bed</option>
                  <option value="2">2 Beds</option>
                  <option value="3">3 Beds</option>
                  <option value="4">4 Beds</option>
                  <option value="5">5+ Beds</option>
                </select>
              </div>
            </label>
            <button className="md:col-span-3 mt-4 flex items-center justify-center gap-2 w-full h-12 px-6 bg-[#b2d7e5] text-white text-base font-bold rounded-lg hover:bg-[#a1c3d0] transition-colors focus:outline-none focus:ring-2 focus:ring-[#b2d7e5] focus:ring-offset-2" type="submit">
              <span className="material-icons-outlined">search</span>
              Search Availability
            </button>
          </form>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 tracking-tight mb-8 px-1">Available Dormitories</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row group">
            <div className="md:w-2/5 h-64 md:h-auto bg-center bg-no-repeat bg-cover" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC8NGsUVE5KtZKqEzt52-z0klAkKIYIA5j6BZM5DYJB3cMi3xo7OLBteljhVkFa_ytgX5eFtt4zTyqD1j2xG5UBm0ShIt9sbKjOeQemB9xMnUC0jj6JZZ8bFZWQd6R_jtRDYWb4x8h-eYkffY-cgoYGQqrMJADakhZkuClHSh4aROKwoaUMcmm5X9rGosmQgqpRH5g8NhBJba-pB1-lpSgh8jjaqXzV1DCMl4WbzuvlCzIdUG_UnmY0esQPxXsctRLcTTDgiBp-hKo_")'}}></div>
            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">Cozy Corner Dorm</h4>
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                  A vibrant and social space with comfortable bunk beds, individual lockers, and shared bathroom facilities. Perfect for meeting fellow adventurers.
                </p>
                <p className="text-lg font-semibold text-[#b2d7e5] mb-3">$25 <span className="text-sm font-normal text-gray-500">/ bed / night</span></p>
              </div>
              <button className="mt-auto flex items-center justify-center gap-2 w-full md:w-auto h-11 px-6 bg-[#b2d7e5] text-white text-sm font-bold rounded-lg hover:bg-[#a1c3d0] transition-colors">
                <span className="material-icons-outlined text-lg">shopping_cart</span>
                Book Now
              </button>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row group">
            <div className="md:w-2/5 h-64 md:h-auto bg-center bg-no-repeat bg-cover" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA7tXJ63BgFdEh8sL4Xy1_6iuZMJJKMYWuWliwabjC7EqVkj_JkpuwRw15DImMlkpRPfDcfr-XXpbp3U0HDhbn_LwQPPlEBMpU9symNPstiA31o6XMeRclDAhL4iTKZoP0joTbKC9YDUW6BfYpkLCwpixux1wLOnliofUzUnsoxCkkHBlBFe5qw_8ApxChnoDk_ngssMk0_07jv0rCbliP-kvhkYekCb2ToRMqpZx1amULhnhotD2Q6dX-xxES-ftVbJrTv2XYe4m1")'}}></div>
            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">Nature Nook Dorm</h4>
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                  Enjoy a peaceful stay in our nature-themed dorm, featuring large windows with scenic views, reading nooks, and a relaxed atmosphere.
                </p>
                <p className="text-lg font-semibold text-[#b2d7e5] mb-3">$30 <span className="text-sm font-normal text-gray-500">/ bed / night</span></p>
              </div>
              <button className="mt-auto flex items-center justify-center gap-2 w-full md:w-auto h-11 px-6 bg-[#b2d7e5] text-white text-sm font-bold rounded-lg hover:bg-[#a1c3d0] transition-colors">
                <span className="material-icons-outlined text-lg">shopping_cart</span>
                Book Now
              </button>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row group">
            <div className="md:w-2/5 h-64 md:h-auto bg-center bg-no-repeat bg-cover" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC743ciAB3VokgDPmy625Uu8WYxFmF1MTYBnhAVrFYKJWjpvxiYJtDzkX8YRR4B56_A5uF3qA2HXge4rIAT1gm2lXcXFXupGvvBnVgFQTsBWpYLQbeD6UVptuoMVkHVB74lyCEPGnz3C-Pebd-9IsSF3QFZyKlmESLdlLWplDHJaJBcJMVJIjbjYZ4v-Wrj8AcT5giLzaOGb4k98ea0W74qcA_UFLzlJ5eKlyGhtPTHGwvYuP8RLNeVvELVKpFFOACFdXqJery-AMLQ")'}}></div>
            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">Adventure Base Dorm</h4>
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                  Designed for the active traveler, this dorm offers easy access to all our activities, with a communal area for planning your next adventure.
                </p>
                <p className="text-lg font-semibold text-[#b2d7e5] mb-3">$28 <span className="text-sm font-normal text-gray-500">/ bed / night</span></p>
              </div>
              <button className="mt-auto flex items-center justify-center gap-2 w-full md:w-auto h-11 px-6 bg-[#b2d7e5] text-white text-sm font-bold rounded-lg hover:bg-[#a1c3d0] transition-colors">
                <span className="material-icons-outlined text-lg">shopping_cart</span>
                Book Now
              </button>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row group">
            <div className="md:w-2/5 h-64 md:h-auto bg-center bg-no-repeat bg-cover" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAPIjkyxGG3msONAy4SLV0M4G8YsXIXzXnTViZLhD3eY0YQeN8u_xMIGdhVayM1w2BPG9RckVZ-A_wJXeX5GSPY3aM6gNBd29csWyXhYR26ndWtZ7ac007KeVqSOTDwG1yjVMK1yoO6sl8mZ5uW484Pw2UuGVURDKS0xDOu2lWW8NfAgVfQ3afV06GcaMo32_NtJYntGCLEMEtY-8v01IMO5-zixczJH6hcR2IhDahhaAl-ML2BGbJcMTa3F2asd3mstxs6H7_bFaWC")'}}></div>
            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">Sunset View Dorm</h4>
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                  Wake up to breathtaking sunset views in this dorm, equipped with extra-wide bunk beds, a lounge area, and a balcony overlooking the campsite.
                </p>
                <p className="text-lg font-semibold text-[#b2d7e5] mb-3">$35 <span className="text-sm font-normal text-gray-500">/ bed / night</span></p>
              </div>
              <button className="mt-auto flex items-center justify-center gap-2 w-full md:w-auto h-11 px-6 bg-[#b2d7e5] text-white text-sm font-bold rounded-lg hover:bg-[#a1c3d0] transition-colors">
                <span className="material-icons-outlined text-lg">shopping_cart</span>
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DormitoriesPage;
