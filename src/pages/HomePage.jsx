import React from 'react';

const HomePage = () => {
  return (
    <main className="flex-1">
      <section className="relative">
        <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
        <div className="min-h-[560px] flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat p-8 relative z-10" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD0buucPGE-DXXKYOxp3f9oTnRuK8ySkgSBwnFS5hKslI-D2h1ZTbn0X0LqF1u8expkHv4KfNzI4NWxGQIE_6IGPwIndRdBZWEbfJYtVOfYryP8i6FeNw_kYePHCe7CIuEXn4wVTz95H_TZRZ4cG72qybJrY6Fa0sk93fC8E5Xb_vcVdhVAv6l1v1u2cXvc0jIvGOhZoGt0RL9o--mCvynR2QTXFpORmlfVsKkg5jOQPTO8LCrUopIfyki5BUZokj_xW0e-sJdQaOhU")'}}>
          <div className="flex flex-col gap-4 text-center max-w-3xl">
            <h1 className="text-white text-5xl font-black leading-tight tracking-[-0.033em] md:text-6xl">Escape to Glencity Camping Site</h1>
            <p className="text-white text-base font-light leading-relaxed md:text-lg">Experience the tranquility of nature with our luxurious chalets, cozy dormitories, and exciting activities. Book your stay today and create unforgettable memories.</p>
          </div>
          <form className="mt-8 flex flex-col sm:flex-row items-center gap-3 p-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg w-full max-w-xl">
            <div className="relative flex-grow w-full sm:w-auto">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-[#4e8397]">
                <svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px" xmlns="http://www.w3.org/2000/svg">
                  <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                </svg>
              </div>
              <input className="form-input w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0e171b] focus:outline-none focus:ring-2 focus:ring-[#19abe5] border border-[#d0e0e7] bg-white h-12 placeholder:text-[#6b7f87] pl-10 pr-4 text-sm font-normal leading-normal md:text-base" placeholder="Search accommodations..." type="text" />
            </div>
            <button className="flex w-full sm:w-auto min-w-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-[#19abe5] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#138ac2] transition-colors">
              <span className="truncate">Search</span>
            </button>
          </form>
        </div>
      </section>
      <section className="px-6 md:px-10 lg:px-20 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[#0e171b] text-3xl font-bold leading-tight tracking-[-0.015em] mb-8 text-center">Our Accommodations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col gap-4 rounded-xl overflow-hidden shadow-lg bg-white transition-transform hover:scale-105 duration-300">
              <div className="w-full bg-center bg-no-repeat aspect-video bg-cover" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDu4XlOPhEAn8NfWKpG1KURSw8bxe1r3uoAS5XEz_6kWSBw-P9m0qQgg6ZrZlReG_M7-wLw9_ScDigAs5NgVPHrbowTh59RFNnkBlOXIO42tJrb3x1klEzm7Gy-t2SX4Z6VOSQifOvuIRI25mCxWZUaTPmZJa_zhSSMDx2E3gEoZnYnqgpP7qfvfHrb09P7WHM2DaI-zRzEgid_DoA-dZTJXrORUjNgUGo2qzETzILEpHfDjikYeujvU_iZoQasvTtfLPbGbkqVQp5t")'}}></div>
              <div className="p-5">
                <h3 className="text-[#0e171b] text-lg font-semibold leading-normal mb-1">Cozy Cabin</h3>
                <p className="text-[#4e8397] text-sm font-normal leading-relaxed">Perfect for couples or small families, this cabin offers a warm and inviting atmosphere.</p>
                <a className="mt-3 inline-block text-[#19abe5] text-sm font-medium hover:underline" href="#">Book Now</a>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-xl overflow-hidden shadow-lg bg-white transition-transform hover:scale-105 duration-300">
              <div className="w-full bg-center bg-no-repeat aspect-video bg-cover" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBJR_adfTHXnfwCaablGEifmmWAAI9xy59MUNxeVtSYdnoweQ95K4Gl6FIdyzJZQIZVb-NeEOt5jE0Y3xl4UFFzXls3bV2pIktXVyxfK2DXPcx3mgMKECVMQJk-sc_2w4WG1eqdbdmibJrBSTOo52V4pAmUHTuwGQc4MXZbk4PBHR5CqmJhooetXAIQhlbjrsRAhdF4LTaYtlcE75HZOOaNeQHjMh0io2V2tONykRGd2cKcx8I8nsWYbJXZ-r9tviqbcXxmkslHaIAm")'}}></div>
              <div className="p-5">
                <h3 className="text-[#0e171b] text-lg font-semibold leading-normal mb-1">Lakeside Retreat</h3>
                <p className="text-[#4e8397] text-sm font-normal leading-relaxed">Enjoy stunning lake views from this spacious retreat, ideal for a relaxing getaway.</p>
                <a className="mt-3 inline-block text-[#19abe5] text-sm font-medium hover:underline" href="#">Book Now</a>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-xl overflow-hidden shadow-lg bg-white transition-transform hover:scale-105 duration-300">
              <div className="w-full bg-center bg-no-repeat aspect-video bg-cover" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCJlYcjcDVticP6136L03ATlgL0BHXYf41uAeuWzAUobAABZLNTaYN4m6U1uEEg2ebuwZ2MuEYs-qC6TEMMvm7MsaRJynhtq9g1qB_RWwVpUnOlbSwIFr2MafS-Vg7IzuCpxdMpr55ELDkuYvK2zAefL41Vg98cSyOsJs5EA9UKIOniVXdz0mWOE72fP_1mu5ut4xiTrrFSj03IFG5zx1sii3fYvIDKxSTZDbGLWCLX2i6QXZCU0wXhfo6lIFUd5vb_SPmaHpJMICii")'}}></div>
              <div className="p-5">
                <h3 className="text-[#0e171b] text-lg font-semibold leading-normal mb-1">Mountain View Chalet</h3>
                <p className="text-[#4e8397] text-sm font-normal leading-relaxed">Wake up to breathtaking mountain vistas in this charming chalet, perfect for nature lovers.</p>
                <a className="mt-3 inline-block text-[#19abe5] text-sm font-medium hover:underline" href="#">Book Now</a>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-xl overflow-hidden shadow-lg bg-white transition-transform hover:scale-105 duration-300">
              <div className="w-full bg-center bg-no-repeat aspect-video bg-cover" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBHX_Ldp7g3ehAJtXx99VgVHf58m932cF3PYOcgBiT_QTLtwo6sgWuVoYAR-5g9nClHXzBuz4PEu1x4Z6LLKjm7d_Ji1qXwOU9L0ZaqKFNr5CuVmRKRL-0eZozWBEVhoZVVHW720j4yYI2E5_8mfH3TzccZf64Pcn-eWTumX71OXGSUTvUUeVwLWqCf51PplIYYNdfzTOYp_SWc4_TAeqXmw_xJ4sdTrWPwSc-wCU5KxjBoYYMJX8u07vXVspbGbMAxHls467jVLycr")'}}></div>
              <div className="p-5">
                <h3 className="text-[#0e171b] text-lg font-semibold leading-normal mb-1">Shared Dormitory</h3>
                <p className="text-[#4e8397] text-sm font-normal leading-relaxed">Affordable and social, our dorms are great for solo travelers or groups on a budget.</p>
                <a className="mt-3 inline-block text-[#19abe5] text-sm font-medium hover:underline" href="#">Book Now</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="px-6 md:px-10 lg:px-20 py-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[#0e171b] text-3xl font-bold leading-tight tracking-[-0.015em] mb-8 text-center">Exciting Activities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col gap-4 rounded-xl overflow-hidden shadow-lg bg-white transition-transform hover:scale-105 duration-300">
              <div className="w-full bg-center bg-no-repeat aspect-video bg-cover" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBHX_Ldp7g3ehAJtXx99VgVHf58m932cF3PYOcgBiT_QTLtwo6sgWuVoYAR-5g9nClHXzBuz4PEu1x4Z6LLKjm7d_Ji1qXwOU9L0ZaqKFNr5CuVmRKRL-0eZozWBEVhoZVVHW720j4yYI2E5_8mfH3TzccZf64Pcn-eWTumX71OXGSUTvUUeVwLWqCf51PplIYYNdfzTOYp_SWc4_TAeqXmw_xJ4sdTrWPwSc-wCU5KxjBoYYMJX8u07vXVspbGbMAxHls467jVLycr")'}}></div>
              <div className="p-5">
                <h3 className="text-[#0e171b] text-lg font-semibold leading-normal mb-1">Quad Biking</h3>
                <p className="text-[#4e8397] text-sm font-normal leading-relaxed">Explore rugged trails and scenic landscapes on our thrilling quad bike adventures.</p>
                <a className="mt-3 inline-block text-[#19abe5] text-sm font-medium hover:underline" href="#">Learn More & Book</a>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-xl overflow-hidden shadow-lg bg-white transition-transform hover:scale-105 duration-300">
              <div className="w-full bg-center bg-no-repeat aspect-video bg-cover" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBHX_Ldp7g3ehAJtXx99VgVHf58m932cF3PYOcgBiT_QTLtwo6sgWuVoYAR-5g9nClHXzBuz4PEu1x4Z6LLKjm7d_Ji1qXwOU9L0ZaqKFNr5CuVmRKRL-0eZozWBEVhoZVVHW720j4yYI2E5_8mfH3TzccZf64Pcn-eWTumX71OXGSUTvUUeVwLWqCf51PplIYYNdfzTOYp_SWc4_TAeqXmw_xJ4sdTrWPwSc-wCU5KxjBoYYMJX8u07vXVspbGbMAxHls467jVLycr")'}}></div>
              <div className="p-5">
                <h3 className="text-[#0e171b] text-lg font-semibold leading-normal mb-1">Horse Riding</h3>
                <p className="text-[#4e8397] text-sm font-normal leading-relaxed">Enjoy a leisurely horse ride through picturesque fields and forests.</p>
                <a className="mt-3 inline-block text-[#19abe5] text-sm font-medium hover:underline" href="#">Learn More & Book</a>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-xl overflow-hidden shadow-lg bg-white transition-transform hover:scale-105 duration-300">
              <div className="w-full bg-center bg-no-repeat aspect-video bg-cover" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBHX_Ldp7g3ehAJtXx99VgVHf58m932cF3PYOcgBiT_QTLtwo6sgWuVoYAR-5g9nClHXzBuz4PEu1x4Z6LLKjm7d_Ji1qXwOU9L0ZaqKFNr5CuVmRKRL-0eZozWBEVhoZVVHW720j4yYI2E5_8mfH3TzccZf64Pcn-eWTumX71OXGSUTvUUeVwLWqCf51PplIYYNdfzTOYp_SWc4_TAeqXmw_xJ4sdTrWPwSc-wCU5KxjBoYYMJX8u07vXVspbGbMAxHls467jVLycr")'}}></div>
              <div className="p-5">
                <h3 className="text-[#0e171b] text-lg font-semibold leading-normal mb-1">Team Building</h3>
                <p className="text-[#4e8397] text-sm font-normal leading-relaxed">Engage in fun and challenging team-building exercises designed to foster collaboration.</p>
                <a className="mt-3 inline-block text-[#19abe5] text-sm font-medium hover:underline" href="#">Learn More & Book</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="px-6 md:px-10 lg:px-20 py-12 bg-[#f8fbfc]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[#0e171b] text-3xl font-bold leading-tight tracking-[-0.015em] mb-8 text-center">Amenities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col gap-3 items-center text-center">
              <div className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl shadow-md" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDP-A5LW9wnq5kR9Sl2-4PLwfHxzh15VJv6PqyLaF2mR_EGLji7qliv2uZvt3UKqMxJ9e7-ZY9_7kicLgZ0KqXNEJtO80prSjOpjpkhsWbfgdDjhHvOeOEhOif0gCHjl8P1SiUHNLYscFp-ZLPBzRL5pfEswkQma36l7NgStngTyOQ2K1XLsncCx9p35lCeW2pt6XCux-EPUNuusRRmWq84KCjG8qC1LTNpzaJXSnOGs9wo3FLvfLi0IG8HZQD9vJqh11UZ2buLh0W4")'}}></div>
              <div>
                <h3 className="text-[#0e171b] text-lg font-semibold leading-normal mt-2">Swimming Pool</h3>
                <p className="text-[#4e8397] text-sm font-normal leading-relaxed">Take a refreshing dip in our outdoor pool, surrounded by lush greenery.</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 items-center text-center">
              <div className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl shadow-md" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAKHjvPbCvEwN0cnpZBjVRuGXJdXkHxNY8oDq0TBJ9rpQ7A7z9wwzOrQWbriU1aE2Qew-KXxlfNaI8-pdYU390iIYZ3rHGBqZQaI9Zx35zwdfsTVNWyG9zlEewxf2rN70eHrmxM0z0PRw1mm0ArIBVuCA6svl-4OFz34Lh7agB-6R6FAQDT6fJZxEqAg9iyhKsjdYnV_T9wZKiJA_xWwNh1vldmfuSYvs3WgNmDvSVsPSkhta7eJqJda1kxcjx6tCzxlF6loMr-sAed")'}}></div>
              <div>
                <h3 className="text-[#0e171b] text-lg font-semibold leading-normal mt-2">Hiking Trails</h3>
                <p className="text-[#4e8397] text-sm font-normal leading-relaxed">Explore scenic hiking trails with varying difficulty levels, perfect for all fitness levels.</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 items-center text-center">
              <div className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl shadow-md" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA2lF-Jter35Z0nMtn6pirgTzSESFwrOJRQz5KmpEnpAUDxjh2wCfkM0PTrgdo66EG1J_kwmZ7P82PPCNpHAwC_F_FO5nLTJ5MiytjB5MjR_OpJMfYC9fVYnSC2prRaKDHjgKHhC6RsRFDr-dXHUKQxo_D3Pcsvl8h-T2R25gXH_PZus0JEXJgEIJaFTTxZeVHyobrKxuQmZq0svB0lX5VSLDFigOf5ZF44U6n-P3cmlgjPIw8N3UiEOlR0SwH7g3eRSLLt5gk20TkO")'}}></div>
              <div>
                <h3 className="text-[#0e171b] text-lg font-semibold leading-normal mt-2">Campfire Area</h3>
                <p className="text-[#4e8397] text-sm font-normal leading-relaxed">Gather around the campfire for storytelling and s'mores under the stars.</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 items-center text-center">
              <div className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl shadow-md" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC2kfLhh6HeKs30PbvAqWw-cQG15hL2nIB459Vw2zj5IKF2ZaPP8KIC48upE7_MCP7WiAvXPegNeWQFtQq2qe3fR8pqPCeqWOVJuqIrK4laHdaXRIrmcYjzwVq1Gc4qQbZbs1d4WJrxG_2_05cFePGc669ig1vjZ9q_PIfNEPWv9aSf_GG8dQw7aRJUS58r2ZQXHiPzluHVAkJkGKvqsyVor31jey3-34dV6rb0pgXnr3onwIfWHDKx5l2gEqIolFyaBXzz62Fjtprd")'}}></div>
              <div>
                <h3 className="text-[#0e171b] text-lg font-semibold leading-normal mt-2">Playground</h3>
                <p className="text-[#4e8397] text-sm font-normal leading-relaxed">Let the kids have fun at our well-equipped playground with swings, slides, and more.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="px-6 md:px-10 lg:px-20 py-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[#0e171b] text-3xl font-bold leading-tight tracking-[-0.015em] mb-8 text-center">Special Offers</h2>
          <div className="space-y-8">
            <div className="flex flex-col lg:flex-row items-center bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="w-full lg:w-1/2 h-64 lg:h-auto bg-center bg-no-repeat bg-cover" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC2lA76y9c6qBlboRp7crh9spvyDUboz0Ffgmyb7r7Omro35CkyhVQLajbqh9rxmtlaBUuR4TVame21VNRg03jl8PbtItPZFxTWzLo4WHCprFJ1DTZyiR4rDXVcUaW65CVC8lfS55mrluRTUyh9Yq4Msc1qv1SpYUTeY8n5fiufxBAw7U6zK7U1ARRRcQdqzCE7oPdEwklewCTpNSDSAkHYojhC_CegfaSV1e9uJOzfMV0PRKZBv5ux_1FXco7yO9yoAGya5YJxXF5y")'}}></div>
              <div className="w-full lg:w-1/2 p-6 lg:p-8">
                <h3 className="text-[#0e171b] text-xl font-bold leading-tight tracking-[-0.015em] mb-2">Early Bird Discount</h3>
                <p className="text-[#4e8397] text-base font-normal leading-relaxed mb-4">Book your stay at least 30 days in advance and receive a 15% discount on your total booking.</p>
                <button className="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-[#19abe5] text-white text-sm font-medium leading-normal hover:bg-[#138ac2] transition-colors">
                  <span className="truncate">Learn More</span>
                </button>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row items-center bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="w-full lg:w-1/2 h-64 lg:h-auto bg-center bg-no-repeat bg-cover lg:order-last" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC-W9yWLFtZAtY7ct4w92ck-YD8GPEPHXly_272DjW4itaVV5J2RD8PP0ol4iqkcQlQlC_EuNznOlpkYijjMtLd2lR0pnmqAsWcECHP1RGn3tdTMbhGsMGhjiEZtl8qShu9ARJoCuk8Rp9Hc5Bz_74ygbftORDnFvCY7n1f9ioIUg3gXNf6hcPOLjhkw8z8dLK7hLz2Kgwznt3Cwd7Rw83Foz8_YACmiLZJAl8BcrY_Ob7NXtIMPbClpLA0d0Gup_aSoI9hkk4IQ-cu")'}}></div>
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
