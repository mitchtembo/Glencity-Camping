import React from 'react';

const ActivitiesPage = () => {
  return (
    <main className="px-10 sm:px-20 lg:px-40 flex flex-1 justify-center py-10 bg-slate-100">
      <div className="layout-content-container flex flex-col max-w-5xl flex-1">
        <div className="flex flex-wrap justify-between items-center gap-6 p-6 bg-white rounded-xl shadow-lg mb-10">
          <div className="flex flex-col gap-2">
            <h1 className="text-slate-900 text-4xl font-bold leading-tight tracking-tight">Discover Our Activities</h1>
            <p className="text-slate-600 text-base font-normal leading-relaxed">
              Explore the wide range of activities available at Glencity Camping Site. From thrilling adventures to relaxing pastimes, there's something for everyone to enjoy.
            </p>
          </div>
        </div>
        <section className="mb-12">
          <h2 className="text-slate-800 text-3xl font-bold leading-tight tracking-tight px-4 pb-6 pt-2">Outdoor Adventures</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-stretch justify-between rounded-xl bg-white p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col gap-4">
                <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCw4jvgwRipmVSFRttA0NYn7KHubM2MeXT_A3YysD4SJ5G6cA-_oi5Tn2XFgGf3Bh6fmPZoc2tra8ho1PtEXT_zaUkQD_68F1Czlrvq4zrMixSyIGjm9NyZPTWhqaiyr6Sw_gA8RigvGIHpVM3R-FYPW2NHE8RIkYRqkzMTrDdRK3E7I51fVcwILb2RWK79VclZQ1OvPY6HqbWfZILPTS3sqjDfmaFOQPfdCFFFjNVhAGPrT6Iv9gctEA6K4FYmSoNAOCQPi4SGZimD")'}}></div>
                <div>
                  <h3 className="text-slate-900 text-xl font-bold leading-tight">Quad Biking</h3>
                  <p className="text-slate-600 text-sm font-normal leading-normal mt-1">
                    Experience the thrill of off-road quad biking through the scenic trails of Glencity. Suitable for all skill levels.
                  </p>
                  <p className="text-slate-800 text-lg font-semibold mt-3">From $50 / person</p>
                </div>
              </div>
              <button className="mt-6 flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-[#b2d7e5] text-slate-900 text-sm font-semibold leading-normal hover:bg-opacity-80 transition-colors w-full">
                <span className="truncate">Book Now</span>
              </button>
            </div>
            <div className="flex flex-col items-stretch justify-between rounded-xl bg-white p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col gap-4">
                <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDD6avXPBNqnxxmUFsWrNqRc6XK3r7HUeyYJLxyZcQVTqip_iqCkHN8wSynvGSuiAdenLouqNQD-zxucrolXy9sh9nFPZ_SLdD_HrJ6VGBKIzCwS206JWM2VO65E5oiYccVu_3QYdcLTqece_RYZggYUghCsz3O7QHQHl8EGCifEzf5qnlSbIviYr-PU0z9vihIzB6GEBmoYbHzKQEMCPlvO2LJ3J7SO9Ho6rfwn1rfx1gT_ZCqYMxM1GxlQa0p92t0qT7G4qJeYS82")'}}></div>
                <div>
                  <h3 className="text-slate-900 text-xl font-bold leading-tight">Horse Riding</h3>
                  <p className="text-slate-600 text-sm font-normal leading-normal mt-1">
                    Enjoy a leisurely horse ride through the picturesque landscapes of Glencity. Guided tours available.
                  </p>
                  <p className="text-slate-800 text-lg font-semibold mt-3">From $40 / hour</p>
                </div>
              </div>
              <button className="mt-6 flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-[#b2d7e5] text-slate-900 text-sm font-semibold leading-normal hover:bg-opacity-80 transition-colors w-full">
                <span className="truncate">Book Now</span>
              </button>
            </div>
            <div className="flex flex-col items-stretch justify-between rounded-xl bg-white p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col gap-4">
                <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC1RP6Okn68RhKQxT5kk2d_JlNtmHL1wtvMyMTOQGZVA-iwaRJpmS7_t-vyxhrscbwOupNHS8fciCKfnxI8TRkvkisZh_M5OvmjZ5VyZn_d0L5dITmNlnhTUwvPm5P_bz84v7JcFw1FCsUIbQqQcIltUGM3hJ09CVFCyBdjyltUU6ct8bUKTTONk1pGKMpCRysBDDOJGUTXJnTxNqNYFuRpZ2J_6ivBFU9jBVMeoFl5-BBjXKJE6TEYJed0P6RzmrhtmzZY8y9RbxMt")'}}></div>
                <div>
                  <h3 className="text-slate-900 text-xl font-bold leading-tight">Hiking Trails</h3>
                  <p className="text-slate-600 text-sm font-normal leading-normal mt-1">
                    Discover the natural beauty of Glencity with our well-maintained hiking trails. Various difficulty levels available.
                  </p>
                  <p className="text-slate-800 text-lg font-semibold mt-3">Free Access</p>
                </div>
              </div>
              <button className="mt-6 flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-slate-200 text-slate-700 text-sm font-semibold leading-normal hover:bg-slate-300 transition-colors w-full">
                <span className="truncate">Explore Trails</span>
              </button>
            </div>
          </div>
        </section>
        <section className="mb-12">
          <h2 className="text-slate-800 text-3xl font-bold leading-tight tracking-tight px-4 pb-6 pt-2">Team Building</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-stretch justify-between rounded-xl bg-white p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col gap-4">
                <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCUM-5shUVBymrVU5qwumnxXO2wpMcagy6KEerROZuBEs-aKuV8boSBFagZfywdDLKg9QegeB3CG0nNW4pBdZ-64yEfuHzTuOs6TWKAunaYytQFCB4MI68REdRxRQBgZmzxcbMpfkPI0KH2PJA4933nmfZ-NUnMcHRxHj0Xcxr1WJRk3pfO9zNqqNVAStI_qs-MOM2m6aqZOjhmOII95Ye8R-ovMYTUZn181MtMHTMlQoQgF0aO_C1rQiAxeBZaOgmtN8k6Ue0eLKff")'}}></div>
                <div>
                  <h3 className="text-slate-900 text-xl font-bold leading-tight">Team Building Exercises</h3>
                  <p className="text-slate-600 text-sm font-normal leading-normal mt-1">
                    Strengthen your team's bond with our engaging and challenging team-building activities. Customized packages available.
                  </p>
                  <p className="text-slate-800 text-lg font-semibold mt-3">Custom Pricing</p>
                </div>
              </div>
              <button className="mt-6 flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-slate-200 text-slate-700 text-sm font-semibold leading-normal hover:bg-slate-300 transition-colors w-full">
                <span className="truncate">Inquire Now</span>
              </button>
            </div>
            <div className="flex flex-col items-stretch justify-between rounded-xl bg-white p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col gap-4">
                <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAiQWRbPSRyubxfa13mT-1S5Dwmw1CA8NlGtN2foceZFUfRmX-6A56u9fIzZxagd-yQj7SSilNQIpDLd3vYxBY8UIqIYErZYL1szzacRNmiWYxb-4ffY4aBjoLMBHp_ZKsX9D_iXXyk5jcjwPGSoohZVTlim8f0ufKQQKtNsK9w7ENqBwSS16W9le04xi3SucPc1-P4hZMt71EL3gaFPmQdfLc9MO6GaL7L0h3YlfkKAYprJ7Jlpt7ioDu48j37kHtQXDOQsIOk-ORo")'}}></div>
                <div>
                  <h3 className="text-slate-900 text-xl font-bold leading-tight">Obstacle Course</h3>
                  <p className="text-slate-600 text-sm font-normal leading-normal mt-1">
                    Test your limits and teamwork skills with our exciting obstacle course. Suitable for all fitness levels.
                  </p>
                  <p className="text-slate-800 text-lg font-semibold mt-3">From $30 / person</p>
                </div>
              </div>
              <button className="mt-6 flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-[#b2d7e5] text-slate-900 text-sm font-semibold leading-normal hover:bg-opacity-80 transition-colors w-full">
                <span className="truncate">Book Now</span>
              </button>
            </div>
          </div>
        </section>
        <section className="mb-12">
          <h2 className="text-slate-800 text-3xl font-bold leading-tight tracking-tight px-4 pb-6 pt-2">Water Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-stretch justify-between rounded-xl bg-white p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col gap-4">
                <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA1c1g5v3_Aa8CkGZLwglXD30mRrz4wZFuYCNFvZ4CMf-nAJclU4y-Ts6dfGdO27rDIU5kgpNJiviWj35JZ_o1MbsbkcviRHH-SsW79rb3hWSVi7ZqtP8prYQ3GLnNig4R1thqkZlrdgUQ_gO8inGV0WBsdVap9PqFnQC2U-Mo0dJIRWxGYgM-sZS_9Q1J1nVm1f5YLnP5HsIj1-AzO8SLzpqrGRgGwrTC4YvK5JIsKQWJoUsXqgV5Km0emxScBCuil9uniGfCy9Msq")'}}></div>
                <div>
                  <h3 className="text-slate-900 text-xl font-bold leading-tight">Kayaking</h3>
                  <p className="text-slate-600 text-sm font-normal leading-normal mt-1">Explore the serene waters of Glencity's lake with our kayaking rentals. Life jackets provided.</p>
                  <p className="text-slate-800 text-lg font-semibold mt-3">$20 / hour</p>
                </div>
              </div>
              <button className="mt-6 flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-[#b2d7e5] text-slate-900 text-sm font-semibold leading-normal hover:bg-opacity-80 transition-colors w-full">
                <span className="truncate">Rent Now</span>
              </button>
            </div>
            <div className="flex flex-col items-stretch justify-between rounded-xl bg-white p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col gap-4">
                <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBaJMAvDVpQAicnkFezaa0SW2RcJ5Hrl3-QsATqFqpuz-ztamxVITBt96RVWitSo0ueQzYhGpj47pRacdSzn4jUAGxnEnTBs3hB-CJeW-dnDxPlUhXDdf6k9gLRvzMJkKLMcuygld1-lLW_zLTISGVDEg5E85MRiqdkr922j_2YBDzMj--mid7TuW7htVFLfOf5uia10WOskugkKGzAFcY9zO0-gSJ3pRzzlWYxrocf1xQ7mtur8GC85AWE4xDxDJ0xICTiTkyfwmFT")'}}></div>
                <div>
                  <h3 className="text-slate-900 text-xl font-bold leading-tight">Fishing</h3>
                  <p className="text-slate-600 text-sm font-normal leading-normal mt-1">Enjoy a relaxing day of fishing at our well-stocked lake. Fishing gear available for rent.</p>
                  <p className="text-slate-800 text-lg font-semibold mt-3">$15 / day + Gear Rental</p>
                </div>
              </div>
              <button className="mt-6 flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-[#b2d7e5] text-slate-900 text-sm font-semibold leading-normal hover:bg-opacity-80 transition-colors w-full">
                <span className="truncate">Book Now</span>
              </button>
            </div>
          </div>
        </section>
        <section className="mb-12">
          <h2 className="text-slate-800 text-3xl font-bold leading-tight tracking-tight px-4 pb-6 pt-2">Other Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-stretch justify-between rounded-xl bg-white p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col gap-4">
                <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDyK_M4_73NmXKYSYUJws7jBLFzgylgoVl4sF4kUGjREuWaf4qool9LGaa_qWPCYjqdmbW4eas-r6Aw07FD0ZABPbPYK1oxQ5QrNVnc_5W9nB0986yX_sz76MhdwqAP5ufTOw_0YHQXrO5CLI3VM2jnTQHYViNmo17eC8UZxRSQo6uU5y0FtBVGtLuAYFSBhu3pHvouulkk0XFkQJE06UwXbIP7B03L1xD5hDJacTIT38_52Sf7x-XRdeduRXzglKzwd6Femm5G8rE-")'}}></div>
                <div>
                  <h3 className="text-slate-900 text-xl font-bold leading-tight">Archery</h3>
                  <p className="text-slate-600 text-sm font-normal leading-normal mt-1">
                    Try your hand at archery with our professional equipment and guidance. Suitable for beginners and experienced archers.
                  </p>
                  <p className="text-slate-800 text-lg font-semibold mt-3">$25 / session</p>
                </div>
              </div>
              <button className="mt-6 flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-[#b2d7e5] text-slate-900 text-sm font-semibold leading-normal hover:bg-opacity-80 transition-colors w-full">
                <span className="truncate">Book Now</span>
              </button>
            </div>
            <div className="flex flex-col items-stretch justify-between rounded-xl bg-white p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col gap-4">
                <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDyTWBegvFfGFgJdXS9xwsn-1yuQQjyzLwWD4y5BDRKH62sSwn3ZwPHIHzu1H2xaVaZWNzwGKz1ORflrzzZFjeDz9E6LN1KL_GjU6lqfVjCt14nb4h2iuNlcfoJf-JeJsTQW3ssw_3gYfep_-icst4KiOq_D2VeEhC1eOLowtAYTEkJptUnMHXbrUJBMmM1MvtO-sfNNwRAO9en57R1olWUyJNb0zxFCKrCTbjoZLSJM5gL6A4eSVKkBIq7aWZ80AjmK2aOtN36Kabj")'}}></div>
                <div>
                  <h3 className="text-slate-900 text-xl font-bold leading-tight">Campfire Nights</h3>
                  <p className="text-slate-600 text-sm font-normal leading-normal mt-1">
                    Gather around the campfire for an evening of storytelling, music, and s'mores. Available on select nights.
                  </p>
                  <p className="text-slate-800 text-lg font-semibold mt-3">Included for Guests</p>
                </div>
              </div>
              <button className="mt-6 flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-slate-200 text-slate-700 text-sm font-semibold leading-normal hover:bg-slate-300 transition-colors w-full">
                <span className="truncate">Check Schedule</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ActivitiesPage;
