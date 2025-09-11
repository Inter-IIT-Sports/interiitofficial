// app/legacy/Content.tsx
// Presentational content between header and footer.
// If using App Router, set metadata in page/layout, not here.

export default function LegacyContent() {
  return (
    <div className="page-content">
      <div className="section-full content-inner">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Team Section: IIT Madras */}
          <section className="py-10 sm:py-12 lg:py-16">
            <div className="section-head mb-8 sm:mb-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight" style={{ color: "#481311" }}>
                IIT Madras
              </h2>
            </div>

            <div className="section-content text-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
                {/* Card 1 */}
                <article className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="overflow-hidden">
                    <a href="#">
                      <img
                        width={358}
                        height={460}
                        src="/images/our-team/Arul.png"
                        alt="Prof. Arul Prakash K"
                        className="w-full h-64 sm:h-96 lg:h-[28rem] object-cover transition-transform duration-300 hover:scale-[1.02]"
                      />
                    </a>
                  </div>
                  <div className="px-5 py-4">
                    <h4 className="text-lg font-semibold">
                      <a href="#" className="hover:underline">Prof. Arul Prakash K</a>
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">Advisor Sports</p>
                  </div>
                </article>

                {/* Card 2 */}
                <article className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="overflow-hidden">
                    <a href="#">
                      <img
                        width={358}
                        height={460}
                        src="/images/our-team/Shruti.png"
                        alt="Prof. Shruti Dubey"
                        className="w-full h-64 sm:h-96 lg:h-[28rem] object-cover transition-transform duration-300 hover:scale-[1.02]"
                      />
                    </a>
                  </div>
                  <div className="px-5 py-4">
                    <h4 className="text-lg font-semibold">
                      <a href="#" className="hover:underline">Prof. Shruti Dubey</a>
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">Co Advisor Sports</p>
                  </div>
                </article>

                {/* Card 3 */}
                <article className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="overflow-hidden">
                    <a href="#">
                      <img
                        width={358}
                        height={460}
                        src="/images/our-team/Sudakar.png"
                        alt="Prof. Sudakar Chandran"
                        className="w-full h-64 sm:h-96 lg:h-[28rem] object-cover transition-transform duration-300 hover:scale-[1.02]"
                      />
                    </a>
                  </div>
                  <div className="px-5 py-4">
                    <h4 className="text-lg font-semibold">
                      <a href="#" className="hover:underline">Prof. Sudakar Chandran</a>
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">Co Advisor Sports</p>
                  </div>
                </article>

                {/* Card 4 */}
                <article className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="overflow-hidden">
                    <a href="#">
                      <img
                        width={358}
                        height={460}
                        src="/images/our-team/dummy.png"
                        alt="Dr. Edinbrow Pakiaraj"
                        className="w-full h-64 sm:h-96 lg:h-[28rem] object-cover transition-transform duration-300 hover:scale-[1.02]"
                      />
                    </a>
                  </div>
                  <div className="px-5 py-4">
                    <h4 className="text-lg font-semibold">
                      <a href="#" className="hover:underline">Dr. Edinbrow Pakiaraj</a>
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">Sports Officer</p>
                  </div>
                </article>
              </div>
            </div>
          </section>

          {/* <hr className="my-8 sm:my-10 lg:my-12 border-t border-gray-200" /> */}

          {/* Team Section: IIT Hyderabad */}
          <section className="py-10 sm:py-12 lg:py-16">
            <div className="section-head mb-8 sm:mb-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight" style={{ color: "#481311" }}>
                IIT Hyderabad
              </h2>
            </div>

            <div className="section-content text-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
                {[
                  { name: "Prof. Arul Prakash K", role: "Advisor Sports" },
                  { name: "Prof. Shruti Dubey", role: "Co Advisor Sports" },
                  { name: "Prof. Sudakar Chandran", role: "Co Advisor Sports" },
                  { name: "Dr. Edinbrow Pakiaraj", role: "Sports Officer" },
                ].map((p, i) => (
                  <article key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-hidden">
                      <a href="#">
                        <img
                          width={358}
                          height={460}
                          src="/images/our-team/dummy.png"
                          alt={p.name}
                          className="w-full h-64 sm:h-96 lg:h-[28rem] object-cover transition-transform duration-300 hover:scale-[1.02]"
                        />
                      </a>
                    </div>
                    <div className="px-5 py-4">
                      <h4 className="text-lg font-semibold">
                        <a href="#" className="hover:underline">{p.name}</a>
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">{p.role}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Team Section: IIT Tirupati */}
          <section className="py-10 sm:py-12 lg:py-16">
            <div className="section-head mb-8 sm:mb-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight" style={{ color: "#481311" }}>
                IIT Tirupati
              </h2>
            </div>

            <div className="section-content text-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
                {[
                  { name: "Prof. Arul Prakash K", role: "Advisor Sports" },
                  { name: "Prof. Shruti Dubey", role: "Co Advisor Sports" },
                  { name: "Prof. Sudakar Chandran", role: "Co Advisor Sports" },
                  { name: "Dr. Edinbrow Pakiaraj", role: "Sports Officer" },
                ].map((p, i) => (
                  <article key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-hidden">
                      <a href="#">
                        <img
                          width={358}
                          height={460}
                          src="/images/our-team/dummy.png"
                          alt={p.name}
                          className="w-full h-64 sm:h-96 lg:h-[28rem] object-cover transition-transform duration-300 hover:scale-[1.02]"
                        />
                      </a>
                    </div>
                    <div className="px-5 py-4">
                      <h4 className="text-lg font-semibold">
                        <a href="#" className="hover:underline">{p.name}</a>
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">{p.role}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
